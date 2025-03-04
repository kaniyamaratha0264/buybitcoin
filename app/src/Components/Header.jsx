import React, { useContext, useState } from 'react';
import {
    Container,
    Button,
    Box,
    IconButton,
    Stack,
    Drawer,
    Hidden,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Login from './Modals/Login';
import SignUp from './Modals/SignUp';
import { NavLink } from 'react-router-dom';
import { DataContext } from '../utils/ContextAPI';
import ForgotPassword from './Modals/ForgotPassword';
import './header.css';

const Header = () => {
    const hostname = window.location.hostname;
    const { loggedIn, handleLoggedOut, isAdmin, logo } = useContext(DataContext);
    const [state, setState] = useState(false);
    const [login, setLogin] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [signUp, setSignUp] = useState(false);

    const toggleDrawer = () => {
        setState((prev) => (prev === true ? false : true));
    };
    const toggleLogin = () => {
        setLogin((prev) => (prev === true ? false : true));
    };
    const toggleForgot = () => {
        setForgot((prev) => (prev === true ? false : true));
    };
    const toggleSignUp = () => {
        setSignUp((prev) => (prev === true ? false : true));
    };

    const data = [
        {
            title: 'About',
            path: '/about',
        },
        {
            title: 'FAQ',
            path: '/faq',
        },
        {
            title: 'Privacy Policy',
            path: '/privacy-policy',
        },
        {
            title: 'Term Of Use',
            path: '/term-of-use',
        },
    ];
    return (
        <>
            <Box sx={{ position: 'absolute', width: '100%', top: "0px" }} px={{ md: 4, xs: 1 }}>
            {hostname === "americabitcoinbank.com" && (
             <Box className="testserver" sx={{padding:"10px", marginBottom:'10px', }}>
             <Typography>This is a test server, please do not send your coins to this service as it is no monitored. Thank you</Typography>
         </Box>
        )}
                <Login
                    login={login}
                    toggleLogin={toggleLogin}
                    toggleSignUp={toggleSignUp}
                    toggleForgot={toggleForgot}
                />
                <ForgotPassword
                    forgot={forgot}
                    toggleLogin={toggleLogin}
                    toggleForgot={toggleForgot}
                />
                <SignUp signUp={signUp} toggleSignUp={toggleSignUp} toggleLogin={toggleLogin} />
                <Container maxWidth="xl">
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                    >
                        <Box>
                            <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
                                <img
                                    id="headerLogoId"
                                    src={logo}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        maxWidth: '130px',
                                    }}
                                />
                            </NavLink>
                        </Box>
                        <Hidden mdDown>
                            <Stack direction={'row'} gap={4} alignItems="center">
                                <Box display="flex" justifyContent="center" gap={4}>
                                    {data.map((item, i) => {
                                        return (
                                            <NavLink
                                                to={item?.path}
                                                style={{ textDecoration: 'none', color: 'white' }}
                                                key={i}
                                            >
                                                <Typography>{item?.title}</Typography>
                                            </NavLink>
                                        );
                                    })}
                                    {isAdmin && loggedIn ? (
                                        <NavLink
                                            to="/admin"
                                            style={{ textDecoration: 'none', color: 'white' }}
                                        >
                                            <Typography>Admin</Typography>
                                        </NavLink>
                                    ) : (
                                        <></>
                                    )}
                                </Box>
                                {!loggedIn ? (
                                    <>
                                        <Button
                                            sx={{
                                                background:
                                                    'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                                                boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.3)',
                                                borderRadius: '10px',
                                                width: '100px',
                                                fontStyle: 'normal',
                                                fontWeight: '600',
                                                fontSize: '14px',
                                                lineHeight: '21px',
                                                letterSpacing: '0.045em',
                                                color: '#FFFFFF',
                                                padding: '8px 15px',
                                            }}
                                            onClick={() => {
                                                toggleLogin();
                                            }}
                                        >
                                            Log IN
                                        </Button>
                                        <Box
                                            sx={{
                                                borderRadius: '10px',
                                                backgroundImage:
                                                    ' linear-gradient(#080C48, #080C48  ),linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                                                backgroundOrigin: 'border-box',
                                                backgroundClip: 'content-box, border-box',
                                                padding: '1.5px',
                                            }}
                                        >
                                            <Button
                                                sx={{
                                                    color: '#FFFFFF',
                                                    background: 'transparent',
                                                    fontStyle: 'normal',
                                                    borderRadius: '10px',
                                                    width: '100px',
                                                    fontWeight: '600',
                                                    fontSize: '13px',
                                                    lineHeight: '20px',
                                                    letterSpacing: '0.045em',
                                                    padding: '8px 15px',
                                                }}
                                                onClick={() => {
                                                    toggleSignUp();
                                                }}
                                            >
                                                SIGN UP
                                            </Button>
                                        </Box>
                                    </>
                                ) : (
                                    <Button
                                        sx={{
                                            background:
                                                'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                                            boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.3)',
                                            borderRadius: '10px',
                                            width: '100px',
                                            fontStyle: 'normal',
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            lineHeight: '21px',
                                            letterSpacing: '0.045em',
                                            color: '#FFFFFF',
                                            padding: '8px 15px',
                                        }}
                                        onClick={() => handleLoggedOut()}
                                    >
                                        Logout
                                    </Button>
                                )}
                            </Stack>
                        </Hidden>
                        <Hidden mdUp>
                            <Stack gap={2}>
                                <IconButton onClick={() => toggleDrawer()}>
                                    <MenuIcon
                                        style={{
                                            fontSize: '28px',
                                        }}
                                    />
                                </IconButton>
                            </Stack>
                            <Drawer anchor="right" open={state} onClose={() => toggleDrawer()}>
                                <Box
                                    sx={{
                                        width: 250,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 3,
                                        px: 2,
                                        bgcolor: '#080C48',
                                        pt: 4,
                                    }}
                                >
                                    <Box width={{ xs: '90px', sm: '150px' }}>
                                        <NavLink
                                            to="/"
                                            style={{ textDecoration: 'none', color: 'white' }}
                                        >
                                            <img src={logo} alt="" width="100%" />
                                        </NavLink>
                                    </Box>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        gap={4}
                                    >
                                        {data.map((item, i) => {
                                            return (
                                                <NavLink
                                                    to={item?.path}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'white',
                                                    }}
                                                    key={i}
                                                >
                                                    <Typography sx={{ fontWeight: '500' }}>
                                                        {item?.title}
                                                    </Typography>
                                                </NavLink>
                                            );
                                        })}
                                        {isAdmin && loggedIn ? (
                                            <NavLink
                                                to="/admin"
                                                style={{ textDecoration: 'none', color: 'white' }}
                                            >
                                                <Typography>Admin</Typography>
                                            </NavLink>
                                        ) : (
                                            <></>
                                        )}
                                    </Box>
                                    {!loggedIn ? (
                                        <>
                                            <Button
                                                sx={{
                                                    background:
                                                        'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                                                    boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.3)',
                                                    borderRadius: '10px',
                                                    width: '100px',
                                                    fontStyle: 'normal',
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                    lineHeight: '21px',
                                                    letterSpacing: '0.045em',
                                                    color: '#FFFFFF',
                                                    padding: '8px 15px',
                                                }}
                                                onClick={() => {
                                                    toggleLogin();
                                                }}
                                            >
                                                Log IN
                                            </Button>
                                            <Box
                                                sx={{
                                                    borderRadius: '10px',
                                                    backgroundImage:
                                                        ' linear-gradient(#080C48, #080C48  ),linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                                                    backgroundOrigin: 'border-box',
                                                    backgroundClip: 'content-box, border-box',
                                                    padding: '1.5px',
                                                }}
                                            >
                                                <Button
                                                    sx={{
                                                        color: '#FFFFFF',
                                                        background: 'transparent',
                                                        fontStyle: 'normal',
                                                        borderRadius: '10px',
                                                        width: '100px',
                                                        fontWeight: '600',
                                                        fontSize: '13px',
                                                        lineHeight: '20px',
                                                        letterSpacing: '0.045em',
                                                        padding: '8px 15px',
                                                    }}
                                                    onClick={() => {
                                                        toggleSignUp();
                                                    }}
                                                >
                                                    SIGN UP 
                                                </Button>
                                            </Box>
                                        </>
                                    ) : (
                                        <Button
                                            sx={{
                                                background:
                                                    'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                                                boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.3)',
                                                borderRadius: '10px',
                                                width: '100px',
                                                fontStyle: 'normal',
                                                fontWeight: '600',
                                                fontSize: '14px',
                                                lineHeight: '21px',
                                                letterSpacing: '0.045em',
                                                color: '#FFFFFF',
                                                padding: '8px 15px',
                                            }}
                                            onClick={() => handleLoggedOut()}
                                        >
                                            Logout
                                        </Button>
                                    )}
                                </Box>
                            </Drawer>
                        </Hidden>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Header;
