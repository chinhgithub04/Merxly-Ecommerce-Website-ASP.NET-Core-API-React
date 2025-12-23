import { Outlet } from 'react-router-dom';
import { HomeHeader, HomeActionBar, HomeFooter } from '../home';

export const CustomerLayout = () => {
  return (
    <div className='min-h-screen bg-neutral-50'>
      <HomeHeader />
      <HomeActionBar />

      <main className='pt-[136px]'>
        <Outlet />
      </main>

      <HomeFooter />
    </div>
  );
};
