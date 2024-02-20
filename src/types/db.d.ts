import type { Post, Subreddit, User, Vote, Comment, Question } from '@prisma/client'

export type ExtendedPost = Post & {
  subreddit: Subreddit
  votes: Vote[]
  author: User
  comments: Comment[]
}
