import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import icon5 from '../../Components/images/icon5.png';
import icon6 from '../../Components/images/icon6.png';
import icon7 from '../../Components/images/icon7.png';
import icon8 from '../../Components/images/icon8.png';
import icon9 from '../../Components/images/icon9.png';
import icon10 from '../../Components/images/icon10.png';
import icon11 from '../../Components/images/icon11.png';
import icon12 from '../../Components/images/icon12.png';
import icon14 from '../../Components/images/icon14.png';
import icon15 from '../../Components/images/icon15.png';
import assset from '../../Components/images/assset.png';
import mapBg from '../../Components/images/mapBg.png';

const Assets = () => {
    return (
        <Box
            my={12}
            color="white"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirectio: 'column',
            }}
        >
            <Container maxWidth="xl">
                <Box
                    sx={{
                        background: `url(${assset})`,
                        backgroundSize: '100% 100%',

                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <Typography
                        sx={{
                            textAlign: 'center',
                            fontSize: { md: '43px', xs: '28px' },

                            fontWeight: '400',
                            fontFamily: 'Audiowide',
                            mb: 2,
                        }}
                    >
                        Assets Supported
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent="center"
                        flexWrap="wrap"
                        gap={{ xs: 2, md: 3 }}
                        mt={4}
                    >
                        {[
                            icon5,
                            icon6,
                            icon7,
                            icon8,
                            icon9,
                            icon10,
                            icon11,
                            icon12,
                            icon14,
                            icon15,
                        ].map((item, i) => {
                            return (
                                <Box key={i}>
                                    <img src={item} alt="img" width="70px" height="70px" />
                                </Box>
                            );
                        })}
                    </Box>
                    <Box mt={10}>
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontSize: { md: '43px', xs: '25px' },

                                fontWeight: '400',
                                fontFamily: 'Audiowide',
                            }}
                        >
                            Your keys, your crypto.
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontSize: { md: '20px', xs: '15px' },

                                fontWeight: '300',

                                color: 'rgba(255, 255, 255, 1)',
                                mt: 3,
                            }}
                        >
                            Deposit and exchange crypto with anonymity.
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontSize: { md: '20px', xs: '15px' },

                                fontWeight: '300',

                                color: 'rgba(255, 255, 255, 1)',
                                mb: 1,
                            }}
                        >
                            A trustless system that Satoshi would be proud of.
                        </Typography>
                    </Box>
                </Box>
                <Box mt={3}>
                    <img src={mapBg} alt="" width="100%" />
                </Box>
            </Container>
        </Box>
    );
};

export default Assets;
