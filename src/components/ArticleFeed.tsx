"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Loader } from "@/components/Loader";
import { fetchArticles } from "@/actions/fetchArticles";
import ArticleComponent from "@/components/Article";
import { Article } from "@/types/article";
import { Skeleton } from "./ui/skeleton";

export default function ArticleFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    delay: 500,
  });

  const [loadingLock, setLoadingLock] = useState(false);

  const loadMoreArticles = useCallback(async () => {
    if (!hasMore || isLoading || loadingLock) return;
  
    setLoadingLock(true);
    setIsLoading(true);
  
    try {
      const nextPage = page + 1;
      const newArticles = await fetchArticles(nextPage);
  
      if (!newArticles || newArticles.length === 0) {
        setHasMore(false);
      } else {
        // Filter out any duplicates from the newArticles array
        const uniqueNewArticles = newArticles.filter(
          (article) =>
            !articles.some((existingArticle) => existingArticle.id === article.id)
        );
  
        // If there are unique new articles, update the articles state
        if (uniqueNewArticles.length > 0) {
          setArticles((prevArticles) => [...prevArticles, ...uniqueNewArticles]);
          setPage(nextPage);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Failed to load articles:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setLoadingLock(false);
    }
  }, [page, hasMore, isLoading, loadingLock, articles]);

  useEffect(() => {
    if (inView && !isLoading && !loadingLock) {
    loadMoreArticles();
    }
    }, [inView, loadMoreArticles]);
  return (
    <>
      <ArticleComponent  articles={articles} />
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        {isLoading ? <Loader />
 : !hasMore && "Nothing more to load"}
      </div>
    </>
  );
}
