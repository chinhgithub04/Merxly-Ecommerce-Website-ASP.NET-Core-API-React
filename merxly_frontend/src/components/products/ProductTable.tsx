import type { ProductForStore } from '../../types/models/product';
import { Badge } from '../ui';
import { useNavigate } from 'react-router-dom';

interface ProductTableProps {
  products: ProductForStore[];
  selectedProducts: Set<string>;
  onSelectProduct: (productId: string) => void;
  onSelectAll: (checked: boolean) => void;
}

export const ProductTable = ({
  products,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
}: ProductTableProps) => {
  const navigate = useNavigate();
  const allSelected =
    products.length > 0 && products.every((p) => selectedProducts.has(p.id));

  return (
    <div className='bg-white border border-neutral-200 rounded-lg overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-neutral-50 border-b border-neutral-200'>
            <tr>
              <th className='w-12 px-4 py-3 text-left'>
                <input
                  type='checkbox'
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className='w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-600 cursor-pointer'
                />
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                Product
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                Inventory
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                Category
              </th>
              <th className='px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider'>
                Featured
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-neutral-200'>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className='px-4 py-12 text-center text-neutral-500'
                >
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => navigate(`/store/products/${product.id}`)}
                  className='hover:bg-neutral-50 transition-colors cursor-pointer'
                >
                  <td className='px-4 py-4'>
                    <input
                      type='checkbox'
                      checked={selectedProducts.has(product.id)}
                      onChange={() => onSelectProduct(product.id)}
                      onClick={(e) => e.stopPropagation()}
                      className='w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-600 cursor-pointer'
                    />
                  </td>
                  <td className='px-4 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 rounded-lg border border-neutral-200 overflow-hidden bg-neutral-100 shrink-0'>
                        {product.mainMediaUrl ? (
                          <img
                            src={product.mainMediaUrl}
                            alt={product.name}
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <div className='w-full h-full flex items-center justify-center text-neutral-400 text-xs'>
                            No image
                          </div>
                        )}
                      </div>
                      <span className='text-sm font-medium text-neutral-900'>
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className='px-4 py-4'>
                    <Badge variant={product.isActive ? 'success' : 'neutral'}>
                      {product.isActive ? 'Active' : 'Draft'}
                    </Badge>
                  </td>
                  <td className='px-4 py-4'>
                    <span className='text-sm text-neutral-700'>
                      {product.totalStock} in stock
                      {product.totalVariants > 0 && (
                        <span className='text-neutral-500'>
                          {' '}
                          for {product.totalVariants} variant
                          {product.totalVariants > 1 ? 's' : ''}
                        </span>
                      )}
                    </span>
                  </td>
                  <td className='px-4 py-4'>
                    <span className='text-sm text-neutral-700'>
                      {product.categoryName || (
                        <span className='text-neutral-400'>Uncategorized</span>
                      )}
                    </span>
                  </td>
                  <td className='px-4 py-4'>
                    {product.isStoreFeatured && (
                      <Badge variant='info'>Featured</Badge>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
