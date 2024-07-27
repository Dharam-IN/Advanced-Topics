import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createGraphqlServer from './graphql';

const app = express();
const PORT = Number(process.env.PORT) || 8001;

app.use(express.json());

async function init() {

    app.get("/", (req, res) => {
        res.json({ message: "Hello From Server" });
    });

    app.use("/graphql", expressMiddleware(await createGraphqlServer()));

    app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
}

init();