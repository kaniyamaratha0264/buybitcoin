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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EmailIcon from '@mui/icons-material/Email';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Add this line

const icons = [
    // eslint-disable-next-line
    <AdminPanelSettingsIcon />,
    // eslint-disable-next-line
    <CreditScoreIcon />,
    // eslint-disable-next-line
    <DoDisturbAltIcon />,
    // eslint-disable-next-line
    <BookIcon />,
    // eslint-disable-next-line
    <BorderColorIcon />,
    // eslint-disable-next-line
    <SwitchAccountIcon />,
    // eslint-disable-next-line
    <EmailIcon />,
    // eslint-disable-next-line
    <AccountBalanceWalletIcon />,
    <CloudUploadIcon />,
];

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
                        { name: 'Home', to: '/admin' },
                        { name: 'Approval', to: '/admin/approve' },
                        { name: 'Reject', to: '/admin/reject' },
                        { name: 'Edit Blogs', to: '/admin/blogShow' },
                        { name: 'Create Blogs', to: '/admin/blogCreate' },
                        { name: 'Accounts Management', to: '/admin/accounts' },
                        { name: 'Signup Mail', to: '/admin/signupmail' },
                        { name: 'Wallets', to: '/admin/wallets' },
                        { name: 'Logo Update', to: '/admin/logoUpdate' },
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
