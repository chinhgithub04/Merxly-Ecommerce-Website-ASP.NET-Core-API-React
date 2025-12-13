import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon, CubeIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui';
import { ProductFilters } from '../../components/products/ProductFilters';
import { ProductSearchAndSort } from '../../components/products/ProductSearchAndSort';
import { ProductTable } from '../../components/products/ProductTable';
import {
  getStoreProducts,
  getUsedCategories,
} from '../../services/productService';
import type { ProductQueryParameters } from '../../types/api/product';
import type {
  StoreProductSortBy,
  StoreProductSortOrder,
} from '../../types/enums';

export const StoreProductsPage = () => {
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

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-primary-50 rounded-lg'>
            <CubeIcon className='h-6 w-6 text-primary-600' />
          </div>
          <h1 className='text-3xl font-bold text-neutral-900'>Products</h1>
        </div>
        <Button className='cursor-pointer'>
          <PlusIcon className='h-5 w-5 mr-2' />
          Add Product
        </Button>
      </div>

      {/* Filters and Controls */}
      <div className='flex items-center justify-between gap-4'>
        <ProductFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
        <ProductSearchAndSort
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Products Table */}
      {isLoadingProducts ? (
        <div className='bg-white border border-neutral-200 rounded-lg p-12 text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto'></div>
          <p className='mt-4 text-neutral-600'>Loading products...</p>
        </div>
      ) : (
        <>
          <ProductTable
            products={products}
            selectedProducts={selectedProducts}
            onSelectProduct={handleSelectProduct}
            onSelectAll={handleSelectAll}
          />

          {/* Pagination Info */}
          {productsResponse?.data && (
            <div className='flex items-center justify-between text-sm text-neutral-600'>
              <span>
                Showing {products.length} of {productsResponse.data.totalCount}{' '}
                products
              </span>
              <div className='flex items-center gap-2'>
                <span>
                  Page {productsResponse.data.pageNumber} of{' '}
                  {productsResponse.data.totalPages}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
