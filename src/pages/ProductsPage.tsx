import { useState } from 'react';
import { ProductList } from '../components/ProductList';
import { ProductForm } from '../components/ProductForm';
import { Navbar } from '../components/Navbar';
import { Product } from '../types/Product';
import { productService } from '../services/api';
import toast from 'react-hot-toast';

export const ProductsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const handleSubmit = async (formData: FormData) => {
    try {
      if (selectedProduct) {
        await productService.update(selectedProduct.id!, formData);
      } else {
        await productService.create(formData);
      }
      setShowForm(false);
      setSelectedProduct(undefined);
    } catch (error) {
      toast.error('Error saving product');
    }
  };

  const handleAdd = () => {
    setSelectedProduct(undefined);
    setShowForm(true);
  };

  const handleEdit = async (productId: string) => {
    try {
      const response = await productService.getById(productId);
      setSelectedProduct(response.data);
      setShowForm(true);
    } catch (error) {
      toast.error('Error fetching product data');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-1">
        <ProductList onAdd={handleAdd} onEdit={(product) => handleEdit(product.id!)} />
        {showForm && (
          <ProductForm
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
            initialData={selectedProduct}
          />
        )}
      </div>
    </div>
  );
};