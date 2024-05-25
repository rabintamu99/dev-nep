"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/Spinner";
import { fetchArticles } from "@/actions/fetchArticles";
import { Article } from "@/components/Article";

export function LoadMore() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const newArticles = await fetchArticles(page);
      if (newArticles) {
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
        setPage((prevPage) => prevPage + 1);
      }
      setIsLoading(false);
    };

    if (inView && !isLoading) {
      fetchData();
    }
  }, [inView, isLoading, page]);

  return (
    <>
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
      <div ref={ref} className="flex justify-center items-center p-4">
        {isLoading && <Spinner />}
      </div>
    </>
  );
}