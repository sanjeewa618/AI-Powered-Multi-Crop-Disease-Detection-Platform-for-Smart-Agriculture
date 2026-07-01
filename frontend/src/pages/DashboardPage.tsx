import React, { useMemo } from 'react';
import AdminDashboardPage from './AdminDashboardPage';
import FarmerDashboardPage from './FarmerDashboardPage';

const DashboardPage: React.FC = () => {
  const role = useMemo<'farmer' | 'admin'>(() => {
    const storedRole = localStorage.getItem('user_role');
    return storedRole === 'admin' ? 'admin' : 'farmer';
  }, []);

  return role === 'admin' ? <AdminDashboardPage /> : <FarmerDashboardPage />;
};

export default DashboardPage;
