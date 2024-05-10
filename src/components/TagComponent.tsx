
"use client";
const TagComponent = ({ tag }: { tag: string }) => {
    return (
      <span className="bg-zinc-100 text-zinc-700 text-md 
      font-semibold mr-2 px-3 py-0.5 rounded-full">
        {tag}
      </span>
    );
  };
  
export default TagComponent;