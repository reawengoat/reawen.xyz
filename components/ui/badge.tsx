import * as React from "react";

import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md",
        className
      )}
      {...props}
    />
  );
}

export { Badge };