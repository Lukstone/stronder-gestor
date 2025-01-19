import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { productService } from '../services/api';
import { Product } from '../types/Product';

interface ProductListProps {
  onAdd: () => void;
  onEdit: (product: Product) => void;
}

export const ProductList = ({ onAdd, onEdit }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const response = await productService.getAll();
    setProducts(response.data);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      await productService.delete(productToDelete);
      setProductToDelete(null);
      setShowConfirm(false);
      loadProducts();
    }
  };

  const openConfirmModal = (id: string) => {
    setProductToDelete(id);
    setShowConfirm(true);
  };

  const closeConfirmModal = () => {
    setProductToDelete(null);
    setShowConfirm(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.type.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.size.value.toLowerCase().includes(searchText.toLowerCase()) ||
    product.category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="h-full bg-white">
      <div className="p-6 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
        <div className="flex space-x-4">
    <button
      onClick={loadProducts}
      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
    >
      Atualizar Produtos
    </button>
    <button
      onClick={onAdd}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      <Plus size={20} className="mr-2" />
      Adicionar Produto
    </button>
  </div>
      </div>
      <div className="p-6">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">Carregando...</div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tamanho
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <div className="text-sm font-medium text-gray-900">{product.type.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <div className="text-sm font-medium text-gray-900">{product.size.value}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <div className="text-sm font-medium text-gray-900">{product.category.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => product.id && openConfirmModal(product.id)}
                      className="text-red-600 hover:text-red-900 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Confirmação</h2>
            <p className="mb-4">Tem certeza que deseja deletar este produto?</p>
            <div className="flex justify-end">
              <button
                onClick={closeConfirmModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};