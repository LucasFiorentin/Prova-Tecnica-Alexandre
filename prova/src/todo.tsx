import React from 'react'
import { useState } from 'react'
import { useCreateTodoMutation } from './mutation/todo-mutation'
import { useListTodosQuery } from './queries/todo-list-query'
import { useDeleteTodoMutation } from './mutation/delete-mutation'

export function TodoPage() {
  const [newTodo, setNewTodo] = useState('')
  const { data, isLoading, error } = useListTodosQuery()
  const createTodoMutation = useCreateTodoMutation()
  const deleteTodoMutation = useDeleteTodoMutation()

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return
    try {
      await createTodoMutation.mutateAsync({ produto: newTodo, check: false })
      setNewTodo('')
    } catch (err) {
      console.error('Failed to add todo:', err)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodoMutation.mutateAsync(id)
    } catch (err) {
      console.error('Failed to delete todo:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Carregando...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <h1 className="text-2xl font-bold text-red-500 text-center">
        Erro ao carregar os dados
      </h1>
    )
  }

  return (
    <div className="container mx-auto p-8 max-w-md bg-white shadow-lg rounded-lg border border-gray-200">
      <p className="text-4xl font-bold mb-8 text-center text-indigo-600">
        Todo List
      </p>

      <div className="flex space-x-3 mb-6">
        <input
          type="text"
          placeholder="Adicionar uma nova tarefa"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition duration-200"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-3">
        {data?.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition-colors duration-150"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo?.check}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                onChange={() => {}}
              />
              <label
                className={`text-base font-medium transition duration-200 ${
                  todo?.produto ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {todo?.produto}
              </label>
            </div>
            <button
              className="text-gray-400 hover:text-red-500 transition-colors duration-150"
              onClick={() => {
                handleDeleteTodo(todo?.id ?? '')
              }}
            >
              <Trash className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>

      {data?.length === 0 && (
        <p className="mt-4 text-center text-gray-500">
          Nenhuma tarefa encontrada.
        </p>
      )}
    </div>
  )
}

export default TodoPage
