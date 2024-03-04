import React, { useContext, useState } from 'react';
import { Box, Button, Checkbox, Stack } from '@mui/material';

import stepcard from '../../Components/images/stepcard.png';
import check from '../../Components/images/check.svg';
import { DataContext } from '../../utils/ContextAPI';

export default function Confirm() {
    const { conversion, data, handleNext, handleBack } = useContext(DataContext);
    const [checked, setChecked] = useState(false);

    return (
        <>
            <Box
                sx={{
                    background: `url(${stepcard})`,
                    backgroundPosition: 'center center',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    mx: 'auto',
                    width: { xs: '100%', sm: '70%', md: '50%' },
                    px: { xs: 3, sm: 5, md: 7 },
                    py: { xs: 3, sm: 5, md: 5 },
                    my: { xs: 5, sm: 7, md: 10 },
                }}
            >
                <Box
                    sx={{
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: { xs: '12px', sm: '17px', md: '20px' },
                        lineHeight: { xs: '20px', sm: '30px' },
                        letterSpacing: '0.01em',
                        color: '#FFFFFF',
                    }}
                >
                    Please confirm the details of your exchange
                </Box>
                <Stack
                    direction="row"
                    alignItems={'center'}
                    gap={{ xs: 2, sm: 4 }}
                    my={{ xs: 2, sm: 3, md: 5 }}
                >
                    <Box
                        sx={{
                            borderRadius: '14px',
                            backgroundImage:
                                ' linear-gradient(#080C48, #080C48  ),linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'content-box, border-box',
                            padding: '1.5px',
                            height: 'max-content',
                        }}
                    >
                        <Button
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: '10px',
                                lineHeight: '15px',
                                letterSpacing: '0.045em',
                                color: '#FFFFFF',
                                padding: { xs: '7px 10px', sm: '10px 20px' },
                            }}
                        >
                            You Send
                        </Button>
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '600',
                                fontSize: { xs: '12px', sm: '16px', md: '20px' },
                                lineHeight: '30px',
                                letterSpacing: '0.045em',
                                color: '#FFFFFF',
                            }}
                        >
                            {data?.amount} {data?.currencyType?.send}
                        </Box>
                        <Box
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: { xs: '12px', sm: '15px' },
                                lineHeight: '22px',
                                letterSpacing: '0.045em',
                                color: '#FFFFFF',
                            }}
                        >
                            1 {data?.currencyType?.send} ≈ {conversion}{' '}
                            {data?.currencyType?.receive}
                        </Box>
                    </Box>
                </Stack>
                <Stack
                    direction="row"
                    alignItems={'center'}
                    gap={{ xs: 2, sm: 4 }}
                    my={{ xs: 2, sm: 3, md: 5 }}
                >
                    <Box
                        sx={{
                            borderRadius: '14px',
                            backgroundImage:
                                ' linear-gradient(#080C48, #080C48  ),linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'content-box, border-box',
                            padding: '1.5px',
                            height: 'max-content',
                        }}
                    >
                        <Button
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: '10px',
                                lineHeight: '15px',
                                letterSpacing: '0.045em',
                                color: '#FFFFFF',
                                padding: { xs: '7px 5px', sm: '10px 15px' },
                            }}
                        >
                            You Get
                        </Button>
                    </Box>
                    <Box sx={{ overflow: 'hidden' }} ml={2}>
                        <Box
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '600',
                                fontSize: { xs: '12px', sm: '16px', md: '20px' },
                                lineHeight: '30px',
                                letterSpacing: '0.045em',
                                color: '#FFFFFF',
                            }}
                        >
                            ≈ {data?.send} {data?.currencyType?.receive}
                        </Box>
                        <Box
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: { xs: '8px', sm: '11px' },
                                lineHeight: '16px',
                                letterSpacing: '0.045em',
                                color: '#FFFFFF',
                            }}
                        >
                            {data?.recipientAddress}
                        </Box>
                    </Box>
                </Stack>
                <Box>
                    <Box
                        sx={{
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: '10px',
                            lineHeight: '15px',
                            letterSpacing: '0.045em',
                            color: '#FFFFFF',
                        }}
                    >
                        Estimated Arrival
                    </Box>
                    <Box
                        sx={{
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '10px',
                            lineHeight: '15px',
                            letterSpacing: '0.045em',
                            color: '#FFFFFF',
                        }}
                    >
                        ≈ 10 minutes
                    </Box>
                </Box>
                <Stack direction={'row'} gap={{ xs: 1, sm: 3 }} my={{ xs: 2, sm: 4 }}>
                    <Button
                        onClick={() => handleNext()}
                        disabled={!checked}
                        sx={{
                            background: 'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                            boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.3)',
                            borderRadius: '14px',

                            fontStyle: 'normal',
                            fontWeight: '600',
                            fontSize: { xs: '10px', sm: '13px' },
                            lineHeight: '20px',
                            letterSpacing: '0.045em',
                            color: '#FFFFFF',
                            padding: { xs: '5px 15px', sm: '12px 35px' },
                        }}
                    >
                        Confirm
                    </Button>
                    <Box
                        sx={{
                            borderRadius: '14px',
                            backgroundImage:
                                ' linear-gradient(#080C48, #080C48  ),linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'content-box, border-box',
                            padding: '1.5px',
                            height: 'max-content',
                        }}
                    >
                        <Button
                            onClick={() => handleBack()}
                            sx={{
                                borderRadius: '14px',

                                fontStyle: 'normal',
                                fontWeight: '600',
                                fontSize: { xs: '10px', sm: '13px' },
                                lineHeight: '20px',
                                letterSpacing: '0.045em',
                                color: '#FFFFFF',
                                padding: { xs: '5px 20px', sm: '12px 35px' },
                            }}
                        >
                            Back
                        </Button>
                    </Box>
                </Stack>
                <Stack direction="row" alignItems={'center'}>
                    <Checkbox
                        onClick={() => setChecked((e) => (e === true ? false : true))}
                        sx={{
                            '&.Mui-checked': {
                                '& .MuiSvgIcon-root': {
                                    background: `url(${check}) no-repeat 5px 5px `,
                                    color: 'transparent',
                                },
                            },
                        }}
                    />
                    <Box
                        sx={{
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: '10px',
                            lineHeight: '15px',
                            letterSpacing: '0.045em',
                            color: '#FFFFFF',
                        }}
                    >
                        I&apos;ve read and agree to the BuyBitcoin&apos;s
                        <span
                            style={{
                                background:
                                    'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 34.1%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textFillColor: 'transparent',
                            }}
                        >
                            Terms of Use, Privacy Policy
                        </span>
                        and
                        <span
                            style={{
                                background:
                                    'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 34.1%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textFillColor: 'transparent',
                            }}
                        >
                            Risk Disclosure Statement
                        </span>
                    </Box>
                </Stack>
            </Box>
        </>
    );
}
