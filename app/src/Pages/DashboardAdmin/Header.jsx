import React from 'react';
import { Box, Stack, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Header() {
    return (
        <>
            <Box
                sx={{ zIndex: '100000 !important' }}
                width="100%"
                borderLeft="1px solid rgba(127,143,169,1)"
            >
                <Stack direction="row" justifyContent="end" alignItems="center" py={2.3}>
                    <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
                        <IconButton>
                            <ExitToAppIcon sx={{ color: '#fff' }} />
                        </IconButton>
                    </NavLink>
                </Stack>
            </Box>
        </>
    );
}
