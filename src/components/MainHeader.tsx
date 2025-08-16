import cn from '../utils/cn'

function MainHeader() {
	return (
		<div className={cn('h-12 w-full', 'rounded-xl text-3xl font-semibold')}>
			<div className="flex h-full w-full items-center justify-center border-b-2 border-white">
				Tracking Urls
			</div>
		</div>
	)
}

export default MainHeader
