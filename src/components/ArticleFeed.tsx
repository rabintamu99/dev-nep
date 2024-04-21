"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/Spinner";
import { fetchArticles } from "@/actions/fetchArticles";
import ArticleComponent from "@/components/Article";
import { Article } from "@/types/article";


export default function ArticleFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    delay: 100, // Debounce or throttle handling
  });

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreArticles = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    await delay(200);
    try {
      const nextPage = page + 1;
      const newArticles = await fetchArticles(nextPage) ?? [];
      if (newArticles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more articles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    if (inView) {
      loadMoreArticles();
      console.log("Loading articles...");
    }
  }, [inView, loadMoreArticles]);

  return (
    <>
      <ArticleComponent articles={articles} />
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        {isLoading ? <Spinner /> : "Nothing more to load"}
      </div>
    </>
  );
}
