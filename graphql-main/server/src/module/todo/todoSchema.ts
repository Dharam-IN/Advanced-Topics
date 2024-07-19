const todoSchema = `#graphql

    scalar Date

    type Todo{
        id: Int!
        todo: String
        completed: Boolean
        created_at: Date
    }

    type Query{
        todos: [Todo]
        getTodo(id: Int): Todo
    }

    type Mutation{
        createTodo(todo: String): Todo
    }

`

export default todoSchema;