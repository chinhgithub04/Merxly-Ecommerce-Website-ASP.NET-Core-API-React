import { PlusIcon, CubeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { ProductFilters } from '../../components/products/ProductFilters';
import { ProductSearchAndSort } from '../../components/products/ProductSearchAndSort';
import { ProductTable } from '../../components/products/ProductTable';
import { useStoreProducts } from '../../hooks/useStoreProducts';

export const StoreProductsPage = () => {
  const navigate = useNavigate();
  const {
    selectedProducts,
    activeFilter,
    selectedCategory,
    searchTerm,
    sortBy,
    sortOrder,
    products,
    categories,
    productsResponse,
    isLoadingProducts,
    setActiveFilter,
    setSelectedCategory,
    setSearchTerm,
    handleSortChange,
    handleSelectProduct,
    handleSelectAll,
  } = useStoreProducts();

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
        <Button
          className='cursor-pointer'
          onClick={() => navigate('/store/products/new')}
        >
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
