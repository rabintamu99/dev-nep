import { z } from 'zod'

export const ArticleLikeValidator = z.object({
  articleId: z.string(),
})

export type ArticleLikeValidator = z.infer<typeof ArticleLikeValidator>