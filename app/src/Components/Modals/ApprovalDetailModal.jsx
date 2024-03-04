import {
    Box,
    Button,
    Dialog,
    IconButton,
    InputBase,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalImage from 'react-modal-image';

export default function ApprovalDetailModal({ open, setOpen, detail, getApprovals }) {
    const [moveModal, setMoveModal] = useState(false);
    const [address, setAddress] = useState(false);
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const Approved = async () => {
        let auth = localStorage.getItem('x-auth-token');
        await axios
            .post(
                `${import.meta.env.VITE_BASE_URL}wallet/approved`,
                { _id: detail._id },
                {
                    headers: {
                        'x-auth-token': auth,
                    },
                },
            )
            .then(() => {
                toast.success('Approved Successfully');
            });
    };
    const reject = async () => {
        let auth = localStorage.getItem('x-auth-token');
        await axios
            .post(
                `${import.meta.env.VITE_BASE_URL}wallet/reject`,
                { _id: detail._id },
                {
                    headers: {
                        'x-auth-token': auth,
                    },
                },
            )
            .then(() => {
                toast.error('Rejected');
            });
    };
    const move = async () => {
        if (!address) return toast.error('Enter Address');
        let auth = localStorage.getItem('x-auth-token');
        await axios
            .post(
                `${import.meta.env.VITE_BASE_URL}wallet/movefunds`,
                {
                    _id: detail._id,
                    address: address,
                },
                {
                    headers: {
                        'x-auth-token': auth,
                    },
                },
            )
            .then(() => {
                toast.error('Moving Funds');
                setOpen(false);
                setMoveModal(false);
                getApprovals();
            })
            .catch(() => {
                toast.error('Error Moving Funds');
            });
    };

    return (
        <>
            <Dialog
                fullScreen={smallScreen}
                fullWidth
                open={moveModal}
                onClose={() => setMoveModal(false)}
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
                        Enter Wallet Address
                    </Box>

                    <Box sx={{ width: '80%', mx: 'auto' }}>
                        <InputBase
                            placeholder="Wallet Address"
                            sx={{
                                px: 2,
                                py: 1,
                                my: 2,
                                width: '100%',
                                fontSize: '18px',
                                border: '1px solid #ffffff',
                                borderRadius: '5px',
                            }}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <Button
                            sx={{
                                py: 2,
                                mt: 2,
                                background: 'green',
                                color: '#ffffff',
                                fontWeight: 700,
                                width: '100%',
                            }}
                            onClick={() => move()}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Dialog>
            <Dialog
                fullScreen={smallScreen}
                maxWidth="md"
                fullWidth
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '.MuiDialog-paperScrollPaper': {
                        borderRadius: '10px',
                        background: '#080D4A',
                    },
                }}
            >
                <Box px={{ sm: 5, xs: 2 }} pb={5} pt={3}>
                    <Stack
                        direction={'row'}
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box
                            sx={{
                                my: { xs: 2 },
                                fontSize: '28px ',
                                fontWeight: 700,
                                textAlign: 'center',
                            }}
                        >
                            Transaction Detail
                        </Box>
                        <IconButton onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                            sx={{
                                my: { xs: 1 },
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: { xs: '12px', sm: '13px', md: '15px' },
                            }}
                        >
                            txID :
                        </Typography>
                        <Typography
                            sx={{
                                my: { xs: 1, sm: 2 },
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                            }}
                        >
                            {detail?.txID}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                            sx={{
                                my: { xs: 1 },
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: { xs: '12px', sm: '13px', md: '15px' },
                            }}
                        >
                            Name :
                        </Typography>
                        <Typography
                            sx={{
                                my: { xs: 1, sm: 2 },
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                            }}
                        >
                            {detail?.name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                            sx={{
                                my: { xs: 1 },
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: { xs: '12px', sm: '13px', md: '15px' },
                            }}
                        >
                            Email :
                        </Typography>
                        <Typography
                            sx={{
                                my: { xs: 1, sm: 2 },
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                            }}
                        >
                            {detail?.email}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                            sx={{
                                my: { xs: 1 },
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: { xs: '12px', sm: '13px', md: '15px' },
                            }}
                        >
                            Wallet Address :
                        </Typography>
                        <Typography
                            sx={{
                                my: { xs: 1, sm: 2 },
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                            }}
                        >
                            {detail?.recipientAddress?.slice(0, 4) +
                                '...' +
                                detail?.recipientAddress?.slice(-4)}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                            sx={{
                                my: { xs: 1 },
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: { xs: '12px', sm: '13px', md: '15px' },
                            }}
                        >
                            Sent :
                        </Typography>
                        <Typography
                            sx={{
                                my: { xs: 1, sm: 2 },
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                            }}
                        >
                            {detail?.amount} {detail?.currencyType?.send}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                            sx={{
                                my: { xs: 1 },
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: { xs: '12px', sm: '13px', md: '15px' },
                            }}
                        >
                            Received :
                        </Typography>
                        <Typography
                            sx={{
                                my: { xs: 1, sm: 2 },
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: { xs: '10px', sm: '12px', md: '14px' },
                            }}
                        >
                            {detail?.send} {detail?.currencyType?.receive}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={5} alignItems="center">
                        <Button
                            sx={{ fontSize: '16px' }}
                            onClick={() => Approved()}
                            color="success"
                        >
                            Approve
                        </Button>
                        <Button
                            sx={{ fontSize: '16px' }}
                            onClick={() => {
                                setMoveModal(true);
                            }}
                            color="secondary"
                        >
                            Move
                        </Button>
                        <Button sx={{ fontSize: '16px' }} onClick={() => reject()} color="error">
                            Reject
                        </Button>
                    </Stack>
                    <Box width={{ xs: '100%', sm: '95%', md: '90%' }} mx="auto">
                        <Box
                            sx={{
                                my: { xs: 2 },
                                fontSize: '28px ',
                                fontWeight: 700,
                                textAlign: 'center',
                            }}
                        >
                            Proof of Identity
                        </Box>
                        <ModalImage
                            small={detail?.img1}
                            medium={detail?.img1}
                            large={detail?.img1}
                            showRotate={true}
                            alt=""
                        />
                    </Box>
                    <Box width={{ xs: '100%', sm: '95%', md: '90%' }} mx="auto">
                        <Box
                            sx={{
                                my: { xs: 2 },
                                fontSize: '28px ',
                                fontWeight: 700,
                                textAlign: 'center',
                            }}
                        >
                            Proof of Residence
                        </Box>
                        <ModalImage
                            small={detail?.img2}
                            medium={detail?.img2}
                            large={detail?.img2}
                            showRotate={true}
                            alt=""
                        />
                    </Box>
                    <Box width={{ xs: '100%', sm: '95%', md: '90%' }} mx="auto">
                        <Box
                            sx={{
                                my: { xs: 2 },
                                fontSize: '28px ',
                                fontWeight: 700,
                                textAlign: 'center',
                            }}
                        >
                            Proof of Fund&apos;s Source
                        </Box>
                        <ModalImage
                            small={detail?.img3}
                            medium={detail?.img3}
                            large={detail?.img3}
                            showRotate={true}
                            alt=""
                        />
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
