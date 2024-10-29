import { addDoc, collection } from 'firebase/firestore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { firestore } from '../service/firebase'
import { Todo } from '../models/todo-list-schema'
import { LIST_QUERY_KEY } from '../queries/todo-list-query'

export function useCreateTodoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: (values: Todo) =>
      addDoc(collection(firestore, 'todoList'), values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_QUERY_KEY })
    },
  })
}
