import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Step,
    StepLabel,
    Stepper,
    styled,
    Typography,
    useMediaQuery,
} from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import axios from 'axios';
import QRCode from 'react-qr-code';
import stepcard from '../../Components/images/stepcard.png';
import { toast } from 'react-toastify';
import { DataContext } from '../../utils/ContextAPI';
import { useSearchParams } from 'react-router-dom';

const ColorlibConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
        },
    },

    [`& .${stepConnectorClasses.line}`]: {
        height: 1,
        border: 0,
        borderRadius: 1,
        backgroundImage: 'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 18,
    height: 18,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:
        ' linear-gradient(#08205C, #08205C  ),linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    padding: '1.5px',
    ...(ownerState.active && {
        background: 'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
        width: 18,
        height: 18,
    }),
    // ...(ownerState.completed && {}),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        ></ColorlibStepIconRoot>
    );
}

const steps = ['Awaiting deposit', 'Confirming', 'Exchanging', 'Sending to you'];

export default function Complete() {
    const { data, conversion, setKycModal ,adminWallet } = useContext(DataContext);
    const [activeStep1, setActiveStep1] = useState(0);
    const matches = useMediaQuery('(max-width:800px)');
    let [searchParams] = useSearchParams();
    const processing = async () => {
        let data = searchParams.get('txid');
        if (window.location.search.includes('txid')) {
            const data1 = await axios
                .post(`${import.meta.env.VITE_BASE_URL}getRecord/exchange`, {
                    txID: data,
                })
                .catch((err) => {
                    toast.error(err.response.data);
                    return 'error';
                });
            return data1.data;
        } else {
            return 'error';
        }
    };

    const func = async () => {
        let res;
        do {
            await new Promise((resolve) => setTimeout(resolve, 30000));
            res = await processing();

            if (res === 'transferred') {
                toast.success('Transfer Confirmed', {
                    toastId: 1,
                });
                setActiveStep1(1);
            } else if (res === 'middle') {
                toast.success('Processing', {
                    toastId: 1,
                });
            } else if (res === 'approval') {
                toast.success('Provide KYC', {
                    toastId: 1,
                });
                setKycModal(true);
            } else if (res === 'not found') {
                toast.success('Provide KYC', {
                    toastId: 1,
                });
                setKycModal(true);
            } else if (res === 'found') {
                toast.success('Waiting for admin approval', {
                    toastId: 1,
                });
            } else if (res === 'rejected') {
                toast.error('Exchange Rejected', {
                    toastId: 1,
                });
                toast.success('You have been refunded', {
                    toastId: 2,
                });
            } else if (res === 'approved') {
                toast.success('Processing', {
                    toastId: 1,
                });
            } else if (res === 'exchange') {
                toast.success('Exchanging', {
                    toastId: 1,
                });
                setActiveStep1(2);
            } else if (res === 'waiting') {
                toast.success('Waiting', {
                    toastId: 1,
                });
            } else if (res === 'success') {
                toast.success('Exchanged Successfully', {
                    toastId: 1,
                });
                setActiveStep1(3);
            }

            res = ['success', 'error'].includes(res);
        } while (!res);
    };

    useEffect(() => {
        func();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <>
            <Box
                sx={{
                    background: `url(${stepcard})`,
                    backgroundPosition: 'center center',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    mx: 'auto',
                    width: { xs: '100%', sm: '100%', md: '80%' },
                    px: { xs: 2, sm: 4, md: 5 },
                    py: { xs: 3, sm: 4, md: 5 },
                    my: { xs: 5, sm: 7, md: 10 },
                }}
            >
                <Box
                    sx={{
                        p: { xs: 1, sm: 2 },
                        mb: { xs: 4, sm: 4 },
                        border: '1px solid ',
                        borderImage: 'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%) 1',
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
                        Please send the funds you would like to exchange
                    </Box>
                    <Stack
                        direction={{ xs: 'row' }}
                        justifyContent={{ xs: 'space-between' }}
                        alignItems={{ xs: 'left', sm: 'center' }}
                        gap={{ xs: 1, sm: 4 }}
                        my={{ xs: 2, sm: 3, md: 5 }}
                    >
                        <Stack
                            direction="row"
                            alignItems={'center'}
                            justifyContent="center"
                            gap={{ xs: 1, sm: 4 }}
                        >
                            <Stack
                                direction="row"
                                alignItems={'center'}
                                justifyContent="center"
                                gap={{ xs: 2, sm: 4 }}
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
                                        width: 'max-content',
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
                                            height: '40px',
                                            width: '150px',
                                        }}
                                    >
                                        Amount
                                    </Button>
                                </Box>
                                <Box>
                                    <Box
                                        sx={{
                                            fontStyle: 'normal',
                                            fontWeight: '600',
                                            fontSize: { xs: '10px', sm: '14px', md: '17px' },
                                            lineHeight: '25px',
                                            letterSpacing: '0.045em',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        {data.amount} {data.currencyType.send}
                                    </Box>
                                    <Box
                                        sx={{
                                            fontStyle: 'normal',
                                            fontWeight: '400',
                                            fontSize: { xs: '10px', sm: '15px' },
                                            lineHeight: '22px',
                                            letterSpacing: '0.045em',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        1 {data.currencyType.send} ≈ {conversion}{' '}
                                        {data.currencyType.receive}
                                    </Box>
                                </Box>
                            </Stack>
                        </Stack>

                        <Box
                            sx={{
                                display: { md: 'flex', xs: 'none' },
                                alignItems: 'center',
                                marginRight: matches ? '5px' : '10px',
                            }}
                        >
                            <QRCode size={100} value={data.middleWareAddress.toString()} />
                        </Box>
                    </Stack>
                    <Stack
                        direction={{ xs: 'row', sm: 'row' }}
                        alignItems={{ xs: 'left', sm: 'center' }}
                        overflow="hidden"
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
                                width: 'max-content',
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
                                    height: '40px',
                                    width: '150px',
                                }}
                            >
                                To this address
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '600',
                                fontSize: { xs: '9px', sm: '13px', md: '17px' },
                                lineHeight: '25px',
                                letterSpacing: '0.045em',
                                color: '#FFFFFF',
                            }}
                        >
                            {adminWallet}
                            {/* {matches
                                ? data.middleWareAddress.slice(0, 6) +
                                  '......' +
                                  data.middleWareAddress.slice(-6)
                                : data.middleWareAddress} */}
                        </Box>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        overflowX: 'scroll',
                        mx: 'auto',
                        '&::-webkit-scrollbar': {
                            height: { xs: '5px', sm: '0px' },
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'linear-gradient(250.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                            boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.3)',
                            borderRadius: '14px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#064D86',
                            borderRadius: '14px',
                        },
                    }}
                    pb={{ xs: 0, sm: 5, md: 5 }}
                >
                    <Stepper
                        sx={{ width: '100%', py: 3 }}
                        activeStep={activeStep1}
                        connector={<ColorlibConnector />}
                        alternativeLabel
                    >
                        {steps.map((label) => (
                            <Step
                                key={label}
                                sx={{
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: { xs: '8px ', sm: '12px', md: '15px' },

                                    lineHeight: '22px',
                                    color: '#C8C7C7',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    '&.MuiStepLabel-labelContainer': {
                                        fontSize: '2px !important',
                                    },
                                }}
                            >
                                <StepLabel
                                    StepIconComponent={ColorlibStepIcon}
                                    sx={{
                                        '.MuiStepLabel-labelContainer span': {
                                            fontSize: {
                                                md: '14px !important',
                                                sm: '12px',
                                                xs: '8px',
                                            },
                                        },
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Stack
                    direction={{ xs: 'row' }}
                    alignItems={{ xs: 'left', sm: 'center' }}
                    gap={{ xs: 2, sm: 4 }}
                    my={{ xs: 2, sm: 3, md: 5 }}
                >
                    <Box
                        sx={{
                            borderRadius: '14px',
                            backgroundImage:
                                ' linear-gradient(#064D86, #064D86   ),linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'content-box, border-box',
                            padding: '1.5px',
                            height: 'max-content',
                            width: 'max-content',
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
                                height: '40px',
                                width: '150px',
                            }}
                        >
                            You Get
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            fontStyle: 'normal',
                            fontWeight: '600',
                            fontSize: { xs: '12px', sm: '14px', md: '17px' },
                            lineHeight: '25px',
                            letterSpacing: '0.045em',
                            color: '#FFFFFF',
                            ml: { md: 2, sm: 4, xs: 6.5 },
                        }}
                    >
                        {data.send} {data.currencyType.receive}
                    </Box>
                </Stack>
                <Stack
                    direction="row"
                    alignItems={{ xs: 'left', sm: 'center' }}
                    overflow="hidden"
                    gap={{ xs: 2, sm: 4 }}
                    my={{ xs: 2, sm: 3, md: 5 }}
                >
                    <Box
                        sx={{
                            borderRadius: '14px',
                            backgroundImage:
                                ' linear-gradient(#064D86, #064D86  ),linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'content-box, border-box',
                            padding: '1.5px',
                            height: 'max-content',
                            width: 'max-content',
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
                                height: '40px',
                                width: '150px',
                            }}
                        >
                            Recipient Wallet
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            fontStyle: 'normal',
                            fontWeight: '600',
                            fontSize: { xs: '9px', sm: '13px', mg: '15px', lg: '17px' },
                            lineHeight: '25px',
                            letterSpacing: '0.045em',
                            color: '#FFFFFF',
                        }}
                    >
                        {matches
                            ? data.recipientAddress.slice(0, 6) +
                              '.........' +
                              data.recipientAddress.slice(-6)
                            : data.recipientAddress}
                    </Box>
                </Stack>
                {activeStep1 === 3 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '24px',
                            }}
                        >
                            Exchanged!
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            py: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '24px',
                            }}
                        >
                            Processing
                        </Typography>
                        <CircularProgress color="inherit" />
                    </Box>
                )}
            </Box>
        </>
    );
}
