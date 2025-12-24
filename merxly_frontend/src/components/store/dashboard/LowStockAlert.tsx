interface LowStockProduct {
  id: string;
  name: string;
  stock: number;
  category: string;
  lastSold: string;
}

const lowStockProducts: LowStockProduct[] = [
  {
    id: '1',
    name: 'Wireless Mouse Pro',
    stock: 5,
    category: 'Electronics',
    lastSold: '2 hours ago',
  },
  {
    id: '2',
    name: 'USB-C Cable 3m',
    stock: 8,
    category: 'Accessories',
    lastSold: '5 hours ago',
  },
  {
    id: '3',
    name: 'Screen Protector',
    stock: 12,
    category: 'Accessories',
    lastSold: '1 day ago',
  },
  {
    id: '4',
    name: 'Phone Stand Aluminum',
    stock: 3,
    category: 'Accessories',
    lastSold: '3 hours ago',
  },
];

export const LowStockAlert = () => {
  return (
    <div className='bg-white rounded-lg border border-neutral-200 p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-neutral-900'>
            Low Stock Alert
          </h3>
          <p className='text-sm text-neutral-600'>Products need restocking</p>
        </div>
        <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium'>
          {lowStockProducts.length} Items
        </span>
      </div>
      <div className='space-y-3'>
        {lowStockProducts.map((product) => (
          <div
            key={product.id}
            className='flex items-center justify-between p-3 border border-red-200 bg-red-50/50 rounded-lg'
          >
            <div className='flex-1'>
              <p className='text-sm font-medium text-neutral-900 mb-1'>
                {product.name}
              </p>
              <div className='flex items-center gap-2 text-xs text-neutral-600'>
                <span>{product.category}</span>
                <span>•</span>
                <span>Last sold {product.lastSold}</span>
              </div>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <span className='px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold'>
                {product.stock} left
              </span>
              <button className='text-xs font-medium text-primary-600 hover:text-primary-700'>
                Restock →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
