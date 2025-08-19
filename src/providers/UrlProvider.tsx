import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { checkUrlStatus } from '../services';
import { initialUrls } from '../utils/constants';
import { URL_CHECK_INTERVAL } from '../utils/constants';

export type UrlItem = {
	label: string;
	url: string;
	status: boolean;
}

type LinkProviderValue = {
	urls: Array<UrlItem>;
	setUrls: Dispatch<SetStateAction<UrlItem[]>> | (() => void);
	lastCheckedDate: Date | null;
	setLastCheckedDate: Dispatch<SetStateAction<Date | null>> | (() => void);
};

const UrlContext = createContext<LinkProviderValue>({
	urls: initialUrls,
	setUrls: () => { },
	lastCheckedDate: null,
	setLastCheckedDate: () => { }
})

const UrlProvider = ({ children }: { children: ReactNode; }) => {
	const [urls, setUrls] = useState<UrlItem[]>(initialUrls);
	const [lastCheckedDate, setLastCheckedDate] = useState<Date | null>(null);

	useEffect(() => {
		const interval = setInterval(handleUrlChecks, URL_CHECK_INTERVAL);
		return () => clearInterval(interval);
	}, []);

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
				console.log("result: ", result, new Date())
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
