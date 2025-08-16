import { Circle, Plus, Trash2 } from 'lucide-react'
import { useLinks } from '../proivders/UrlProvider'

function WebsiteList() {
	const { links } = useLinks()

	return (
		<div className="flex h-full w-full flex-1 flex-col items-center justify-start gap-2 overflow-x-hidden text-center">
			{links.map(link => (
				<div
					key={link}
					className="flex w-fit flex-col items-center justify-center rounded-xl bg-gray-800 px-2 py-1"
				>
					<div className="w-full cursor-pointer border-b-[1px] border-white">{link}</div>
					<div className="flex h-full w-full items-center justify-around">
						<div className="flex">
							<Circle width={16} />
							<div>status</div>
						</div>
						<div>time</div>
						<div className="cursor-pointer" onClick={() => {}}>
							<Trash2 />
						</div>
					</div>
				</div>
			))}

			<AddUrl />
		</div>
	)
}

function AddUrl() {
	return (
		<div className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-xl bg-gray-800 p-2">
			<Plus />
			<div>ADD URL</div>
		</div>
	)
}

export default WebsiteList
