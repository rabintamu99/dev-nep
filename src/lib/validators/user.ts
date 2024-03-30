import { z } from 'zod'

export const UserFollowValidator = z.object({
  followerId: z.string(),
})

export type UserFollowPayload = z.infer<typeof UserFollowValidator>
