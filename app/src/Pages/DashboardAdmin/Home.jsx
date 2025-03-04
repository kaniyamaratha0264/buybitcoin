import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, InputBase, Stack } from '@mui/material';
import axios from 'axios';
import { DataContext } from '../../utils/ContextAPI';

export default function Home() {
    const { adminFee, setAdminFee, setFee } = useContext(DataContext);
    const [approval, setApproval] = useState([]);

    const getApprovals = async () => {
        await axios.get(`${import.meta.env.VITE_BASE_URL}wallet/exchangeRecord`).then((res) => {
            setApproval(res.data);
        });
    };

    useEffect(() => {
        getApprovals();
    }, []);

    return (
        <>
            <Box sx={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', my: 2 }}>
                Exchange Records
            </Box>
            <Box
                sx={{
                    width: '100%',
                    my: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'center',
                        fontSize: '16px',
                    }}
                >
                    Admin Fee %
                    <InputBase
                        onChange={(e) => {
                            setAdminFee(e.target.value);
                        }}
                        value={adminFee}
                        sx={{
                            fontSize: '16px',
                            borderRadius: '5px',
                            border: '2px solid #50505060',
                            p: 1,
                        }}
                    />
                    <Button
                        sx={{
                            fontSize: '18px',
                        }}
                        color="warning"
                        onClick={() => setFee()}
                    >
                        Update
                    </Button>
                </Box>
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
                </Stack>
                {approval &&
                    approval?.map(({ amount, send, recipientAddress, currencyType }, i) => (
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
                        </Stack>
                    ))}
            </Box>
        </>
    );
}
