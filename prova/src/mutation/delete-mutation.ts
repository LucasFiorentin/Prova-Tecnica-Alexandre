import { deleteDoc, doc } from 'firebase/firestore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LIST_QUERY_KEY } from '../queries/todo-list-query'
import { firestore } from '../service/firebase'

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: async (id: string) => {
      const todoDocRef = doc(firestore, 'todoList', id)
      await deleteDoc(todoDocRef)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_QUERY_KEY })
    },
  })
}
