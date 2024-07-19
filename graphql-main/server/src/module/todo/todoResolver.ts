import prisma from "../../config/database.js";

const todoResolver = {
    Query: {
        todos: async() => await prisma.todo.findMany({orderBy: {id: 'desc'}}),
        getTodo: async(_, {id}) => {
            return await prisma.todo.findUnique({where: {id: id}})
        }
    },
    Mutation: {
        createTodo: async(_, {todo})  => {
            const newTodo = await prisma.todo.create({
                data:{
                    todo: todo,
                    completed: false
                }
            })

            return newTodo
        },
        updateTodo: async(_, {id, todo},) => {
            await prisma.todo.update({
                where: {id: id},
                data:{
                    todo: todo
                }
            })

            return {message: "Update Succesfully!"}
        },
        toggleTodo: async(_, {id, data},) => {
            await prisma.todo.update({
                where: {id: id},
                data:{
                    completed: data
                }
            })

            return {message: "Update Succesfully! boolean"}
        }
    }
}

export default todoResolver;