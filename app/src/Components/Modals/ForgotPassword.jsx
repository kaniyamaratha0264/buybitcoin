import React, { useState } from 'react';
import { Box, Dialog, useMediaQuery, IconButton, InputBase, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { toast } from 'react-toastify';
import axios from 'axios';

export default function ForgotPassword({ forgot, toggleLogin, toggleForgot }) {
    const [token, settoken] = useState();
    const [password, setpassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [inputType, setInputType] = useState('password');
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // eslint-disable-next-line
            toast.error("Passwords don't match");
        } else if (token) {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}users/forgotverify`, {
                token,
                password,
            });
            if (res) {
                toast.success(res.data);
                toggleForgot();
                toggleLogin();
            } else {
                toast.success('Error Reseting Password');
            }
        } else {
            toast.error('Fill all Fields');
        }
    };

    return (
        <>
            <Dialog
                fullScreen={smallScreen}
                fullWidth
                open={forgot}
                onClose={() => toggleForgot()}
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
                        Password Reset
                    </Box>

                    <Box sx={{ width: { sm: '80%', xs: '100%' }, mx: 'auto' }}>
                        <InputBase
                            placeholder="Enter Token"
                            sx={{
                                px: 2,
                                py: 1,
                                my: 2,
                                width: '100%',
                                fontSize: '18px',
                                border: '1px solid #ffffff',
                                borderRadius: '5px',
                            }}
                            onChange={(e) => settoken(e.target.value)}
                        />
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
                                placeholder="Confirm Password"
                                type={inputType}
                                sx={{
                                    width: '100%',
                                    fontSize: '18px',
                                }}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
