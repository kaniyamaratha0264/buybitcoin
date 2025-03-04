import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    useMediaQuery,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import BookIcon from '@mui/icons-material/Book';

import MenuIcon from '@mui/icons-material/MenuOpen';

import MobDrawer from './MobDrawer';
import Header from './Header';
import { NavLink, useLocation } from 'react-router-dom';

const drawerWidth = 240;
// eslint-disable-next-line
const icons = [<AdminPanelSettingsIcon />, <CreditScoreIcon />, <DoDisturbAltIcon />, <BookIcon />];

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(10)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer - 1,
    [theme.breakpoints.up('xs')]: {
        paddingRight: '0px !important',
    },
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: '100%',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export default function MiniDrawer(props) {
    const [open, setOpen] = React.useState(false);

    const matches = useMediaQuery('(max-width:960px)');
    const location = useLocation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#0055C2 !important' }} open={open}>
                <Toolbar display="flex">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={open === true ? handleDrawerClose : handleDrawerOpen}
                        // edge="start"
                        sx={{
                            marginRight: 2,
                            ...(open && { display: 'block' }),
                        }}
                    >
                        <MenuIcon sx={{ width: '100%' }} />
                    </IconButton>

                    <Header sx={{ width: '100%' }} />
                </Toolbar>
            </AppBar>
            {matches ? (
                <MobDrawer open={open} handleDrawerClose={handleDrawerClose} />
            ) : (
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={{
                        '& .MuiDrawer-paper': {
                            mt: '75px !important',
                            backgroundColor: '#0055C2 !important',
                            border: 'none !important',
                        },
                    }}
                >
                    <List>
                        {[
                            { name: 'Home', to: '/user' },
                            { name: 'Profile', to: '/user/profile' },
                        ].map(({ name, to }, i) => (
                            <ListItem
                                key={i}
                                disablePadding
                                sx={{
                                    my: 1,
                                    display: 'block',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        ml: 'auto',
                                        display: location?.pathname === to ? 'block' : 'none',
                                        height: '0px',
                                        width: '0px',
                                        borderBottom: '10px solid transparent',
                                        borderRight: '10px solid #080C48',
                                    },
                                    '&::before': {
                                        content: '""',
                                        ml: 'auto',
                                        display: location?.pathname === to ? 'block' : 'none',
                                        height: '0px',
                                        width: '0px',
                                        borderTop: '10px solid transparent',
                                        borderRight: '10px solid #080C48',
                                    },
                                }}
                            >
                                <NavLink
                                    to={to}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                            bgcolor:
                                                location?.pathname === to ? '#080C48' : 'inherit ',
                                            borderRadius: '10px 0px 0px 10px',
                                            '&:hover': {
                                                bgcolor: '#080C48',
                                            },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mx: 1.5,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {icons[i]}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={name}
                                            sx={{ opacity: open ? 1 : 0 }}
                                        />
                                    </ListItemButton>
                                </NavLink>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            )}

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {props.children}
            </Box>
        </Box>
    );
}
