import React, { useContext, useState } from 'react';
import { Box, Dialog, Stack, useMediaQuery, IconButton, InputBase, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import emailjs from '@emailjs/browser';
// import meta from '../images/wallet/metamask.png';
// import trustwallet from '../images/wallet/trustwallet.png';
// import MetamaskLogin from './MetamaskLogin';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DataContext } from '../../utils/ContextAPI';

export default function Login({ login, toggleLogin, toggleSignUp, toggleForgot }) {
    // const [metamask, setMetamask] = useState(false);
    // const toggleMetamask = () => {
    //     setMetamask((prev) => (prev === true ? false : true));
    // };

    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [inputType, setInputType] = useState('password');
    const { handleLoggedIn } = useContext(DataContext);
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            await axios
                .post(`${import.meta.env.VITE_BASE_URL}users/login`, {
                    email,
                    password,
                })
                .then((res) => {
                    localStorage.setItem('x-auth-token', res.data);
                    toast.success('Login Successful');
                    handleLoggedIn();
                    toggleLogin();
                })
                .catch(() => {
                    toast.error('Login Failed');
                });
        } else {
            toast.error('Fill all Fields');
        }
    };

    const forgot = async () => {
        if (!email) {
            toast.error('Enter Email');
            return;
        }

        await axios
            .post(`${import.meta.env.VITE_BASE_URL}users/forgotsend`, {
                email,
            })
            .then(async (res) => {
                if (res.status === 200) {
                    toast.success('Email Sent');
                    toggleForgot();
                    toggleLogin();
                    let template_params = {
                        user_email: res.data.email,
                        subject: res.data.subject,
                        message: res.data.text,
                    };
                    emailjs.send(
                        import.meta.env.VITE_EMAILJS_SERID,
                        import.meta.env.VITE_EMAILJS_TEMPID,
                        template_params,
                        import.meta.env.VITE_EMAILJS_PUBKEY,
                    );
                }
            })
            .catch((err) => {
                toast.error(err?.response?.data);
            });
    };

    return (
        <>
            {/* <MetamaskLogin metamask={metamask} toggleMetamask={toggleMetamask} /> */}
            <Dialog
                fullScreen={smallScreen}
                fullWidth
                open={login}
                onClose={() => toggleLogin()}
                sx={{
                    '.MuiDialog-paperScrollPaper': {
                        borderRadius: '10px',
                        background: '#080D4A',
                    },
                }}
            >
                <Box px={{ sm: 5, xs: 2 }} pb={5} pt={3}>
                    <Box
                        sx={{
                            my: { xs: 2 },
                            fontSize: '28px ',
                            fontWeight: 700,
                            textAlign: 'center',
                        }}
                    >
                        Login
                    </Box>

                    <Box sx={{ width: { sm: '80%', xs: '100%' }, mx: 'auto' }}>
                        <InputBase
                            placeholder="Enter Email"
                            sx={{
                                px: 2,
                                py: 1,
                                my: 2,
                                width: '100%',
                                fontSize: '18px',
                                border: '1px solid #ffffff',
                                borderRadius: '5px',
                            }}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <Box sx={{ textAlign: 'end', cursor: 'pointer' }} onClick={() => forgot()}>
                            Forgot password?
                        </Box>
                        <Box
                            sx={{
                                px: 2,
                                py: 1,
                                mb: 2,
                                width: '100%',
                                border: '1px solid #ffffff',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <InputBase
                                placeholder="Enter Password"
                                type={inputType}
                                sx={{
                                    width: '100%',
                                    fontSize: '18px',
                                }}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                            <IconButton
                                onClick={() => {
                                    setInputType((prev) =>
                                        prev === 'password' ? 'text' : 'password',
                                    );
                                }}
                            >
                                {inputType === 'text' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </Box>

                        <Button
                            sx={{
                                py: 2,
                                mt: 2,
                                background: 'green',
                                color: '#ffffff',
                                fontWeight: 700,
                                width: '100%',
                            }}
                            onClick={(e) => {
                                handleSubmit(e);
                            }}
                        >
                            Login
                        </Button>
                        <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                            <Box>New to BuyBitcoin?</Box>

                            <Button
                                onClick={() => {
                                    toggleSignUp();
                                    toggleLogin();
                                }}
                            >
                                SignUp
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
