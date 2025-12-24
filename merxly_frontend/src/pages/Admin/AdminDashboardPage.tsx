import { HomeIcon } from '@heroicons/react/24/outline';

export const AdminDashboardPage = () => {
  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex items-center gap-3'>
        <div className='p-2 bg-primary-50 rounded-lg'>
          <HomeIcon className='h-6 w-6 text-primary-600' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-neutral-900'>
            Admin Dashboard
          </h1>
          <p className='text-sm text-neutral-600'>
            Overview of platform performance and activities
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white rounded-lg border border-neutral-200 p-6'>
          <p className='text-sm text-neutral-600 mb-1'>Total Stores</p>
          <p className='text-3xl font-bold text-neutral-900'>1,234</p>
          <p className='text-xs text-success-600 mt-1'>↑ 12% from last month</p>
        </div>

        <div className='bg-white rounded-lg border border-neutral-200 p-6'>
          <p className='text-sm text-neutral-600 mb-1'>Total Users</p>
          <p className='text-3xl font-bold text-neutral-900'>45,678</p>
          <p className='text-xs text-success-600 mt-1'>↑ 8% from last month</p>
        </div>

        <div className='bg-white rounded-lg border border-neutral-200 p-6'>
          <p className='text-sm text-neutral-600 mb-1'>Total Revenue</p>
          <p className='text-3xl font-bold text-neutral-900'>$892K</p>
          <p className='text-xs text-success-600 mt-1'>↑ 15% from last month</p>
        </div>

        <div className='bg-white rounded-lg border border-neutral-200 p-6'>
          <p className='text-sm text-neutral-600 mb-1'>Pending Verifications</p>
          <p className='text-3xl font-bold text-neutral-900'>23</p>
          <p className='text-xs text-error-600 mt-1'>Requires attention</p>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className='bg-white rounded-lg border border-neutral-200 p-12 text-center'>
        <h3 className='text-lg font-semibold text-neutral-900 mb-2'>
          Admin Dashboard
        </h3>
        <p className='text-neutral-600'>
          This is a placeholder page. Dashboard components will be added here.
        </p>
      </div>
    </div>
  );
};
