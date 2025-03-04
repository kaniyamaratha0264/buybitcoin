import React from 'react';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Adb, Apple, Close, Window } from '@mui/icons-material';
import logo from '../../Components/images/wallet/coinbase.png';
import metamask from '../../Components/images/wallet/metamask.png';
import trustwallet from '../../Components/images/wallet/trustwallet.png';
import phantom from '../../Components/images/wallet/phantom.png';
import tronlink from '../../Components/images/wallet/tronlink.png';

const data = [
    {
        wallet: 'Metamask',
        img: metamask,
        color: '#F6851B',
        path: 'https://metamask.io/',
    },
    {
        wallet: 'Trustwallet',
        img: trustwallet,
        color: '#306FB1',
        path: 'https://trustwallet.com/',
    },
    {
        wallet: 'Tronlink',
        img: tronlink,
        color: '#1258C3',
        path: 'https://www.tronlink.org/',
    },
    {
        wallet: 'Coinbase',
        img: logo,
        color: '#004DF2',
        path: 'https://www.coinbase.com/',
    },
    {
        wallet: 'Phantom',
        img: phantom,
        color: '#543EC5',
        path: 'https://phantom.app/',
    },
];

const WalletModal = ({ walletOpenModal, walletHandleClose }) => {
    return (
        <Dialog open={walletOpenModal} onClose={walletHandleClose} fullWidth>
            <Box
                sx={{
                    bgcolor: '#080D4A',
                    padding: { md: '1rem !important' },
                    borderRadius: '15px',
                }}
            >
                <Box textAlign="right">
                    <IconButton onClick={walletHandleClose}>
                        <Close />
                    </IconButton>
                </Box>

                <DialogTitle sx={{ textAlign: 'center', fontSize: '28px', marginBottom: '10px' }}>
                    Creating new wallet
                </DialogTitle>
                <DialogContent>
                    {data.map(({ wallet, img, color, path }, i) => {
                        return (
                            <Box key={i} mt={3}>
                                <Box sx={{ border: `1px solid ${color}`, padding: '15px' }}>
                                    <Box
                                        display="flex"
                                        justifyContent={{ sm: 'space-between', xs: 'center' }}
                                        flexDirection={{ sm: 'row', xs: 'column' }}
                                        alignItems="center"
                                        gap={2}
                                    >
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Box
                                                component={'img'}
                                                src={img}
                                                alt="logo"
                                                width={{ sm: '50px', xs: '30px' }}
                                            />
                                            <Typography
                                                sx={{
                                                    textAlign: 'center',
                                                    fontSize: { sm: '16px', xs: '12px' },
                                                    fontWeight: '400px',
                                                }}
                                            >
                                                {wallet}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    textAlign: 'center',
                                                    fontSize: '12px',
                                                    color: 'green',
                                                    display: i === 0 ? 'block' : 'none',
                                                }}
                                            >
                                                Recommended
                                            </Typography>
                                        </Box>
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={path}
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    padding: '8px 24px',
                                                    border: `1px solid ${color}`,
                                                    color: color,
                                                    fontSize: '16px',
                                                    fontWeight: '400px',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        bgcolor: color,
                                                        color: ' #fff',
                                                    },
                                                }}
                                            >
                                                Create
                                            </Box>
                                        </a>
                                    </Box>

                                    <Box
                                        margin={'0rem 3rem'}
                                        mt={3}
                                        display={{ sm: 'flex', xs: 'none' }}
                                        gap={5}
                                    >
                                        <Box borderLeft="2px solid #F3F3F3" paddingLeft="10px">
                                            <Typography
                                                sx={{
                                                    color: '#A4A3AA',
                                                    fontSize: '14px',
                                                    fontWeight: '300',
                                                    marginBottom: '4px',
                                                }}
                                            >
                                                Anonymity
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    fontWeight: '400',
                                                    marginBottom: '4px',
                                                }}
                                            >
                                                Medium
                                            </Typography>
                                        </Box>
                                        <Box borderLeft="2px solid #F3F3F3" paddingLeft="10px">
                                            <Typography
                                                sx={{
                                                    color: '#A4A3AA',
                                                    fontSize: '14px',
                                                    fontWeight: '300',
                                                    marginBottom: '4px',
                                                }}
                                            >
                                                Security
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    fontWeight: '400',
                                                    marginBottom: '4px',
                                                }}
                                            >
                                                Medium
                                            </Typography>
                                        </Box>
                                        <Box borderLeft="2px solid #F3F3F3" paddingLeft="10px">
                                            <Typography
                                                sx={{
                                                    color: '#A4A3AA',
                                                    fontSize: '14px',
                                                    fontWeight: '300',
                                                    marginBottom: '4px',
                                                }}
                                            >
                                                Platforms
                                            </Typography>
                                            <Box display="flex" gap={1}>
                                                <Adb sx={{ width: '20px', color: '#A4A3AA' }} />
                                                <Apple sx={{ width: '20px', color: '#A4A3AA' }} />
                                                <Window sx={{ width: '20px', color: '#A4A3AA' }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })}
                </DialogContent>
            </Box>
        </Dialog>
    );
};

export default WalletModal;
