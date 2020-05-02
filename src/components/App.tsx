import * as React from "react"

import PageInterface from "../PageInterface"

const App = (props) => {
  interface Todo {
    id: number
    content: string
    completed: boolean
  }

  let todos: Todo[] = []

  console.log("todos", typeof todos)

  function addTodo(todo: Todo) {
    console.log(todo)
    todos = [...todos, todo]
  }

  const newTodo: Todo = { id: 1, content: "typescript", completed: false }

  addTodo(newTodo)

  console.log(todos)

  return (
    <div>
      <h1>타입스크립트 webpack 예제 </h1>
      <p>The color of this page is: {props.color}</p>
    </div>
  )
}

export default App
