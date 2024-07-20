import { gql } from "@apollo/client";

export const GET_TODOS = gql`
#graphql
    query GET_TODOS {
        todos{
            id
            completed
            todo
            created_at
        }
    }
`