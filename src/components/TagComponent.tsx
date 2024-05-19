"use client";
const TagComponent = ({ tag }: { tag: string }) => {
    return (
      <button className="bg-zinc-10 text-zinc-700 text-md 
      font-semibold border mr-2 px-3 py-0.5 rounded-full hover:bg-zinc-100 hover:border-separate animate-pulse duration-0">
        {tag}
      </button>
    );
  };
  
export default TagComponent;