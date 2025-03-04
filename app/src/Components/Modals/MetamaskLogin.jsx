import React, { useEffect, useState } from 'react';
import { Box, Dialog, useMediaQuery, IconButton, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import axios from 'axios';
import { toast } from 'react-toastify';

import meta from '../images/wallet/metamask.png';
import { useAccount, useConnect } from 'wagmi';

export default function MetamaskLogin({ metamask, toggleMetamask }) {
    const [signup, setSignup] = useState(false);
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const { connect, connectors } = useConnect();

    const { address, isConnected } = useAccount();

    const handleClose = () => {
        toggleMetamask();
    };

    const init = async () => {
        const provider = await detectEthereumProvider();
        if (provider) {
            const signer = new ethers.providers.Web3Provider(provider).getSigner();

            const msgParams = [
                {
                    type: 'string',
                    name: 'Message',
                    value: 'Please Sign this to verify your identity',
                },
                {
                    type: 'uint32',
                    name: 'Secret Key',
                    value: '1337',
                },
            ];

            const types = {
                Message: msgParams.map((param) => ({ name: param.name, type: param.type })),
            };
            const domain = {};
            const message = msgParams.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});

            const signature = await signer._signTypedData(domain, types, message, {
                from: address,
            });

            const { data: signup } = await axios.post(
                `${import.meta.env.VITE_BASE_URL}index/metamaskLogin`,
                {
                    msgParams: msgParams,
                    signature: signature,
                    address: address,
                },
            );

            if (signup === 'success') toast.success('Successfully Signed up');
            else toast.error('Invalid Signer');
            toggleMetamask();
        }
    };

    useEffect(() => {
        if (isConnected && signup) {
            init();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, signup]);

    return (
        <>
            <Dialog
                fullScreen={smallScreen}
                fullWidth
                open={metamask}
                onClose={() => toggleMetamask()}
                sx={{
                    '.MuiDialog-paperScrollPaper': {
                        borderRadius: '10px',
                        background: '#080D4A',
                    },
                }}
            >
                <Box px={{ sm: 5, xs: 2 }} pb={5} pt={3}>
                    <Box>
                        <CloseIcon
                            onClick={handleClose}
                            style={{
                                color: theme.palette.secondary.contrastText,
                                textAlign: 'right',
                                fontSize: '23px',
                                cursor: 'pointer',
                                paddingTop: '7px',
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            my: { xs: 2 },
                            fontSize: '28px ',
                            fontWeight: 700,
                            textAlign: 'center',
                        }}
                    >
                        Sign Up with Metamask
                    </Box>
                    <Box display={'flex'} justifyContent="center">
                        <IconButton aria-label="fingerprint" color="secondary">
                            <img src={meta} alt="" width="70px" />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            mt: { xs: 1 },
                            fontSize: '14px',
                            fontWeight: 400,
                            textAlign: 'center',
                        }}
                    >
                        You can unlock your MetaMask wallet and Sign Up
                    </Box>
                    <Box sx={{ width: '80%', mx: 'auto' }}>
                        {connectors?.map((connector, index) => (
                            <Button
                                key={index}
                                sx={{
                                    py: 2,
                                    mt: 4,
                                    background: 'green',
                                    color: '#ffffff',
                                    fontWeight: 700,
                                    width: '100%',
                                }}
                                onClick={() => {
                                    setSignup(true);
                                    if (!isConnected) connect({ connector });
                                }}
                            >
                                Sign Up
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
