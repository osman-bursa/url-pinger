import { useEffect, useState } from 'react'
import { useUrls } from '../providers/UrlProvider'
import { getRelativeTime } from '../services'
import cn from '../utils/cn'

function MainHeader() {
	const { lastCheckedDate } = useUrls()
	const [relativeTime, setRelativeTime] = useState("???")

	 useEffect(() => {
    if (!lastCheckedDate) return

    setRelativeTime(getRelativeTime(lastCheckedDate))
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(lastCheckedDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [lastCheckedDate])

	return (
		<div className={cn(
			"flex flex-col",
			'h-20 w-full', 
			'rounded-xl'
			)}>
			<div className="flex h-full w-full items-center justify-center border-b-2 text-3xl font-semibold border-white">
				Tracking Urls
			</div>
			<div className="flex h-full w-full items-center justify-center text-lg">
				Last Check: {relativeTime}
			</div>
		</div>
	)
}

export default MainHeader
