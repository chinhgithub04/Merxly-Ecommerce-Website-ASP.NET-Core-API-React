import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getStoreProducts,
  getUsedCategories,
} from '../services/productService';
import type { ProductQueryParameters } from '../types/api/product';
import type { StoreProductSortBy, StoreProductSortOrder } from '../types/enums';

export const useStoreProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  );
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'active' | 'draft' | 'featured'
  >('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<StoreProductSortBy>('CreatedAt');
  const [sortOrder, setSortOrder] =
    useState<StoreProductSortOrder>('Descending');
  const [pageNumber] = useState(1);

  // Build query parameters
  const queryParams = useMemo<ProductQueryParameters>(() => {
    const params: ProductQueryParameters = {
      pageNumber,
      pageSize: 10,
      sortBy,
      sortOrder,
    };

    if (searchTerm) params.searchTerm = searchTerm;
    if (selectedCategory) params.categoryId = selectedCategory;

    switch (activeFilter) {
      case 'active':
        params.isActive = true;
        break;
      case 'draft':
        params.isActive = false;
        break;
      case 'featured':
        params.isStoreFeatured = true;
        break;
    }

    return params;
  }, [
    activeFilter,
    selectedCategory,
    searchTerm,
    sortBy,
    sortOrder,
    pageNumber,
  ]);

  // Fetch products
  const { data: productsResponse, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['storeProducts', queryParams],
    queryFn: () => getStoreProducts(queryParams),
  });

  // Fetch categories
  const { data: categoriesResponse } = useQuery({
    queryKey: ['usedCategories'],
    queryFn: getUsedCategories,
  });

  const products = productsResponse?.data?.items || [];
  const categories = categoriesResponse?.data || [];

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(new Set(products.map((p) => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleSortChange = (
    newSortBy: StoreProductSortBy,
    newSortOrder: StoreProductSortOrder
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return {
    // State
    selectedProducts,
    activeFilter,
    selectedCategory,
    searchTerm,
    sortBy,
    sortOrder,

    // Data
    products,
    categories,
    productsResponse,
    isLoadingProducts,

    // Handlers
    setActiveFilter,
    setSelectedCategory,
    setSearchTerm,
    handleSortChange,
    handleSelectProduct,
    handleSelectAll,
  };
};
