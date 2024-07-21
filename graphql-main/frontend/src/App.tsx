import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {GET_TODOS, CREATE_TODO} from './queries/todoQuery'
import { Todo, TodoTypes } from "./types";

function App() {
  const [todo, setTodo] = useState<String>('');
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const {data, loading, error} = useQuery<TodoTypes>(GET_TODOS);
  const [createTodo, {data:newTodo, loading:cloading, error:cerror}] = useMutation(CREATE_TODO);

  useEffect(() =>{
    if (data?.todos) {
      setTodos(data?.todos)
    }
  }, [data])

  useEffect(() =>{
    if (newTodo && newTodo?.createTodo) {
      setTodos([newTodo?.createTodo, ...todos])
    }
  }, [newTodo])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createTodo({variables: {todo: todo}});
    if(cerror){
      alert(cerror.message)
    }

    setTodo("");
  }

  return (
    <>
      {
        loading && (<h1>Loading.....</h1>)
      }

      {
        error && (<h1 className="text-red-400">Error... {error.message}</h1>)
      }

      <div className="flex justify-center items-center h-screen w-screen">
        <div className="w-full md:w-[600px] mx-auto bg-gray-100 p-7">
          <form onSubmit={handleSubmit} className="flex gap-3 w-full">
            <input type="text" className="w-[80%] border px-3 py-2 rounded-md" placeholder="Enter Your Todo here..." onChange={(e) => setTodo(e.target.value)}/>
            <button type="submit" className="bg-blue-500 text-white py-2 px-3 rounded-md">Add Todo</button>
          </form>
          <div className="mt-5">
            {todos && (
                // console.log(data)
                <ul>
                  {todos.map((todo) => (
                    <li className="flex mb-3 justify-between text-xl bg-blue-500 p-3 text-white items-center" key={todo.id}>
                      <div className="gap-2 flex items-center">
                        <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="link-checkbox">{todo.todo}</label>
                      </div>
                      <button className="bg-red-500 p-2">Delete</button>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
