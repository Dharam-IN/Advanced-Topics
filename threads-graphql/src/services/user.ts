import { createHmac, randomBytes } from 'node:crypto';
import { prismaClient } from "../lib/db";
import JWT from 'jsonwebtoken';

const JWT_SECRET = "!nd1@@nd$uperm@n";

export interface CreateUserPayload{
    firstName: string
    lastName: string
    email: string
    profileImageURL: string
    password: string
}

export interface GetUserTokenPayload{
    email: string
    password: string
}

class UserService{

    private static generateHash(salt: string, password:string){
        const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
        return hashedPassword;
    }

    public static createUser(payload: CreateUserPayload){

        const {firstName, lastName, email, password} = payload;

        const salt = randomBytes(32).toString("hex");
        const hashedPassword = UserService.generateHash(salt, password);

        return prismaClient.user.create({
            data:{
                firstName,
                lastName,
                email,
                password: hashedPassword,
                salt
            }
        })
    }

    private static getUserByEmail(email: string){
        return prismaClient.user.findUnique({
            where: {
                email
            }
        })
    }

    public static async getUserToken(payload: GetUserTokenPayload){
        const {email, password} = payload;
        const user = await UserService.getUserByEmail(email);
        console.log("User find by email:--------- ", user);
        
        if(!user) throw new Error("User Not Found!");

        const userSalt = user.salt;

        const userHashPassword = UserService.generateHash(userSalt, password);

        if(userHashPassword !== user.password){
            throw new Error("Incorrect Password")
        }

        const token = JWT.sign({id: user.id, email: user.email}, JWT_SECRET);

        return token;
    }

    public static decodeJWTToken(token: string){
        return JWT.verify(token, JWT_SECRET);
    }

    public static async getUserById(id: string){
        return await prismaClient.user.findUnique({where: {id}})
    }
}

export default UserService;