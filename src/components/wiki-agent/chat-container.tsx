import * as React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const ChatContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <ScrollArea ref={ref} className={cn("h-[500px] w-full rounded-md border p-4", className)} {...props}>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </ScrollArea>
  )
)
ChatContainer.displayName = "ChatContainer"
export { ChatContainer }
