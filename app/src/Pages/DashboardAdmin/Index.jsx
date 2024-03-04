import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { DataContext } from '../../utils/ContextAPI';
import MixedDrawer from './Drawer';

export default function Index() {
    const { authToken } = useContext(DataContext);
    if (!authToken.isAuthenticated) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <Box>
                <MixedDrawer>
                    <Outlet />
                </MixedDrawer>
            </Box>
        </>
    );
}
