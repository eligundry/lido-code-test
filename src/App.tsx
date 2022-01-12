import React, { useState, useCallback } from 'react'
import 'normalize.css'
import './App.css'

interface TodoItem {
  text: string
  completed: Date | null
  added: Date
}

const App: React.FC = () => {
  const [addTodoValue, setAddTodoValue] = useState<string>('')
  const [currentView, setCurrentView] = useState<'completed' | 'active'>(
    'active'
  )
  const [todos, setTodos] = useState<TodoItem[]>([
    { text: 'Hi Lido™️', completed: null, added: new Date() },
  ])

  const addTodo = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault()
      setTodos((todos) => [
        ...todos,
        { text: addTodoValue, completed: null, added: new Date() },
      ])
      setAddTodoValue('')
    },
    [addTodoValue]
  )

  const toggleCompletion = useCallback(
    (timestamp: string) =>
      setTodos((ts) =>
        ts.map((todo) =>
          todo.added.toISOString() !== timestamp
            ? todo
            : { ...todo, completed: todo.completed ? null : new Date() }
        )
      ),
    []
  )

  return (
    <div className="App">
      <header>
        <h1>Lido™️ Todo App</h1>
      </header>
      <main className="todos">
        <nav>
          <button
            onClick={() =>
              setCurrentView((s) => (s === 'active' ? 'completed' : 'active'))
            }
          >
            View {currentView === 'active' ? 'Completed' : 'Active'}
          </button>
        </nav>
        <ul className="todos-list">
          {todos
            .filter((todo) => (currentView === 'active') === !todo.completed)
            .map((todo) => (
              <li key={todo.added.toISOString()}>
                <input
                  type="checkbox"
                  checked={!!todo.completed}
                  onChange={() => toggleCompletion(todo.added.toISOString())}
                  id={`todo-${todo.added.toISOString()}`}
                />
                <label htmlFor={`todo-${todo.added.toISOString()}`}>
                  {todo.text}
                </label>
              </li>
            ))}
        </ul>
      </main>
      <form onSubmit={addTodo} className="add-todo-form">
        <input
          type="text"
          placeholder="What do you need to do today?"
          required
          value={addTodoValue}
          onChange={(e) => setAddTodoValue(e.target.value)}
        />
        <button type="submit">➕ Add</button>
      </form>
    </div>
  )
}

export default App
