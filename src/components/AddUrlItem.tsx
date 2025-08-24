import { Plus, X } from "lucide-react";
import { useUrls } from "../providers/UrlProvider";
import { useState } from "react";
import TooltipWrapper from "./TooltipWrapper";
import { addUrl } from "../services";

type AddUrlFormValues = {
  label: string;
  url: string;
}

const initialFormValues: AddUrlFormValues = { url: "", label: "" }

function AddUrlItem() {
  const [isAdding, setAdding] = useState(false);
  const [values, setValues] = useState<AddUrlFormValues>(initialFormValues);
  const { setUrls } = useUrls();

  const resetFormValues = () => { setValues(initialFormValues) }

  return (
    <div className='mt-auto w-full min-h-10 h-fit sticky p-2'>
      {isAdding ? (
        <div className="flex flex-col gap-1">
          <div className="h-10 rounded-xl bg-gray-800 p-2">
            <input
              className='w-full'
              placeholder='label' type='text'
              onChange={(e) => setValues(prev => ({
                ...prev,
                label: e.target.value
              }))}
            />
          </div>
          <div className='flex w-full h-10 items-center justify-center gap-1 rounded-xl bg-gray-800 p-2'>
            <input
              className='w-full'
              placeholder='url'
              type='text'
              onChange={(e) => setValues(prev => ({
                ...prev,
                url: e.target.value
              }))}
            />
            <TooltipWrapper content="Add new url item">
              <Plus className='hover:bg-green-300 hover:text-gray-800 rounded cursor-pointer aspect-square'
                onClick={async () => {
                  const newItem = { ...values, status: false }
                  const res = await addUrl(newItem)
                  if (res)
                    setUrls(prev => [...prev, { ...res }])
                }}
              />
            </TooltipWrapper>
            <TooltipWrapper content="Cancel">
              <X
                className='hover:bg-red-300 hover:text-gray-800 rounded cursor-pointer aspect-square'
                onClick={() => {
                  setAdding(false);
                  resetFormValues();
                }}
              />
            </TooltipWrapper>
          </div>
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

export default AddUrlItem;
