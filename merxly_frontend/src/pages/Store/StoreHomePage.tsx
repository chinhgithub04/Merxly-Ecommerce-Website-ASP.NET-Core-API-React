import { StatsCard } from '../../components/store/dashboard/StatsCard';
import { RevenueChart } from '../../components/store/dashboard/RevenueChart';
import { OrdersChart } from '../../components/store/dashboard/OrdersChart';
import { TopProductsTable } from '../../components/store/dashboard/TopProductsTable';
import { RecentOrders } from '../../components/store/dashboard/RecentOrders';
import { CategoryPerformance } from '../../components/store/dashboard/CategoryPerformance';
import { LowStockAlert } from '../../components/store/dashboard/LowStockAlert';
import { HomeIcon } from '@heroicons/react/24/outline';

export const StoreHomePage = () => {
  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex items-center gap-3'>
        <div className='p-2 bg-primary-50 rounded-lg'>
          <HomeIcon className='h-6 w-6 text-primary-600' />
        </div>
        <h1 className='text-3xl font-bold text-neutral-900 mb-2'>
          Store Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatsCard
          title='Total Revenue'
          value='$35,429'
          change={{ value: 12.5, trend: 'up' }}
          subtitle='vs last month'
          icon={
            <svg
              className='w-6 h-6 text-primary-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          }
        />
        <StatsCard
          title='Total Orders'
          value='1,249'
          change={{ value: 8.2, trend: 'up' }}
          subtitle='vs last month'
          icon={
            <svg
              className='w-6 h-6 text-primary-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              />
            </svg>
          }
        />
        <StatsCard
          title='Active Products'
          value='127'
          subtitle='4 out of stock'
          icon={
            <svg
              className='w-6 h-6 text-primary-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
              />
            </svg>
          }
        />
        <StatsCard
          title='Average Rating'
          value='4.7'
          change={{ value: 0.3, trend: 'up' }}
          subtitle='from 342 reviews'
          icon={
            <svg
              className='w-6 h-6 text-primary-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
              />
            </svg>
          }
        />
      </div>

      {/* Charts Row */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <RevenueChart />
        </div>
        <div className='lg:col-span-1'>
          <CategoryPerformance />
        </div>
      </div>

      {/* Orders Chart */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <OrdersChart />
        <LowStockAlert />
      </div>

      {/* Tables */}
      <TopProductsTable />

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
};
