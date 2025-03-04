import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import axios from 'axios';

export default function Home() {
    const [approval, setApproval] = useState([]);

    const getApprovals = async () => {
        let auth = localStorage.getItem('x-auth-token');
        await axios
            .get(`${import.meta.env.VITE_BASE_URL}wallet/userRecord`, {
                headers: {
                    'x-auth-token': auth,
                },
            })
            .then((res) => {
                setApproval(res.data);
            });
    };

    useEffect(() => {
        getApprovals();
    }, []);

    return (
        <>
            <Box sx={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', my: 2 }}>
                User History
            </Box>

            <Box
                sx={{
                    mb: { xs: 5, md: 10 },
                    mt: { xs: 2, md: 5 },
                    borderRadius: '5px',
                    boxShadow: '0px 0px 5px 1px gray',
                    width: '100%',
                    minWidth: '550px',
                }}
            >
                <Stack
                    direction="row"
                    px={5}
                    py={1}
                    gap={1}
                    alignItems="center"
                    justifyContent="space-between"
                    borderBottom="2px solid #50505060"
                >
                    <Box sx={{ fontSize: '20px' }}>Address</Box>
                    <Box sx={{ fontSize: '20px' }}>Sent</Box>
                    <Box sx={{ fontSize: '20px' }}>Received</Box>
                    <Box sx={{ fontSize: '20px' }}>Actions</Box>
                </Stack>
                {approval &&
                    approval?.map(({ txID, amount, send, recipientAddress, currencyType }, i) => (
                        <Stack
                            key={i}
                            direction="row"
                            px={3}
                            py={1}
                            gap={1}
                            alignItems="center"
                            justifyContent="space-between"
                            borderBottom="2px solid #50505060"
                        >
                            <Box sx={{ fontSize: '16px' }}>
                                {recipientAddress.slice(0, 4) + '...' + recipientAddress.slice(-4)}
                            </Box>
                            <Box sx={{ fontSize: '16px' }}>
                                {amount} {currencyType.send}
                            </Box>
                            <Box sx={{ fontSize: '16px' }}>
                                {send} {currencyType.receive}
                            </Box>
                            <Box sx={{ fontSize: '16px' }}>
                                <a
                                    href={`https://www.bitcoinbank.cc/exchange?txid=${txID}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View
                                </a>
                            </Box>
                        </Stack>
                    ))}
            </Box>
        </>
    );
}
