import express from "express";
import apolloServer from "./config/apolloserver.js";
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
const app = express();
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get("/", (req, res) => {
    return res.send("Hello From Server");
});
const StartApolloServer = async () => {
    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer));
};
StartApolloServer();
app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
