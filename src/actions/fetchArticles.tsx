"use server";
import { db } from '@/lib/db';
import  { Article }  from '@/types/article';

export const fetchArticles = async (page: number): Promise<Article[] | null> => {
  const perPage = 5;

  try {
    const articles = await db.article.findMany({
        skip: perPage * (page - 1), // Skip articles for previous pages
        take: perPage, // Limit the result to 10 articles per page
        orderBy: {
          createdAt: 'desc', // Order articles by creation date in descending order
        },
        include: {
          author: true, // Include author details
          likes: true, // Include likes details
        },
    });
    return articles as Article[];
    
  } catch (error) {
    console.error("Error fetching articles:", error);
    return null; // Return null to signify an error occurred
  }
};
