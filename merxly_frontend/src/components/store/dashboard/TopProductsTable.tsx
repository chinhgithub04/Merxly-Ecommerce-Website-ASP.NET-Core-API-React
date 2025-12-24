interface TopProduct {
  id: string;
  name: string;
  totalSold: number;
  revenue: number;
  rating: number;
  stock: number;
}

const topProducts: TopProduct[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    totalSold: 245,
    revenue: 24500,
    rating: 4.8,
    stock: 45,
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    totalSold: 189,
    revenue: 37800,
    rating: 4.6,
    stock: 23,
  },
  {
    id: '3',
    name: 'Bluetooth Speaker Pro',
    totalSold: 156,
    revenue: 15600,
    rating: 4.9,
    stock: 67,
  },
  {
    id: '4',
    name: 'USB-C Hub Adapter',
    totalSold: 134,
    revenue: 6700,
    rating: 4.5,
    stock: 89,
  },
  {
    id: '5',
    name: 'Mechanical Keyboard RGB',
    totalSold: 112,
    revenue: 11200,
    rating: 4.7,
    stock: 34,
  },
];

export const TopProductsTable = () => {
  return (
    <div className='bg-white rounded-lg border border-neutral-200 p-6'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-neutral-900'>
          Top Selling Products
        </h3>
        <p className='text-sm text-neutral-600'>Best performers this month</p>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-neutral-200'>
              <th className='text-left py-3 px-4 text-sm font-semibold text-neutral-700'>
                Product
              </th>
              <th className='text-right py-3 px-4 text-sm font-semibold text-neutral-700'>
                Sold
              </th>
              <th className='text-right py-3 px-4 text-sm font-semibold text-neutral-700'>
                Revenue
              </th>
              <th className='text-right py-3 px-4 text-sm font-semibold text-neutral-700'>
                Rating
              </th>
              <th className='text-right py-3 px-4 text-sm font-semibold text-neutral-700'>
                Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <tr
                key={product.id}
                className='border-b border-neutral-100 hover:bg-neutral-50 transition-colors'
              >
                <td className='py-3 px-4'>
                  <div className='flex items-center gap-3'>
                    <span className='shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold'>
                      {index + 1}
                    </span>
                    <span className='text-sm font-medium text-neutral-900'>
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className='py-3 px-4 text-right text-sm text-neutral-700'>
                  {product.totalSold}
                </td>
                <td className='py-3 px-4 text-right text-sm font-semibold text-neutral-900'>
                  ${product.revenue.toLocaleString()}
                </td>
                <td className='py-3 px-4 text-right'>
                  <div className='flex items-center justify-end gap-1'>
                    <span className='text-sm text-neutral-700'>
                      {product.rating}
                    </span>
                    <span className='text-yellow-500'>★</span>
                  </div>
                </td>
                <td className='py-3 px-4 text-right'>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock < 30
                        ? 'bg-red-100 text-red-700'
                        : product.stock < 50
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
