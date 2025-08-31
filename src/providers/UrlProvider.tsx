import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { checkUrlStatus, getAllUrls } from '../services';
import { URL_CHECK_INTERVAL } from '../utils/constants';

export type UrlItem = {
	id: number;
	label: string;
	url: string;
	status: boolean;
}

export type UrlItemPayload = Omit<UrlItem, 'id'>;

type LinkProviderValue = {
	urls: Array<UrlItem>;
	setUrls: Dispatch<SetStateAction<UrlItem[]>> | (() => void);
	online: number;
	offline: number;
	lastCheckedDate: Date | null;
	setLastCheckedDate: Dispatch<SetStateAction<Date | null>> | (() => void);
};

const UrlContext = createContext<LinkProviderValue>({
	urls: [],
	setUrls: () => { },
	online: 0,
	offline: 0,
	lastCheckedDate: null,
	setLastCheckedDate: () => { }
})

const UrlProvider = ({ children }: { children: ReactNode; }) => {
	const [urls, setUrls] = useState<UrlItem[]>([]);
	const [lastCheckedDate, setLastCheckedDate] = useState<Date | null>(null);

	useEffect(() => {
		fetchExistingUrls()
		setTimeout(() => {
				handleUrlChecks()
		}, 100);
		
		const interval = setInterval(handleUrlChecks, URL_CHECK_INTERVAL);
		return () => clearInterval(interval);
	}, []);

	async function fetchExistingUrls() {
		const res = await getAllUrls()
		setUrls(res)
	}

	async function handleUrlChecks() {
		setUrls(prevUrls => {
			if (!prevUrls.length)
				return prevUrls;

			const resultsPromise = Promise.all(
				prevUrls.map(async (u) => {
					const isOnline = await checkUrlStatus(u.url);
					return { ...u, status: isOnline };
				})
			);

			resultsPromise.then(result => {
				setUrls(result);
				setLastCheckedDate(new Date());
			})

			return prevUrls;
		});
		setLastCheckedDate(new Date())
	}

	return (
		<UrlContext.Provider
			value={{
				urls: urls,
				setUrls: setUrls,
				online: urls.filter(u => u.status)?.length ?? 0,
				offline: urls.filter(u => !u.status)?.length ?? 0,
				lastCheckedDate: lastCheckedDate,
				setLastCheckedDate: setLastCheckedDate
			}}
		>
			{children}
		</UrlContext.Provider>
	);
};

export default UrlProvider;

export const useUrls = () => {
	const context = useContext(UrlContext);

	if (!context) {
		throw new Error('useLinks must be used inside LinkProvider!');
	}

	return context;
};
