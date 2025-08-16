import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip"
import { ReactNode } from "react"

type TooltipWrapperProps = {
  children: ReactNode
  content: ReactNode
  tooltipProps?: React.ComponentProps<typeof Tooltip>
  contentProps?: React.ComponentProps<typeof TooltipContent>
}

const TooltipWrapper = ({
  children,
  content,
  tooltipProps,
  contentProps,
}: TooltipWrapperProps) => {
  return (
    <Tooltip {...tooltipProps}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent {...contentProps}>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

export default TooltipWrapper
