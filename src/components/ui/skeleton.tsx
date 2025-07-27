import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent relative overflow-hidden rounded-lg",
        // Shimmer effect (wave)
        "shimmer",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
