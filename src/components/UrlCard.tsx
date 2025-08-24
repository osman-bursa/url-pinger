import { Circle, Copy, ExternalLink, Trash2 } from 'lucide-react'
import { UrlItem, useUrls } from '../providers/UrlProvider'
import cn from '../utils/cn'
import { deleteUrl, openUrl } from '../services'

const UrlCard = ({ item }: { item: UrlItem }) => {
	const { setUrls } = useUrls()

	const handleDelete = () => {
		setUrls(prev => [...prev.filter(u => u.id != item.id)])
		if (item.id) {
			deleteUrl(item.id)
		}
	}

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(item.url)
		} catch (err) {
			console.error('Failed to copy:', err)
		}
	}

	return (
		<div className="flex w-full items-center justify-center gap-0.5 rounded-xl bg-gray-800 px-2 py-1">
			<Circle
				width={16}
				className={cn({ 'text-green-300': item.status }, { 'text-red-300': !item.status })}
				fill={item.status ? '#7bf1a8' : '#fca5a5'}
			/>
			<div className="hover: flex w-full flex-1 items-center truncate hover:bg-gray-400">{`${item.label}`}</div>
			<div className="flex items-center justify-center gap-0.5">
				<ExternalLink
					className="w-4 hover:w-6 hover:text-indigo-300"
					onClick={() => openUrl(item.url)}
				/>
				<Copy
					className="w-4 cursor-pointer delay-100 hover:w-6 hover:text-green-300"
					onClick={handleCopy}
				/>
				<Trash2
					className="w-4 cursor-pointer delay-100 hover:w-6 hover:text-red-300"
					onClick={handleDelete}
				/>
			</div>
		</div>
	)
}

export default UrlCard
