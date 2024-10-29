import { z } from 'zod'

export const todoListSchema = z.object({
  produto: z.string(),
  check: z.boolean(),
})

export type Todo = z.infer<typeof todoListSchema>
