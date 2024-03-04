import * as React from 'react';
import { Drawer } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import BookIcon from '@mui/icons-material/Book';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line
const icons = [<AdminPanelSettingsIcon />, <CreditScoreIcon />, <DoDisturbAltIcon />, <BookIcon />];

export default function MobDrawer({ open, handleDrawerClose }) {
    return (
        <div>
            <Drawer
                anchor={'left'}
                open={open}
                onClose={() => handleDrawerClose()}
                onOpen={() => handleDrawerClose()}
                sx={{
                    '& .MuiDrawer-paper': {
                        mt: '75px !important',
                        backgroundColor: '#080C48 !important',
                    },
                }}
            >
                <List>
                    {[
                        { name: 'Home', to: '/user' },
                        { name: 'Profile', to: '/user/profile' },
                    ].map(({ name, to }, i) => (
                        <ListItem key={i} onClose={() => handleDrawerClose()}>
                            <NavLink to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemButton>
                                    <ListItemIcon sx={{ ml: -0.8 }}>{icons[i]}</ListItemIcon>
                                    <ListItemText primary={name} sx={{ pl: 0 }} />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
