import { z } from 'zod'

export const AskValidator = z.object({
  questionId: z.string(),
  text: z.string(),
  replyToId: z.string().optional()
})

export type AskRequest = z.infer<typeof AskValidator>
