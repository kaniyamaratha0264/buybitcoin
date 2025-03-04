import React from 'react';
import { Box, Container, Grid, Stack } from '@mui/material';

import aboutbg from '../../Components/images/aboutbg.png';
import vision from '../../Components/images/vision.png';
import mission from '../../Components/images/mission.png';
import missionbg from '../../Components/images/missionbg.png';

export default function About() {
    return (
        <>
            <Box>
                <Box
                    sx={{
                        background: `url(${aboutbg})`,
                        backgroundPosition: 'center top',
                        backgroundSize: { xs: '100% 100%', sm: 'cover' },
                        backgroundRepeat: 'no-repeat',
                        height: '100%',
                        mt: 18,
                        py: 1,
                    }}
                >
                    <Container>
                        <Box
                            mx="auto"
                            mt={{ xs: -8, sm: -6, md: 5 }}
                            width={{ xs: '100%', sm: '70%', md: '50%' }}
                        >
                            <Box
                                sx={{
                                    fontFamily: 'Audiowide',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: { xs: '24px', sm: '32px', md: '48px' },
                                    lineHeight: '61px',
                                    letterSpacing: '0.045em',
                                    color: '#ffffff',
                                    textShadow: '0px -3px  #6068ED',
                                    textAlign: 'center',
                                }}
                            >
                                About Us
                            </Box>
                            <Box
                                sx={{
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: { xs: '10px', sm: '12px', md: '13px' },
                                    lineHeight: { xs: '153%', sm: '153%', md: '153%' },
                                    textAlign: 'center',
                                    letterSpacing: '0.045em',
                                    color: '#FFFFFF',
                                }}
                            >
                                My BuyBitcoin&apos;s core competency is in cryptocurrencies and
                                blockchain technology. Our mission statement in the 21st century is
                                to bring traditional financial products and the world of personal
                                finance together.
                            </Box>
                        </Box>
                        <Box sx={{ mt: { xs: 10, sm: 17, md: 25 } }}>
                            <Grid
                                container
                                spacing={{ xs: 2, sm: 3, md: 5, lg: 8 }}
                                alignItems="end"
                                justifyContent={'center'}
                            >
                                <Grid item xs={12} sm={12} md={6}>
                                    <Box
                                        sx={{
                                            fontFamily: 'Audiowide',
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            fontSize: { xs: '18px', sm: '26px', md: '35px' },
                                            lineHeight: { xs: '25px', sm: '35px', md: '45px' },
                                            letterSpacing: '0.045em',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        Our Vision
                                    </Box>
                                    <Box
                                        sx={{
                                            fontStyle: 'normal',
                                            fontWeight: '600',
                                            fontSize: { xs: '12px', sm: '14px', md: '15px' },
                                            lineHeight: { xs: '14px', sm: '16px', md: '22px' },
                                            letterSpacing: '0.045em',
                                            color: '#FFFFFF',
                                            my: { xs: '5px', sm: 1.5, md: 2 },
                                        }}
                                    >
                                        Written by the team
                                    </Box>
                                    <Box
                                        sx={{
                                            fontStyle: 'normal',
                                            fontWeight: '600',
                                            fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                            lineHeight: '27px',
                                            letterSpacing: '0.045em',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        Dear Crypto family,
                                    </Box>
                                    <Box
                                        sx={{
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            fontSize: { xs: '10px', sm: '14px', md: '16px' },
                                            lineHeight: { xs: '12px', sm: '20px', md: '24px' },
                                            letterSpacing: {
                                                xs: '0.085em',
                                                sm: '0.065em',
                                                md: '0.025em',
                                            },
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        Buybitcoin has grown fast from a couple friends with a
                                        passion in cryptocurrency to 20 team members and countless
                                        satisfied customers. We&apos;re growing faster than we could
                                        have ever imagined and it&apos;s all thanks to the support
                                        and strength of the crypto community.
                                        <br />
                                        <br />
                                        Digital currencies and blockchain technology will change the
                                        future as we know it. The future is digital and were
                                        embracing it.
                                        <br />
                                        <br />
                                        Buybitcoin is a state of the art payment service provider,
                                        we offer crypto exchanges, cold storage for your coins,
                                        mixing of your crypto and many more features to come as we
                                        grow.
                                        <br />
                                        <br />
                                        To stay ahead of the curve, Buybitcoin is an equal
                                        opportunity employer. We believe in working with anyone that
                                        fits our core values. We want ambitious, reliable,
                                        passionate and transparent team members as they are a
                                        reflection of our company. We&apos;re here 7 days a week,
                                        365 days a year for you.
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={6}>
                                    <Box>
                                        <img src={vision} alt="" width="100%" />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
                <Box
                    sx={{
                        my: { xs: 2, sm: 5, md: 7 },
                        fontFamily: 'Audiowide',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: { xs: '24px', sm: '32px', md: '48px' },
                        lineHeight: '61px',
                        letterSpacing: '0.045em',
                        color: '#ffffff',
                        textShadow: '-1.5px -1.5px  #6068ED',
                        textAlign: 'center',
                    }}
                >
                    OUR MISSION
                </Box>
                <Box
                    sx={{
                        background: `url(${missionbg})`,
                        backgroundPosition: 'center top',
                        backgroundSize: { xs: '100% 100%', sm: 'cover' },
                        backgroundRepeat: 'no-repeat',
                        pb: { xs: 5, sm: 7, md: 10 },
                    }}
                >
                    <Box mx="auto" width={{ xs: '80%', sm: '70%', md: '50%' }}>
                        <img src={mission} alt="" width="100%" />
                    </Box>
                    <Stack
                        direction={'row'}
                        justifyContent="space-between"
                        mx="auto"
                        width={{ xs: '90%', sm: '70%', md: '55%' }}
                    >
                        <Box
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: { xs: '8px', sm: '18px', md: '22px' },
                                letterSpacing: { xs: '0.085em', sm: '0.045em' },
                                lineHeight: '33px',
                                color: '#FFFFFF',
                                textAlign: 'left',
                            }}
                        >
                            Transparency
                        </Box>
                        <Box
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: { xs: '8px', sm: '16px', md: '22px' },
                                letterSpacing: { xs: '0.085em', sm: '0.045em' },
                                lineHeight: '33px',
                                color: '#FFFFFF',
                                textAlign: 'center',
                            }}
                        >
                            Experienced team
                        </Box>
                        <Box
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: { xs: '8px', sm: '16px', md: '22px' },
                                letterSpacing: { xs: '0.085em', sm: '0.045em' },
                                lineHeight: '33px',
                                color: '#FFFFFF',
                                textAlign: 'right',
                            }}
                        >
                            Security guarantee
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>
    );
}
