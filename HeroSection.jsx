import React, { useContext } from 'react';
import { Box, Button, Grid, IconButton, InputBase, Typography } from '@mui/material';
import { ArrowDownward, ArrowDropDown, SwapVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import circle from '../../Components/images/circle.png';
import newbg from '../../Components/images/newbg.png';
import cardSwap from '../../Components/images/cardSwap.png';
import star1 from '../../Components/images/star1.png';
import star2 from '../../Components/images/star2.png';

import './herosection.css';
import { DataContext } from '../../utils/ContextAPI';

export default function HeroSection() {
    const {
        setCurrentTokenSelection,
        setInputAmount,
        inputAmount,
        outputAmount,
        selectedToken,
        switchTokens,
        toggleList,
        exchangeType,
        toggleExchangeType,
        loggedIn,
    } = useContext(DataContext);
    const navigate = useNavigate();

    return (
        <>
            <Box
                sx={{
                    background: `url(${newbg})`,
                    backgroundSize: { lg: '100% 100%', md: 'cover' },
                    backgroundPosition: 'bottom right',
                    backgroundRepeat: 'no-repeat',
                    py: 4,
                    color: 'white',
                    px: { md: 4, xs: 0 },
                }}
            >
                <div className="wrapper">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <Grid container spacing={{ md: 4, xs: 2 }} pt={12}>
                    <Grid item md={6} xs={12}>
                        <Box
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                            px={2}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: 'Audiowide',
                                    fontWeight: '400',
                                    fontSize: { md: '43px', xs: '28px' },
                                    mb: 1,
                                }}
                            >
                                Your blazing-fast cryptocurrency exchange
                            </Typography>

                            <Typography
                                variant="p"
                                sx={{
                                    fontSize: '15px',
                                    color: 'rgba(255, 255, 255, 1)',
                                    fontWeight: '300',
                                    mb: 3,
                                    textAlign: { md: 'left', xs: 'justify' },
                                }}
                            >
                                Fast and secure way to exchange your crypto with cold storage for
                                popular currencies. BTC, ETH, LTC and more
                            </Typography>
                            <Box mt={2} diplay="flex" gap={4}>
                                <Button
                                    sx={{
                                        background:
                                            'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                                        color: 'white',
                                        px: { sm: 3, xs: 1.5 },
                                        mr: 3,
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        borderRadius: '10px',
                                    }}
                                    onClick={() => {
                                        navigate({
                                            pathname: '/exchange',
                                        });
                                    }}
                                >
                                    Exchange
                                </Button>
                                {loggedIn && (
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            color: 'white',
                                            px: { sm: 3, xs: 1.5 },

                                            textTransform: 'none',
                                            fontSize: '16px',
                                            borderRadius: '10px',
                                        }}
                                        onClick={() => {
                                            navigate({
                                                pathname: '/user',
                                            });
                                        }}
                                    >
                                        My Wallet
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Box
                            width="100%"
                            height="100%"
                            sx={{
                                background: `url(${circle})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'top center',
                                backgroundRepeat: 'no-repeat',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirectio: 'column',
                            }}
                        >
                            <Box
                                sx={{
                                    background: `url(${cardSwap})`,
                                    backgroundSize: '100% 100%',
                                    backgroundRepeat: 'no-repeat',
                                    width: '100%',
                                    maxWidth: '500px',
                                    color: 'white',
                                    pl: 4,
                                    padding: {
                                        md: '4rem 3rem',
                                        sm: '4rem 3rem',
                                        xs: '4rem  1rem',
                                    },
                                    paddingRight: { md: '3.5rem', xs: '2rem' },
                                    mt: 5,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { md: '20px', sm: '18px', xs: '16px' },
                                        fontWeight: '600',
                                        textAlign: 'center',
                                    }}
                                >
                                    Crypto Exchange
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: { md: '13px', sm: '12px', xs: '10px' },

                                        fontWeight: '400',
                                        textAlign: 'center',
                                    }}
                                >
                                    No hidden fees
                                </Typography>

                                <Box padding={{ md: '1.5rem', sm: '1rem', xs: '0.2rem' }}>
                                    <Typography
                                        sx={{
                                            color: 'white',
                                            textAlign: 'left',
                                            mb: 1,
                                            ml: 0.6,
                                            fontSize: { md: '15px', sm: '14px', xs: '13px' },
                                        }}
                                    >
                                        Send
                                    </Typography>
                                    <Box
                                        display="flex"
                                        justifyContent="space-beteen"
                                        border="1px solid rgba(108, 125, 235, 1)"
                                        borderRadius="10px"
                                        padding="0.5rem 0.6rem"
                                        alignItems="center"
                                    >
                                        <InputBase
                                            fullWidth
                                            sx={{
                                                fontWeight: '600',
                                                fontSize: {
                                                    md: '18px',
                                                    sm: '15px',
                                                    xs: '10px',
                                                },
                                            }}
                                            placeholder="Enter Amount"
                                            value={inputAmount ? inputAmount : ''}
                                            onChange={(e) => {
                                                setInputAmount(e.target.value);
                                            }}
                                        />
                                        <Box>
                                            <Button
                                                sx={{
                                                    borderRadius: '25px',
                                                    padding: '6px 10px',
                                                    color: 'white',
                                                }}
                                                onClick={() => {
                                                    setCurrentTokenSelection('token1');
                                                    toggleList();
                                                }}
                                            >
                                                <Box
                                                    width={{ md: '30px', xs: '20px' }}
                                                    height={{ md: '30px', xs: '20px' }}
                                                >
                                                    <img
                                                        src={selectedToken.token1.image}
                                                        alt=""
                                                        width="100%"
                                                    />
                                                </Box>
                                                <Box
                                                    ml={1}
                                                    fontWeight={600}
                                                    fontSize={{
                                                        md: '15px',
                                                        sm: '14px',
                                                        xs: '10px',
                                                    }}
                                                >
                                                    {selectedToken.token1.symbol}
                                                </Box>

                                                <ArrowDropDown />
                                            </Button>
                                        </Box>
                                    </Box>
                                    {/* <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            my: 2,
                                        }}
                                    >
                                        <Typography
                                            fontSize={{ md: '12px', sm: '11px', xs: '10px' }}
                                        >
                                            Avaiable Balance
                                        </Typography>
                                        <Typography
                                            fontSize={{ md: '12px', sm: '11px', xs: '10px' }}
                                        >
                                            1.0003040BTC
                                        </Typography>
                                    </Box> */}
                                    <Box textAlign="center" mt={2}>
                                        <ArrowDownward
                                            sx={{
                                                fontSize: { md: '2rem', xs: '1rem' },
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        mt={2}
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        gap={3}
                                    >
                                        <Button
                                            variant={
                                                exchangeType === 'float' ? 'gradient' : 'outlined'
                                            }
                                            sx={{
                                                color: 'white',
                                                textTransform: 'none',
                                                fontSize: { md: '16px', xs: '10px' },
                                                borderRadius: '10px',
                                            }}
                                            onClick={() => toggleExchangeType()}
                                        >
                                            Floating rate
                                        </Button>
                                        <Box display="flex" alignItems="center">
                                            <Button
                                                variant={
                                                    exchangeType === 'fixed'
                                                        ? 'gradient'
                                                        : 'outlined'
                                                }
                                                onClick={() => toggleExchangeType()}
                                                sx={{
                                                    color: 'white',
                                                    mr: 1,
                                                    textTransform: 'none',
                                                    fontSize: { md: '16px', xs: '10px' },
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                Fixed rate
                                            </Button>
                                            <IconButton onClick={() => switchTokens()}>
                                                <SwapVert sx={{ fontSize: '2rem' }} />
                                            </IconButton>
                                        </Box>
                                    </Box>

                                    <Typography
                                        sx={{
                                            color: 'white',
                                            textAlign: 'left',
                                            mt: 2.5,
                                            mb: 1,
                                            ml: 0.6,
                                            fontSize: { md: '15px', sm: '14px', xs: '13px' },
                                        }}
                                    >
                                        Recieve
                                    </Typography>

                                    <Box
                                        display="flex"
                                        justifyContent="space-beteen"
                                        border="1px solid rgba(108, 125, 235, 1)"
                                        borderRadius="10px"
                                        padding="0.5rem 0.6rem"
                                    >
                                        <InputBase
                                            readOnly
                                            fullWidth
                                            sx={{
                                                fontWeight: '600',
                                                fontSize: {
                                                    md: '18px',
                                                    sm: '15px',
                                                    xs: '12px',
                                                },
                                            }}
                                            value={outputAmount}
                                        />
                                        <Box>
                                            <Button
                                                sx={{
                                                    borderRadius: '25px',
                                                    padding: '6px 10px',
                                                    color: 'white',
                                                }}
                                                onClick={() => {
                                                    setCurrentTokenSelection('token2');

                                                    toggleList();
                                                }}
                                            >
                                                <Box
                                                    width={{ md: '30px', xs: '20px' }}
                                                    height={{ md: '30px', xs: '20px' }}
                                                >
                                                    <img
                                                        src={selectedToken.token2.image}
                                                        alt=""
                                                        width="100%"
                                                    />
                                                </Box>
                                                <Box ml={1} fontWeight={600}>
                                                    {selectedToken.token2.symbol}
                                                </Box>

                                                <ArrowDropDown />
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Box textAlign="center">
                                        <ArrowDownward
                                            sx={{
                                                fontSize: { md: '2rem', xs: '1rem' },
                                                cursor: 'pointer',
                                                margin: '1rem 0rem',
                                            }}
                                        />
                                    </Box>

                                    <Box>
                                        <Button
                                            fullWidth
                                            sx={{
                                                background:
                                                    'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                                                color: 'white',
                                                padding: '0.8rem',
                                                textTransform: 'none',
                                                fontSize: {
                                                    md: '16px',
                                                    sm: '14px',
                                                    xs: '12px',
                                                },
                                                borderRadius: '10px',
                                                fontWeight: '600',
                                            }}
                                            onClick={() =>
                                                navigate({
                                                    pathname: '/exchange',
                                                })
                                            }
                                        >
                                            Exchange Now
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    mr={{ md: 15, sm: 7, xs: 2 }}
                    display="flex"
                    alignItems="end"
                    flexDirection="column"
                >
                    <Box display="flex" alignItems="center">
                        <img src={star1} alt="" width="30px" height="30px" />
                        <Typography
                            sx={{
                                fontSize: '28px',
                                fontWeight: '600',
                                textAlign: 'center',
                            }}
                        >
                            Trustpilot
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} py={1}>
                        <img src={star2} alt="" width="25px" height="25px" />
                        <img src={star2} alt="" width="25px" height="25px" />
                        <img src={star2} alt="" width="25px" height="25px" />
                        <img src={star2} alt="" width="25px" height="25px" />
                        <img src={star2} alt="" width="25px" height="25px" />
                    </Box>
                </Box>
            </Box>
        </>
    );
}
