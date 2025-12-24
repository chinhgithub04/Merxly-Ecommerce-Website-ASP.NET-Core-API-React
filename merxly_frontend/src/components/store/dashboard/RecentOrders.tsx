interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: number;
}

const recentOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-1234',
    customerName: 'John Smith',
    date: '2024-12-24',
    total: 299.99,
    status: 'Processing',
    items: 3,
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-1233',
    customerName: 'Sarah Johnson',
    date: '2024-12-24',
    total: 149.5,
    status: 'Shipped',
    items: 2,
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-1232',
    customerName: 'Michael Brown',
    date: '2024-12-23',
    total: 89.99,
    status: 'Delivered',
    items: 1,
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-1231',
    customerName: 'Emily Davis',
    date: '2024-12-23',
    total: 425.0,
    status: 'Processing',
    items: 5,
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-1230',
    customerName: 'David Wilson',
    date: '2024-12-22',
    total: 199.99,
    status: 'Pending',
    items: 2,
  },
];

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-purple-100 text-purple-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export const RecentOrders = () => {
  return (
    <div className='bg-white rounded-lg border border-neutral-200 p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold text-neutral-900'>
            Recent Orders
          </h3>
          <p className='text-sm text-neutral-600'>Latest customer orders</p>
        </div>
        <button className='text-sm font-medium text-primary-600 hover:text-primary-700'>
          View All →
        </button>
      </div>
      <div className='space-y-4'>
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className='flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50/50 transition-all cursor-pointer'
          >
            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-2'>
                <span className='text-sm font-semibold text-neutral-900'>
                  {order.orderNumber}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className='flex items-center gap-4 text-sm text-neutral-600'>
                <span>{order.customerName}</span>
                <span>•</span>
                <span>{order.items} items</span>
                <span>•</span>
                <span>{new Date(order.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-lg font-bold text-neutral-900'>
                ${order.total.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
