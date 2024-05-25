export type Article = {
  id: string;
  title: string;
  content: any; // JSON type in TypeScript is typically `any` or a more specific interface if the structure is known.
  isDraft: boolean;
  createdAt: Date;
  updatedAt: Date;
    author: {
      name: string;
      username: string;
      image: string;
    }
    authorId: string;
    likes_count: number;
    tags: string[]; 
  };
  