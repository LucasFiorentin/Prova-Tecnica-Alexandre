import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../service/firebase'
import { Todo, todoListSchema } from '../models/todo-list-schema'

export const LIST_QUERY_KEY = ['getTodos']

export function useListTodosQuery() {
  return useQuery({
    queryKey: LIST_QUERY_KEY,
    queryFn: async () => {
      const todosRef = collection(firestore, 'todoList').withConverter({
        toFirestore: (todo: Todo) => todo,
        fromFirestore: (snapshot) => {
          const data = todoListSchema.parse({
            id: snapshot.id,
            ...snapshot.data(),
          })
          const parse = todoListSchema.safeParse(data)
          return parse.data
        },
      })
      const snapshot = await getDocs(todosRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
