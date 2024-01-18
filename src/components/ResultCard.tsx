import { useRef, useState } from "react";
import { Copy } from "../icons/copy";
import copy from "clipboard-copy";

export const ResultCard = ({ shortUrl = "" }) => {
  const textToCopyRef = useRef<HTMLDivElement>(null);
  const [copiadou, setCopiadou] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      if (textToCopyRef.current) {
        const textToCopy = textToCopyRef.current.innerText;
        await copy(textToCopy);
        setCopiadou(true);

        setTimeout(() => {
          setCopiadou(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error trying to copy:", error);
    }
  };

  return (
    <>
      <div className="flex mt-6 w-full bg-slate-800 border border-gray-500 rounded-lg">
        <div
          id="sorturl"
          ref={textToCopyRef}
          className="p-4 text-green-300"
        >{`https://tinrl-f846a.web.app/${shortUrl}`}</div>
        <div className="w-[14%] bg-slate-900 ml-auto rounded-r-lg">
          <button
            type="button"
            className="h-full w-full px-3 flex items-center py-2  text-white hover:bg-green-800 rounded-r-lg"
            onClick={handleCopy}
          >
            <Copy />

            {!copiadou && (
              <span className="ps-0 lg:ps-1 text-sm hidden lg:block ">
                Copy
              </span>
            )}
            {copiadou && (
              <span className="ps-0 lg:ps-1 text-sm hidden lg:block ">
                Copied
              </span>
            )}
          </button>
        </div>
      </div>
      {copiadou && (
        <div
          className="absolute top-6 start-1/3 p-2 text-md rounded-lg bg-green-700"
          role="alert"
        >
          <span className="font-medium  text-white">
            Enlace copiado al portapapeles!
          </span>
        </div>
      )}
    </>
  );
};
