import React, { useState } from 'react';
import {
    Box,
    Dialog,
    Stack,
    useMediaQuery,
    IconButton,
    InputBase,
    Checkbox,
    Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import emailjs from '@emailjs/browser';

// import trustwallet from '../images/wallet/trustwallet.png';
// import meta from '../images/wallet/metamask.png';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function SignUp({ signUp, toggleSignUp, toggleLogin }) {
    const [user, setuser] = useState({
        email: '',
        password: '',
    });
    const [inputType, setInputType] = useState('password');

    const [check, setCheck] = useState(false);
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const onSubmit = async () => {
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

        if (!validEmail.test(user.email)) {
            toast.error('email is not valid');
        } else if (!validPassword.test(user.password)) {
            toast.error('password is not valid');
        } else if (!check) {
            toast.error('Please Agree to Terms & Conditions');
        } else {
            await axios
                .post(`${import.meta.env.VITE_BASE_URL}users/signup`, user)
                .then(async (res) => {
                    if (res.status === 200) {
                        toast.success('Signed up successfully');
                        setCheck(false);
                        toggleSignUp();
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
        }
    };

    return (
        <>
            <Dialog
                fullScreen={smallScreen}
                fullWidth
                open={signUp}
                onClose={() => toggleSignUp()}
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
                            fontSize: '28px',
                            fontWeight: 700,
                            textAlign: 'center',
                        }}
                    >
                        {/* Enter the Premium Lounge */}
                        Signup
                    </Box>
                    {/* <Stack direction="row" my={1} gap={3} justifyContent="center">
                        <IconButton aria-label="fingerprint" color="secondary">
                            <img src={trustwallet} alt="" width="25px" />
                        </IconButton>
                        <IconButton aria-label="fingerprint" color="secondary">
                            <img src={meta} alt="" width="25px" />
                        </IconButton>
                    </Stack> */}
                    {/* <Box
                        sx={{
                            mt: { xs: 1 },
                            fontSize: '14px ',
                            fontWeight: 400,
                            textAlign: 'center',
                        }}
                    >
                        or use e-mail for sign up
                    </Box> */}
                    <Box sx={{ width: { sm: '80%', xs: '100%' }, mx: 'auto' }}>
                        <InputBase
                            placeholder="Enter Email"
                            onChange={(e) => setuser({ ...user, email: e.target.value })}
                            sx={{
                                px: 2,
                                py: 1,
                                my: 2,
                                width: '100%',
                                fontSize: '18px',
                                border: '1px solid #ffffff',
                                borderRadius: '5px',
                            }}
                        />

                        <Box
                            sx={{
                                px: 2,
                                py: 1,
                                mt: 2,
                                width: '100%',
                                border: '1px solid #ffffff',
                                borderRadius: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <InputBase
                                placeholder="Set Password "
                                onChange={(e) => setuser({ ...user, password: e.target.value })}
                                type={inputType}
                                sx={{
                                    width: '100%',
                                    fontSize: '18px',
                                }}
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

                        <Box
                            sx={{
                                mt: 1,
                                px: 1,
                                fontSize: '12px',
                            }}
                        >
                            Please make sure your password is between 8 and 100 characters
                        </Box>
                        <Stack direction="row" alignItems="center" gap={1} my={2}>
                            <Checkbox
                                color="success"
                                onClick={() => setCheck((val) => (val === true ? false : true))}
                            />
                            <Box
                                sx={{
                                    fontSize: '12px',
                                    color: check ? '#405050' : 'orange',
                                    fontWeight: check ? 600 : 400,
                                }}
                            >
                                I&rsquo;ve read and agree to the BuyBitcoin Terms of Use and Privacy
                                Policy.
                            </Box>
                        </Stack>
                        <Button
                            sx={{
                                py: 2,
                                background: 'green',
                                color: '#ffffff',
                                fontWeight: 700,
                                width: '100%',
                            }}
                            onClick={() => onSubmit()}
                        >
                            Sign Up
                        </Button>
                        <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                            <Box>Already registered?</Box>

                            <Button
                                onClick={() => {
                                    toggleSignUp();
                                    toggleLogin();
                                }}
                            >
                                Login
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
