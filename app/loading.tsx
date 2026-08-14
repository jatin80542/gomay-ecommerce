import { ProductGridSkeleton, TextSkeleton } from "@/components/ui/Skeletons";

export default function Loading() {
  return (
    <div className="shell py-10">
      <div className="max-w-lg space-y-4">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-9 w-3/4" />
        <TextSkeleton lines={2} />
      </div>
      <div className="mt-10">
        <ProductGridSkeleton />
      </div>
    </div>
  );
}
