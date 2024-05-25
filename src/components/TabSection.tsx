"use client";
import React, { useState } from 'react';
import ArticleComponent from "@/components/Article";

interface TabSectionProps {
  articles: any[];
  totalArticles: number;
  totalLikes: number;
  savedArticles: any[];
}

const TabSection: React.FC<TabSectionProps> = ({ articles, totalArticles, totalLikes, savedArticles }) => {
  const [activeTab, setActiveTab] = useState('articles');

  const getActiveContent = () => {
    switch (activeTab) {
      case 'articles':
        return <ArticleComponent key="articles" articles={articles} />;
      case 'likes':
        return <ArticleComponent key="likes" articles={articles.filter(article => article.likes.length > 0)} />;
      case 'saved':
        return <ArticleComponent key="articles" articles={articles} />;
      default:
        return <ArticleComponent key="articles" articles={articles} />;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mt-6 border-b pb-5 border-gray-200">
        <div
          className={`flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full ${activeTab === 'articles' ? 'bg-gray-200' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          <p className="text-l text-gray-500 font-bold">Articles</p>
          <p className="text-l text-gray-500 font-bold">{totalArticles}</p>
        </div>
        <div
          className={`flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full ${activeTab === 'likes' ? 'bg-gray-200' : ''}`}
          onClick={() => setActiveTab('likes')}
        >
          <p className="text-l text-gray-500 font-bold">Likes</p>
          <p className="text-l text-gray-500 font-bold">{totalLikes}</p>
        </div>
        <div
          className={`flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full ${activeTab === 'saved' ? 'bg-gray-200' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <p className="text-l text-gray-500 font-bold">Saved</p>
          {/* <p className="text-l text-gray-500 font-bold">{savedArticles.length}</p> */}
        </div>
      </div>
      <div className="mt-4">
        {getActiveContent()}
      </div>
    </div>
  );
};

export default TabSection;
