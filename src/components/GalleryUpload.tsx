import React from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { FileUpload } from './FileUpload';

interface GalleryUploadProps {
  previews: string[];
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  maxFiles?: number;
  disabled?: boolean;
}

export const GalleryUpload = ({ previews, onFileSelect, onRemove, maxFiles = 3, disabled = false }: GalleryUploadProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Galeria de Imagens (Max {maxFiles})
      </label>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {previews.map((preview, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
            {!disabled && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
      {!disabled && previews.length < maxFiles && (
        <FileUpload
          label={`Adicionar Imagens (${maxFiles - previews.length} restante)`}
          accept="image/*"
          onChange={onFileSelect}
          icon={<ImageIcon />}
          multiple={false}
          disabled={disabled}
        />
      )}
    </div>
  );
};