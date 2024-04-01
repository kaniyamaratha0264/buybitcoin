import React, { useContext } from 'react';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';

import footerbg from './images/footerbg.png';
import footer1 from './images/footer1.svg';
// import blogo from './images/blogo.svg';
import footer2 from './images/footer2.svg';
import footer3 from './images/footer3.svg';
import footer4 from './images/footer4.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../utils/ContextAPI';

const Footer = () => {
    const { setSelectedToken, logo } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();
    // const { logo } = useContext(DataContext);

    return (
        <Box
            sx={{
                background: `url(${footerbg}),#049AE7`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                height: 'auto',
                py: 4,
                color: 'white',
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item md={3} sm={6} xs={12}>
                        <Box textAlign="center">
                            <img src={logo} alt="logo" width="160px" />
                            <Box
                                display="flex"
                                justifyContent="center"
                                gap={1}
                                mt={{ xs: 0, sm: -2 }}
                            >
                                <Avatar src={footer1} alt="icon1" />
                                <Avatar src={footer2} alt="icon1" />
                                <Avatar src={footer3} alt="icon1" />
                                <Avatar src={footer4} alt="icon1" />
                            </Box>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        md={3}
                        sm={6}
                        xs={12}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Box mt={2} textAlign="center">
                            <Typography
                                sx={{
                                    fontSize: '20px',

                                    fontWeight: '700',
                                }}
                            >
                                Popular Tokens
                            </Typography>

                            <Box mt={2}>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSelectedToken({
                                            token1: {
                                                name: 'Bitcoin',
                                                symbol: 'BTC',
                                                image: 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg',
                                                decimals: 8,
                                                convertId: 1,
                                            },
                                            token2: {
                                                name: 'ETH',
                                                symbol: 'ETH',
                                                image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg',
                                                decimals: 6,
                                                convertId: 1027,
                                            },
                                        });
                                        navigate('/exchange');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    BTC to ETH
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSelectedToken({
                                            token2: {
                                                name: 'ETH',
                                                symbol: 'ETH',
                                                image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg',
                                                decimals: 6,
                                                convertId: 1027,
                                            },
                                            token1: {
                                                name: 'BNB',
                                                symbol: 'BNB',
                                                image: 'https://content-api.changenow.io/uploads/bnbbsc_331e969a6b.svg',
                                                decimals: 18,
                                                convertId: 1839,
                                            },
                                        });
                                        navigate('/exchange');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    BNB to ETH
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSelectedToken({
                                            token2: {
                                                name: 'Litecoin',
                                                symbol: 'LTC',
                                                image: 'https://content-api.changenow.io/uploads/ltc_a399d6378f.svg',
                                                decimals: 8,
                                                convertId: 2,
                                            },
                                            token1: {
                                                name: 'Bitcoin',
                                                symbol: 'BTC',
                                                image: 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg',
                                                decimals: 8,
                                                convertId: 1,
                                            },
                                        });
                                        navigate('/exchange');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    BTC to LTC
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSelectedToken({
                                            token2: {
                                                name: 'Bitcoin',
                                                symbol: 'BTC',
                                                image: 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg',
                                                decimals: 8,
                                                convertId: 1,
                                            },
                                            token1: {
                                                name: 'Tether',
                                                symbol: 'USDT',
                                                image: 'https://content-api.changenow.io/uploads/usdterc20_01c09cad36.svg',
                                                decimals: 6,
                                                convertId: 825,
                                            },
                                        });
                                        navigate('/exchange');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    USDT to BTC
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSelectedToken({
                                            token2: {
                                                name: 'Bitcoin',
                                                symbol: 'BTC',
                                                image: 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg',
                                                decimals: 8,
                                                convertId: 1,
                                            },
                                            token1: {
                                                name: 'USDC coin',
                                                symbol: 'USDC',
                                                image: 'https://content-api.changenow.io/uploads/usdcerc20_acd5759c8c.svg',
                                                decimals: 6,
                                                convertId: 3408,
                                            },
                                        });
                                        navigate('/exchange');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    USDC to BTC
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={3}
                        sm={6}
                        xs={12}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Box mt={{ xs: -2, sm: 2 }} textAlign="center">
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                }}
                                display={{ xs: 'none', sm: 'block' }}
                            >
                                Popular Tokens
                            </Typography>

                            <Box mt={{ xs: 0, sm: 2 }}>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSelectedToken({
                                            token2: {
                                                name: 'Bitcoin',
                                                symbol: 'BTC',
                                                image: 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg',
                                                decimals: 8,
                                                convertId: 1,
                                            },
                                            token1: {
                                                name: 'ETH',
                                                symbol: 'ETH',
                                                image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg',
                                                decimals: 6,
                                                convertId: 1027,
                                            },
                                        });
                                        navigate('/exchange');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    ETH to BTC
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSelectedToken({
                                            token1: {
                                                name: 'ETH',
                                                symbol: 'ETH',
                                                image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg',
                                                decimals: 6,
                                                convertId: 1027,
                                            },
                                            token2: {
                                                name: 'BNB',
                                                symbol: 'BNB',
                                                image: 'https://content-api.changenow.io/uploads/bnbbsc_331e969a6b.svg',
                                                decimals: 18,
                                                convertId: 1839,
                                            },
                                        });
                                        navigate('/exchange');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    ETH to BNB
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSelectedToken({
                                            token1: {
                                                name: 'Litecoin',
                                                symbol: 'LTC',
                                                image: 'https://content-api.changenow.io/uploads/ltc_a399d6378f.svg',
                                                decimals: 8,
                                                convertId: 2,
                                            },
                                            token2: {
                                                name: 'Bitcoin',
                                                symbol: 'BTC',
                                                image: 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg',
                                                decimals: 8,
                                                convertId: 1,
                                            },
                                        });
                                        navigate('/exchange');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    LTC to BTC
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSelectedToken({
                                            token1: {
                                                name: 'Bitcoin',
                                                symbol: 'BTC',
                                                image: 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg',
                                                decimals: 8,
                                                convertId: 1,
                                            },
                                            token2: {
                                                name: 'Tether',
                                                symbol: 'USDT',
                                                image: 'https://content-api.changenow.io/uploads/usdterc20_01c09cad36.svg',
                                                decimals: 6,
                                                convertId: 825,
                                            },
                                        });
                                        navigate('/exchange');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    BTC to USDT
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSelectedToken({
                                            token1: {
                                                name: 'Bitcoin',
                                                symbol: 'BTC',
                                                image: 'https://content-api.changenow.io/uploads/btc_d8db07f87d.svg',
                                                decimals: 8,
                                                convertId: 1,
                                            },
                                            token2: {
                                                name: 'USDC coin',
                                                symbol: 'USDC',
                                                image: 'https://content-api.changenow.io/uploads/usdcerc20_acd5759c8c.svg',
                                                decimals: 6,
                                                convertId: 3408,
                                            },
                                        });
                                        navigate('/exchange');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    BTC to USDC
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        md={3}
                        sm={6}
                        xs={12}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Box mt={2} textAlign="center">
                            <Typography
                                sx={{
                                    fontSize: '20px',

                                    fontWeight: '700',
                                }}
                            >
                                Support
                            </Typography>
                            <Box mt={2}>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        navigate('/about');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    About Us
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        navigate('/blogs');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    Blogs
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        navigate('/faq');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    FAQ
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        navigate('/privacy-policy');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    Privacy Policy
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '13px',
                                        fontWeight: '400',
                                        mb: 0.8,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        navigate('/term-of-use');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                >
                                    Terms of Service
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
