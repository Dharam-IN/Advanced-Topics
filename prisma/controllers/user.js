import prisma from "../DB/db.config.js";

export const CreateUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const emailExists = await prisma.user.findUnique({where: {email: email}});

    if(emailExists){
        return res.json({status: 400, message: "This Email already exists!"})
    }

    const user = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
    })


    return res.json({status: 201, data: user, message: "User Created!"})

}

export const UpdateUser = async (req, res) => {
    const userId = req.params.id;
    const {firstName, lastName, email, password} = req.body

    console.log("userId", userId)

    await prisma.user.update({
        where:{
            email: "dharam@mail.com"
        },
        data:{
            firstName,
            lastName,
            email,
            password
        }
    })

    return res.json({status: 201, message: "User Updated"})

}