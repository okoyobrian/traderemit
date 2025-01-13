"use client"
import { ClipboardDocumentCheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

export default function InvoiceUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="mt-4">
      <label className="block mb-2 mt-3">
        <div className="font-medium text-md tracking-tight mb-1 text-secondary-text w-fit">
          Upload Invoice (PDF)
        </div>
        <div className="mb-4 mr-3 p-2 px-4 border border-gray-300 rounded-md w-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 transition-all duration-150 cursor-pointer">
            {fileName ? <><ClipboardDocumentCheckIcon className="icon mr-2 !fill-transparent" />{fileName}</> : (<><PlusIcon className="icon mr-2" /><span>Upload Invoice</span></>)}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}