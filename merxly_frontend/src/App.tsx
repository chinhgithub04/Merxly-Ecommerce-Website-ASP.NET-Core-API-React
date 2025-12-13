import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Auth/LoginPage';
import { useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { StoreOwnerLayout } from './components/layout';
import {
  StoreHomePage,
  StoreOrdersPage,
  StoreProductsPage,
  StoreSettingsPage,
} from './pages/Store';
import { UserRole } from './types/enums';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />

        {/* Store Owner Routes */}
        <Route
          path='/store'
          element={
            <ProtectedRoute requiredRoles={[UserRole.StoreOwner]}>
              <StoreOwnerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StoreHomePage />} />
          <Route path='orders' element={<StoreOrdersPage />} />
          <Route path='products' element={<StoreProductsPage />} />
          <Route path='settings' element={<StoreSettingsPage />} />
        </Route>

        {/* Home Route */}
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <div className='p-8 text-center'>
                <h1 className='text-3xl font-bold text-neutral-900 mb-4'>
                  Welcome to Merxly!
                </h1>
                <p className='text-neutral-600 mb-4'>You are logged in.</p>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className='text-primary-600 hover:text-primary-700 font-medium'
                >
                  Logout
                </button>
              </div>
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />

        {/* Redirect unknown routes to home */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
