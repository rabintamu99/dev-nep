
"use client";
const TagComponent = ({ tag }: { tag: string }) => {
    return (
      <span className="bg-zinc-100 text-zinc-500 text-md 
      font-semibold mr-2 px-2.5 py-0.5 rounded">
        {tag}
      </span>
    );
  };
  
export default TagComponent;