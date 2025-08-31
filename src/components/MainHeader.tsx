import { useEffect, useState } from 'react'
import { useUrls } from '../providers/UrlProvider'
import { quit, shrink } from '../services'
import cn from '../utils/cn'
import { ChevronRight, X } from 'lucide-react'
import { getRelativeTime } from '../lib/utils'

function MainHeader({ setMinimized }: { setMinimized: React.Dispatch<React.SetStateAction<boolean>> }) {
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
			<div className={cn(
				'flex h-full w-full items-center justify-center',
				'text-2xl font-semibold',
				'border-b-2 border-white'
			)}>
				<div
					className='w-5 h-full flex justify-center items-center cursor-pointer hover:bg-slate-700 delay-100'
					onClick={() => {
						setMinimized(true)
						shrink()
					}}
				>
					<ChevronRight />
				</div>
				<div className='flex-1 text-center draggable'>Tracking Urls</div>
				<div
					onClick={() => quit()}
					className='w-5 h-full flex justify-center items-center cursor-pointer hover:bg-red-700 delay-100'
				>
					<X />
				</div>
			</div>
			<div className="flex h-full w-full items-center justify-center text-base">
				Last Check: {relativeTime}
			</div>
		</div>
	)
}

export default MainHeader
