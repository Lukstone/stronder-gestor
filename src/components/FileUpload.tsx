import React, { useState } from 'react';
import { File } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  multiple?: boolean;
  disabled?: boolean;
}

export const FileUpload = ({ label, accept, onChange, icon = <File />, multiple = false, disabled = false }: FileUploadProps) => {
  const [key, setKey] = useState(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setKey(Date.now()); // Reset the key to force re-render
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center justify-center w-full">
        <label className={`w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}`}>
          <div className="mx-auto h-12 w-12 text-gray-400">
            {icon}
          </div>
          <span className="mt-2 text-sm text-gray-500">
            {label}
          </span>
          <input
            key={key}
            type="file"
            accept={accept}
            multiple={multiple}
            className="hidden"
            onChange={handleChange}
            disabled={disabled}
          />
        </label>
      </div>
    </div>
  );
};