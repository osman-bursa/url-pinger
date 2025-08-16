import cn from './utils/cn'
import MainHeader from './components/MainHeader'
import WebsiteList from './components/WebsiteList'

function App() {
	return (
		<div
			className={cn(
				'h-full min-h-screen w-full min-w-screen overflow-x-hidden',
				'flex flex-col gap-2 rounded-lg bg-gray-900 font-mono text-white'
			)}
		>
			<MainHeader />
			<WebsiteList />
		</div>
	)
}

export default App
