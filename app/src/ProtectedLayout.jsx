import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { DataContext } from './utils/ContextAPI';

const ProtectedLayout = () => {
    const { authToken } = useContext(DataContext);
    if (!authToken.isAuthenticated) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default ProtectedLayout;
