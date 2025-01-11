export interface Product {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  type: Type;
  size: Size;
  gallery: string[];
  categoryId: string;
  typeId?: string;
  sizeId?: string;
  manualUrl?: string;
  projectUrl?: string;
  specify?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductType {
  id: string;
  name: string;
}

export interface Type {
  id: string;
  name: string;
}

export interface Size {
  id: string;
  value: string;
}