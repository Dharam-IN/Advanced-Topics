import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createGraphqlServer from './graphql';
import UserService from './services/user';

const app = express();
const PORT = Number(process.env.PORT) || 8001;

app.use(express.json());

async function init() {

    app.get("/", (req, res) => {
        res.json({ message: "Hello From Server" });
    });

    app.use("/graphql", expressMiddleware(await createGraphqlServer(), {
        context: async ({req}) => {
            // @ts-ignore
            const token = req.headers['token'];
            try {
                const user = UserService.decodeJWTToken(token as string);
                return {user};
            } catch (error) {
                return {}
            }
        }
    }));

    app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
}

init();