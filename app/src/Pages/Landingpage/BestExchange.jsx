import React from 'react';
import { Avatar, Box, Container, Typography } from '@mui/material';

import bgExcahnge from '../../Components/images/bgExcahnge.png';
import icon1 from '../../Components/images/icon1.png';
import icon2 from '../../Components/images/icon2.png';
import icon3 from '../../Components/images/icon3.png';
import icon4 from '../../Components/images/icon4.png';
// import hline1 from '../../Components/images/hline1.png';

const data = [
    {
        icon: icon1,
        name: 'Secure storage',
        text: 'Your crypto is in your control. Stored offline with time delayed withdrawls, your funds backed up and you hold the keys.',
    },
    {
        icon: icon2,
        name: 'Swift exchange  capabilities',
        text: 'The entire exchange will process within 30 minutes. From sending your crypto to receiving it in your output address. We re so confident in our exchange that we offer a 100% exchange guarantee!',
    },
    {
        icon: icon3,
        name: 'Military grade encryption',
        text: 'Our servers use advanced encryption methods to ensure the integrity of all data stored.',
    },
    {
        icon: icon4,
        name: 'No limits on  exchange',
        text: 'On BuyBitcoin you can convert BTC, ETH and over 100 other cryptocurrencies  without any limits and  restrictions.',
    },
];

const BestExcahnge = () => {
    return (
        <Box
            sx={{
                background: `url(${bgExcahnge})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                py: 5,
                color: 'white',
                mb: 5,
                px: { md: 8, xs: 1 },
            }}
        >
            <Container maxWidth="xl">
                <Typography
                    sx={{
                        fontSize: { md: '43px', xs: '28px' },

                        fontWeight: '400',
                        fontFamily: 'Audiowide',
                        textAlign: 'center',
                    }}
                >
                    Your Best Crypto Exchange
                </Typography>

                <Box mt={5} sx={{ position: 'relative' }}>
                    <Box
                        px={{ md: 5, xs: 2 }}
                        display="flex"
                        gap={4}
                        py={5}
                        width="100%"
                        justifyContent={{ lg: 'center', xs: 'left' }}
                        sx={{
                            overflowX: 'scroll',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                        }}
                    >
                        {data.map(({ name, text, icon }, i) => {
                            return (
                                <Box
                                    key={i}
                                    sx={{
                                        background:
                                            'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',

                                        padding: '1rem',
                                        borderRadius: '10px',
                                        position: 'relative',

                                        minWidth: {
                                            md: '270px !important',
                                            xs: '266px !important',
                                        },

                                        height: 'auto',
                                        width: '100% !important',
                                        maxWidth: '280px !important',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            border: '4px solid white',
                                            borderRadius: '10px',
                                            height: '100%',
                                            textAlign: 'center',
                                            px: 2,
                                            pb: 4,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                mt: 3,
                                                fontSize: '20px',
                                                fontWeight: '700',
                                                color: 'rgba(10, 14, 75, 1)',
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                mt: 1,
                                                fontSize: '15px',
                                                fontWeight: '500',
                                                color: 'rgba(10, 14, 75, 1)',
                                            }}
                                        >
                                            {text}
                                        </Typography>
                                    </Box>
                                    <Box
                                        width="80px"
                                        height="80px"
                                        bgcolor="#0055C2"
                                        sx={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            borderRadius: '50%',
                                            padding: '5px',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: 'white',
                                                borderRadius: '50%',
                                                padding: '5px',
                                                height: '72px',
                                                width: '72px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Box>
                                                <Avatar
                                                    src={icon}
                                                    sx={{ textAlign: 'center' }}
                                                ></Avatar>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box></Box>
                                </Box>
                            );
                        })}
                    </Box>
                    {/* <Box display="flex" justifyContent="center">
                        <Box
                            sx={{
                                position: ' absolute',
                                top: '50%',
                                zIndex: -1,
                            }}
                        >
                            <img src={hline1} alt="hline" width="100%" />
                        </Box>
                    </Box> */}
                </Box>
            </Container>
        </Box>
    );
};

export default BestExcahnge;
