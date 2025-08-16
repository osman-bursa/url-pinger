import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type LinkProviderValue = {
	links: Array<string>;
	setLinks: Dispatch<SetStateAction<string[]>> | (() => void);
};

const initialLinks = [
	'http://192.168.30.13:8801',
	'http://192.168.30.13:8802',
	'http://192.168.30.13:8803',
	'http://192.168.30.13:8804',
	'http://192.168.30.13:8805',
	'http://192.168.30.13:8806'
];

const LinkContext = createContext<LinkProviderValue>({
	links: initialLinks,
	setLinks: () => {}
})

const LinkProvider = ({ children }: { children: ReactNode; }) => {
	const [links, setLinks] = useState<string[]>(initialLinks);

	return (
		<LinkContext.Provider
			value={{
				links,
				setLinks
			}}
		>
			{children}
		</LinkContext.Provider>
	);
};

export default LinkProvider;

export const useLinks = () => {
	const context = useContext(LinkContext);

	if (!context) {
		throw new Error('useLinks must be used inside LinkProvider!');
	}

	return context;
};
