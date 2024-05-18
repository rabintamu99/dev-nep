
"use client";
const TagComponent = ({ tag }: { tag: string }) => {
    return (
      <button className="bg-zinc-100 text-zinc-700 text-md 
      font-semibold border mr-2 px-3 py-0.5 rounded-full">
        {tag}
      </button>
    );
  };
  
export default TagComponent;