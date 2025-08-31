import cn from './utils/cn';
import MainHeader from './components/MainHeader';
import UrlList from './components/UrlList';
import UrlProvider from './providers/UrlProvider';
import { useState } from 'react';
import MinimizedContent from './components/MinimizedContent';

function App() {
	const [isMinimized, setMinimized] = useState(false)
	return (
		<UrlProvider>
			<div
				className={cn(
					'h-full min-h-screen w-full min-w-screen overflow-x-hidden',
					'flex flex-col gap-2 rounded-lg bg-gray-900 font-mono text-white',
				)}
			>
				{
					isMinimized ?
						<MinimizedContent setMinimized={setMinimized} />
						:
						<>
							<MainHeader setMinimized={setMinimized} />
							<UrlList />
						</>
				}
			</div>
		</UrlProvider>
	);
}

export default App;
