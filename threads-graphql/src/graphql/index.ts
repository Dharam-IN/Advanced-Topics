import { ApolloServer } from '@apollo/server'
import { graphql } from 'graphql';

async function createGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hey'
            },
        }
    })
    
    await gqlServer.start();

    return gqlServer;
}

export default createGraphqlServer;