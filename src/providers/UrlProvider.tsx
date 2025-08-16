import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

export type UrlItem = {
	label: string;
	url: string;
	status: boolean;
}

type LinkProviderValue = {
	urls: Array<UrlItem>;
	setUrls: Dispatch<SetStateAction<UrlItem[]>> | (() => void);
};

const initials: UrlItem[] = [
	{
		label: "server",
		url: 'http://192.168.30.13:8801',
		status: true
	},
	{
		label: "uyum",
		url: 'http://192.168.30.13:8802',
		status: true
	},
	{
		label: "retmes",
		url: 'http://192.168.30.13:8803',
		status: true
	},
	{
		label: "mongo",
		url: 'http://192.168.30.13:8804',
		status: true
	},
	{
		label: "mqtt",
		url: 'http://192.168.30.13:8805',
		status: true
	},
	{
		label: "utils",
		url: 'http://192.168.30.13:8806',
		status: true
	},
]

const UrlContext = createContext<LinkProviderValue>({
	urls: initials,
	setUrls: () => { }
})

const UrlProvider = ({ children }: { children: ReactNode; }) => {
	const [urlItems, setUrlItems] = useState<UrlItem[]>(initials);

	return (
		<UrlContext.Provider
			value={{
				urls: urlItems,
				setUrls: setUrlItems
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
