import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, File } from 'lucide-react';
import { Category, Product, ProductType, Size } from '../types/Product';
import { productService } from '../services/api';
import { SelectField } from './SelectField';
import { FileUpload } from './FileUpload';
import { GalleryUpload } from './GalleryUpload';
import toast from 'react-hot-toast';

interface ProductFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  onClose: () => void;
  initialData?: Product;
}

export const ProductForm = ({ onSubmit, onClose, initialData }: ProductFormProps) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Product>({
    defaultValues: {
      ...initialData,
      categoryId: initialData?.categoryId || 'Selecione',
      typeId: initialData?.typeId || 'Selecione',
      sizeId: initialData?.sizeId || 'Selecione'
    }
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<ProductType[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [manualPreview, setManualPreview] = useState<string | null>(null);
  const [projectPreview, setProjectPreview] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File }>({});

  useEffect(() => {
    const loadData = async () => {
      const [categoriesRes, typesRes, sizesRes] = await Promise.all([
        productService.getCategories(),
        productService.getTypes(),
        productService.getSizes()
      ]);
      setCategories(categoriesRes.data);
      setTypes(typesRes.data);
      setSizes(sizesRes.data);

      if (initialData?.gallery) {
        setGalleryPreviews(initialData.gallery);
      }
      if (initialData?.manualUrl) {
        setManualPreview(initialData.manualUrl);
      }
      if (initialData?.projectUrl) {
        setProjectPreview(initialData.projectUrl);
      }

      // Set initial values for selects
      if (initialData?.categoryId) {
        setValue('categoryId', initialData.categoryId);
      }
      if (initialData?.typeId) {
        setValue('typeId', initialData.typeId);
      }
      if (initialData?.sizeId) {
        setValue('sizeId', initialData.sizeId);
      }
    };
    loadData();
  }, [initialData, setValue]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = event.target.files;
    if (!files) return;

    if (type === 'gallery' && initialData) {
      toast.error('Gallery cannot be modified during update');
      return;
    }

    if (type === 'gallery') {
      if (galleryPreviews.length + files.length > 3) {
        toast.error('Maximum 3 gallery images allowed');
        return;
      }

      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setGalleryPreviews(prev => [...prev, ...newPreviews]);
      Array.from(files).forEach(file => {
        setSelectedFiles(prev => ({ ...prev, [`gallery_${Date.now()}`]: file }));
      });
    } else {
      const file = files[0];
      const fileURL = URL.createObjectURL(file);
      setSelectedFiles(prev => ({ ...prev, [type]: file }));

      if (type === 'manual') {
        setManualPreview(fileURL);
      } else if (type === 'project') {
        setProjectPreview(fileURL);
      }
    }
  };

  const truncateLabel = (label: string, maxLength: number) => {
    return label.length > maxLength ? label.slice(0, maxLength) + "..." : label;
  };
  

  const removeFile = (type: string) => {
    setSelectedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[type];
      return newFiles;
    });

    if (type === 'manual') {
      setManualPreview(null);
    } else if (type === 'project') {
      setProjectPreview(null);
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    const fileKey = Object.keys(selectedFiles).find(key => key.startsWith('gallery_'));
    if (fileKey) {
      const newFiles = { ...selectedFiles };
      delete newFiles[fileKey];
      setSelectedFiles(newFiles);
    }
  };

  const onFormSubmit = async (data: Product) => {
    const formData = new FormData();
  
    // Adicionar os dados básicos do formulário
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value as string);
      }
    });
  
    // Adicionar arquivos selecionados
    Object.entries(selectedFiles).forEach(([key, file]) => {
      if (key.startsWith('gallery_')) {
        formData.append('gallery', file); // Envia como array
      } else {
        formData.append(key, file); // Outros arquivos como manual e projeto
      }
    });
  
    try {
      await onSubmit(formData);
      toast.success('Produto salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      toast.error('Erro ao salvar produto');
    }
  };
  
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl">
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            {initialData ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                {...register('name', { required: 'Nome é obrigatório.' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name.message}</span>
              )}
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                {...register('description', { 
                  required: 'Descrição é obrigatória.',
                  maxLength: { value: 100, message: 'A descrição não pode passar de 100 carácteres.' }
                })}
                rows={4}
                maxLength={100} // Added maxLength attribute
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.description && (
                <span className="text-sm text-red-500">{errors.description.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Especificações</label>
              <textarea
                {...register('specify', { 
                  maxLength: { value: 2000, message: 'A especificação não pode passar de 2000 carácteres.' }
                })}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.specify && (
                <span className="text-sm text-red-500">{errors.specify.message}</span>
              )}
            </div>

            <SelectField
              label="Categoria"
              options={!initialData ? [{ id: 'Selecione', name: 'Selecione' }, ...categories] : categories}
              value={initialData?.category.id || 'Selecione'}
              onChange={(value) => setValue('categoryId', value)}
              required
              error={errors.categoryId?.message}
            />

            <SelectField
              label="Tipo"
              options={!initialData ? [{ id: 'Selecione', name: 'Selecione' }, ...types] : types}
              value={initialData?.type.id || 'Selecione'}
              onChange={(value) => setValue('typeId', value)}
              error={errors.typeId?.message}
            />

            <SelectField
              label="Tamanho"
              options={!initialData ? [{ id: 'Selecione', name: 'Selecione' }, ...sizes] : sizes}
              value={initialData?.size.id || 'Selecione'}
              onChange={(value) => setValue('sizeId', value)}
              error={errors.sizeId?.message}
            />

            <GalleryUpload
              previews={galleryPreviews}
              onFileSelect={(e) => handleFileSelect(e, 'gallery')}
              onRemove={removeGalleryImage}
              disabled={!!initialData} // Disable gallery upload if editing
            />

            <FileUpload
              label="Manual (PDF)"
              accept=".pdf"
              onChange={(e) => handleFileSelect(e, 'manual')}
              disabled={false}
            />
            {manualPreview && (
              <div className="mt-2 flex items-center">
                <File className="text-gray-500 mr-2" />
                <a href={manualPreview} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700">
                  {truncateLabel(manualPreview, 20)}
                </a>
                <button
                  type="button"
                  onClick={() => removeFile('manual')}
                  className="ml-2 text-sm text-red-500"
                >
                  Remover
                </button>
              </div>
            )}

            <FileUpload
              label="Projeto da Caixa (PDF)"
              accept=".pdf"
              onChange={(e) => handleFileSelect(e, 'project')}
              disabled={false}
            />
            {projectPreview && (
              <div className="mt-2 flex items-center">
                <File className="text-gray-500 mr-2" />
                <a href={projectPreview} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700">
                  {truncateLabel(projectPreview, 20)}
                </a>
                <button
                  type="button"
                  onClick={() => removeFile('project')}
                  className="ml-2 text-sm text-red-500"
                >
                  Remover
                </button>
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t bg-gray-50">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
