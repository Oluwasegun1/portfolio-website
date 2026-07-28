/** Loading skeleton for the case-study route — mirrors the final layout to avoid content jump. */
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLoading() {
  return (
    <main className="relative z-10 py-16">
      <div className="container max-w-4xl">
        <Skeleton className="mb-10 h-5 w-32" />
        <Skeleton className="mb-3 h-4 w-24" />
        <Skeleton className="mb-3 h-12 w-2/3" />
        <Skeleton className="mb-10 h-5 w-1/2" />
        <div className="mb-10 flex gap-3">
          <Skeleton className="h-10 w-28 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
        <Skeleton className="mb-12 aspect-video w-full rounded-2xl" />
        <Skeleton className="mb-12 h-24 w-full rounded-2xl" />
        <div className="grid gap-10 sm:grid-cols-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </main>
  );
}
