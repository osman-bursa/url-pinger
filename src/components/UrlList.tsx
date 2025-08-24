import { useUrls } from '../providers/UrlProvider';
import UrlCard from './UrlCard';
import AddUrlItem from './AddUrlItem';

function UrlList() {
	const { urls } = useUrls();

	return (
		<div className="flex h-full w-full flex-1 flex-col items-center justify-start gap-2 overflow-x-hidden text-center">
			<div className='w-full h-full flex flex-col flex-1 overflow-x-hidden overflow-y-auto gap-2 p-2'>
				{urls.map(u => (<UrlCard item={u} key={u.id} />))}
			</div>
			<AddUrlItem />
		</div>
	);
}

export default UrlList;
