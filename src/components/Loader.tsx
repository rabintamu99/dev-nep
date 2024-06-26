import { Skeleton } from "@/components/ui/skeleton"

export function Loader() {
  return (
    <div className="flex flex-col space-y-3 bg-slate-100">
      <Skeleton className="h-[325px] w-[1000px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[850px]" />
        <Skeleton className="h-4 w-[850px]" />
      </div>
    </div>
  )
}
