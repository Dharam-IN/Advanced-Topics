import express from 'express';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';

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
        `,
        resolvers: {
            Query: {
                hello: () => 'Hey There',
                say: (_, {name}: {name: string}) => `Hey ${name}, How are You`
            }
        }
    })

    await gqlServer.start();

    app.get("/", (req, res) => {
        res.json({message: "Hello From Server"});
    });

    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
}

init();