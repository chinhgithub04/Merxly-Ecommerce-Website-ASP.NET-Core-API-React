import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

export const AdminStoresPage = () => {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <div className='p-2 bg-primary-50 rounded-lg'>
          <BuildingStorefrontIcon className='h-6 w-6 text-primary-600' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-neutral-900'>All Stores</h1>
          <p className='text-sm text-neutral-600'>
            View and manage all stores on the platform
          </p>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-neutral-200 p-12 text-center'>
        <h3 className='text-lg font-semibold text-neutral-900 mb-2'>
          Stores Management
        </h3>
        <p className='text-neutral-600'>
          Store list and management components will be added here.
        </p>
      </div>
    </div>
  );
};
