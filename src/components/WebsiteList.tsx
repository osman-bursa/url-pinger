import { Plus, X } from 'lucide-react';
import { useLinks } from '../proivders/UrlProvider';
import WebsiteLink from './WebsiteLink';
import { useState } from 'react';

function WebsiteList() {
	const { links } = useLinks();

	return (
		<div className="flex h-full w-full flex-1 flex-col items-center justify-start gap-2 overflow-x-hidden text-center">
			{links.map(l => (
				<WebsiteLink link={l} key={l} />
			))}

			<AddUrl />
		</div>
	);
}

function AddUrl() {
	const [isAdding, setAdding] = useState(false);
	const [newLink, setNewLink] = useState<string>("");
	const { setLinks } = useLinks();

	return (
		<div className='mt-auto w-full h-full sticky'>
			{isAdding ? (
				<div className='flex w-full h-10 items-center justify-center gap-1 rounded-xl bg-gray-800 p-2'>
					<input
						className='w-full'
						placeholder='Enter url address' type='text'
						onChange={(e) => setNewLink(e.target.value)}

					/>
					<Plus className='hover:bg-green-300 hover:text-gray-800 rounded cursor-pointer aspect-square'
						onClick={() => setLinks(prev => [...prev, newLink])}
					/>
					<X
						className='hover:bg-red-300 hover:text-gray-800 rounded cursor-pointer aspect-square'
						onClick={() => {
							setAdding(false);
							setNewLink("");
						}}
					/>
				</div>
			) : (
				<div className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-xl bg-gray-800 p-2"
					onClick={() => { setAdding(true); }}
				>
					<Plus />
					<div>ADD URL</div>
				</div>
			)
			}
		</div>
	);
}

export default WebsiteList;
