import { Circle, Trash2 } from 'lucide-react';
import { UrlItem, useUrls } from '../providers/UrlProvider';
import cn from '../utils/cn';
import TooltipWrapper from './TooltipWrapper';

const UrlCard = ({ item }: { item: UrlItem; }) => {
  const { setUrls } = useUrls();
  return (
    <div
      className="flex w-full flex-col items-center justify-center rounded-xl bg-gray-800 px-2 py-1"
    >
      <TooltipWrapper content={item.url} contentProps={{ className: "bg-gray-900 text-white" }}>
        <div className="w-full border-b border-white truncate">
          {`${item.label} --> ${item.url}`}
        </div>
      </TooltipWrapper>

      <div className="flex h-full w-full items-center justify-around">
        <div className="flex gap-0.5">
          <Circle
            width={16}
            className={cn(
              { 'text-green-300': item.status },
              { 'text-red-300': !item.status },
            )}
            fill={item.status ? '#7bf1a8' : '#fca5a5'}
          />
          <div>{item.status ? 'online' : 'offline'}</div>
        </div>
        <div>time</div>
        <div>
          <Trash2
            className="cursor-pointer"
            onClick={() => {
              setUrls(prev => [...prev.filter(u => u.url != item.url)]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UrlCard;