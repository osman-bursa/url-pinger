import cn from './utils/cn';
import MainHeader from './components/MainHeader';
import WebsiteList from './components/WebsiteList';
import LinkProvider from './proivders/UrlProvider';

function App() {
	return (
		<LinkProvider>
			<div
				className={cn(
					'h-full min-h-screen w-full min-w-screen overflow-x-hidden',
					'flex flex-col gap-2 rounded-lg bg-gray-900 font-mono text-white'
				)}
			>
				<MainHeader />
				<WebsiteList />
			</div>
		</LinkProvider>
	);
}

export default App;
