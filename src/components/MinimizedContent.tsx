import { Maximize2, X } from "lucide-react"
import { useUrls } from "../providers/UrlProvider"
import cn from "../utils/cn"
import { expand, quit } from "../services"

const MinimizedContent = ({ setMinimized }: { setMinimized: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { online, offline } = useUrls()

  const handleMaximize = () => {
    setMinimized(false)
    expand()
  }

  return (
    <div className="w-[60px] h-[60px] cursor-grab">
      <div className="flex w-full h-[24px]">
        <Maximize2 className="flex-1 hover:bg-slate-700 rounded cursor-pointer p-0.5"
          onClick={handleMaximize}
        />
        <X
          className="flex-1 rounded p-0.5 cursor-pointer hover:bg-red-700 delay-100" 
          style={{}}
          onClick={() => quit()}
        />
      </div>
      <div className="flex justify-center items-center w-full h-[36px] draggable">
        <StatusCard value={online} color="green" />
        <StatusCard value={offline} color="red" />
      </div>
    </div>
  )
}

const StatusCard = ({ value, color }: { value: number, color: 'green' | 'red' }) => {
  return (
    <div className="flex-1 h-full flex justify-center items-center">
      <div className={cn(
        "flex justify-center items-center rounded-full w-6 h-6",
        { "bg-green-400": color === 'green' },
        { "bg-red-400": color === 'red' }
      )}>
        {value}
      </div>
    </div>
  )
}

export default MinimizedContent