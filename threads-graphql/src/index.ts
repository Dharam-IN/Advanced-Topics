import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from './lib/db';

const app = express();
const PORT = Number(process.env.PORT) || 8001;

app.use(express.json());

async function init() {
    // Apollo Graphql Server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello: String
                say(name: String): String
            }
            
            type Mutation{
                createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hey There',
                say: (_, { name }: { name: string }) => `Hey ${name}, How are You`
            },
            Mutation: {
                createUser: async (_, 
                    {firstName, lastName, email, password}: 
                    {firstName: string; lastName: string; email: string; password: string}) => {
                        await prismaClient.user.create({
                            data: {
                                firstName,
                                lastName,
                                email,
                                password,
                                salt: "random_salt"
                            }
                        })
                    }
            }
        }
    })

    await gqlServer.start();

    app.get("/", (req, res) => {
        res.json({ message: "Hello From Server" });
    });

    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
}

init();