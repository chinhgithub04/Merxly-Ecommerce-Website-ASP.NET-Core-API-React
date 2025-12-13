import { Outlet } from 'react-router-dom';
import { StoreHeader } from './StoreHeader';
import { StoreSidebar } from './StoreSidebar';

export const StoreOwnerLayout = () => {
  return (
    <div className='min-h-screen bg-neutral-50'>
      {/* Header */}
      <StoreHeader />

      {/* Sidebar */}
      <StoreSidebar />

      {/* Main Content Area */}
      <main className='pt-16 pl-64'>
        <div className='p-8'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
