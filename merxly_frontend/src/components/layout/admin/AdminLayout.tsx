import { Outlet } from 'react-router-dom';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

export const AdminLayout = () => {
  return (
    <div className='min-h-screen bg-neutral-50'>
      {/* Header */}
      <AdminHeader />

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className='pt-16 pl-64'>
        <div className='p-8'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
