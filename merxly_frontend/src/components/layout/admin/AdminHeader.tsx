import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';

export const AdminHeader = () => {
  return (
    <header className='fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200 z-30'>
      <div className='flex items-center justify-between h-full px-6'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-bold text-primary-600'>Merxly</h1>
          <span className='px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded'>
            ADMIN
          </span>
        </div>

        {/* Search Bar */}
        <div className='flex-1 max-w-2xl mx-8'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <MagnifyingGlassIcon className='h-5 w-5 text-neutral-400' />
            </div>
            <input
              type='text'
              placeholder='Search stores, users, products...'
              className='w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors'
            />
          </div>
        </div>

        {/* Notification Icon */}
        <div className='flex items-center'>
          <button className='relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer'>
            <BellIcon className='h-6 w-6' />
            {/* Notification Badge */}
            <span className='absolute top-1 right-1 h-2 w-2 bg-error-500 rounded-full'></span>
          </button>
        </div>
      </div>
    </header>
  );
};
