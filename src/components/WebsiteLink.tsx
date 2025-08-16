import { Circle, Trash2 } from 'lucide-react';
import { useLinks } from '../proivders/UrlProvider';

const WebsiteLink = ({ link }: { link: any; }) => {
  const { links, setLinks } = useLinks();
  return (
    <div
      className="flex w-full flex-col items-center justify-center rounded-xl bg-gray-800 px-2 py-1"
    >
      <div className="w-full cursor-pointer border-b-[1px] border-white">{link}</div>
      <div className="flex h-full w-full items-center justify-around">
        <div className="flex gap-0.5">
          <Circle width={16} className='text-green-300' fill='#7bf1a8'/>
          <div>status</div>
        </div>
        <div>time</div>
        <div className="cursor-pointer" onClick={() => {
          console.log("delete: ", link);
          const updated = links.filter(item => item != link);
          setLinks(updated);
        }}>
          <Trash2 />
        </div>
      </div>
    </div>
  );
};

export default WebsiteLink;