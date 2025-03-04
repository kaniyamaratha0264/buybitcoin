import React, { useContext } from 'react';
import { Box, Button, InputBase, Stack, useMediaQuery } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import stepcard from '../../Components/images/stepcard.png';
import dropimg from '../../Components/images/dropimg.png';
import arrow from '../../Components/images/arrow.png';
import qrcard from '../../Components/images/qrcard.png';
import { DataContext } from '../../utils/ContextAPI';
import WalletModal from '../../Components/Modals/WalletModal';

export default function Enter() {
    const {
        setCurrentTokenSelection,
        setInputAmount,
        inputAmount,
        outputAmount,
        setRecipient,
        recipient,
        selectedToken,
        toggleList,
        conversion,
        handleNext1,
    } = useContext(DataContext);
    const matches = useMediaQuery('(max-width:600px)');
    const [walletOpenModal, setWalletOpenModal] = React.useState(false);
    const handleOpenModal = () => {
        setWalletOpenModal(true);
    };

    const handleCloseModal = () => {
        setWalletOpenModal(false);
    };

    return (
        <>
            <WalletModal walletOpenModal={walletOpenModal} walletHandleClose={handleCloseModal} />
            <Box
                sx={{
                    background: `url(${stepcard})`,
                    backgroundPosition: 'center center',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    mx: 'auto',
                    width: { xs: '100%', sm: '85%', md: '65%' },
                    pr: { xs: 2, sm: 1, md: 1 },
                    pl: { xs: 2, sm: 5, md: 10 },
                    py: { xs: 3, sm: 5, md: 7 },
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
                    Please enter the details of your exchange
                </Box>
                <Box width={{ xs: '100%', sm: '90%', md: '85%' }}>
                    {/* <Stack direction={'row'} gap={{ xs: 1, sm: 3 }} my={{ xs: 3, sm: 5 }}>
                        <Button
                            sx={{
                                background:
                                    'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                                boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.3)',
                                borderRadius: '14px',
                                fontStyle: 'normal',
                                fontWeight: '600',
                                fontSize: { xs: '8px', sm: '10px' },
                                lineHeight: '15px',
                                letterSpacing: '0.045em',
                                color: '#FFFFFF',
                                padding: { xs: '8px 10px', sm: '15px 25px' },
                            }}
                        >
                            Exchange Crypto
                        </Button>
                        <Box
                            sx={{
                                borderRadius: '14px',
                                backgroundImage:
                                    ' linear-gradient(#080C48, #080C48  ),linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                                backgroundOrigin: 'border-box',
                                backgroundClip: 'content-box, border-box',
                                padding: '1.5px',
                            }}
                        >
                            <Button
                                sx={{
                                    borderRadius: '14px',

                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    fontSize: { xs: '8px', sm: '10px' },
                                    lineHeight: '15px',
                                    letterSpacing: '0.045em',
                                    color: '#FFFFFF',
                                    padding: { xs: '8px 10px', sm: '15px 25px' },
                                }}
                            >
                                Buy / Sell Crypto
                            </Button>
                        </Box>
                    </Stack> */}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            background: `url(${dropimg})`,
                            backgroundPosition: 'center center',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            px: { xs: 1, sm: 3 },
                            py: { xs: 1.5, sm: 2.5 },
                        }}
                        mt={{ xs: 3, sm: 5 }}
                    >
                        <Box sx={{ width: '100%', maxWidth: '320px', pr: 2 }}>
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
                                You Send
                            </Box>
                            <InputBase
                                placeholder="0.01"
                                sx={{
                                    width: '100%',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    fontSize: { xs: '12px', sm: '15px' },
                                }}
                                value={inputAmount ? inputAmount : ''}
                                onChange={(e) => {
                                    setInputAmount(e.target.value);
                                }}
                            />
                        </Box>
                        <Button
                            sx={{
                                fontSize: { xs: '12px', sm: '18px' },
                                borderRadius: '25px',
                                padding: '6px 10px',
                                color: '#FFFFFF',
                                gap: { xs: 0.5, sm: 1 },
                                mt: { xs: 1, sm: 1.5 },
                            }}
                            onClick={() => {
                                setCurrentTokenSelection('token1');
                                toggleList();
                            }}
                        >
                            <img
                                src={selectedToken.token1.image}
                                alt=""
                                style={{
                                    width: matches ? '20px' : '30px',
                                }}
                            />
                            {selectedToken.token1.symbol}
                            <ArrowDropDown sx={{ fontSize: { xs: '20px', sm: '25px' } }} />
                        </Button>
                    </Stack>
                    <Box
                        sx={{
                            ml: { xs: 1.8, sm: 3 },
                            py: 1,
                            borderLeft: '3px solid',
                            borderImage:
                                'linear-gradient(290.24deg, #0055C2 6.69%, #00BFF5 67.89%) 1',
                        }}
                    >
                        <Stack direction="row" gap={2} ml={-0.8} my={{ xs: 1, sm: 2 }}>
                            <img src={arrow} alt="" width="10px" height="8px" />
                            <Box
                                sx={{
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: '8px',
                                    lineHeight: '12px',
                                    letterSpacing: '0.045em',
                                    color: '#FFFFFF',
                                }}
                            >
                                No extra fees
                            </Box>
                        </Stack>
                        <Stack direction="row" gap={2} ml={-0.8} my={{ xs: 1, sm: 2 }}>
                            <img src={arrow} alt="" width="10px" height="8px" />
                            <Box
                                sx={{
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    fontSize: '8px',
                                    lineHeight: '12px',
                                    letterSpacing: '0.045em',
                                    color: '#FFFFFF',
                                }}
                            >
                                Estimated rate: 1 {selectedToken.token1.symbol} ≈ {conversion}{' '}
                                {selectedToken.token2.symbol}
                            </Box>
                        </Stack>
                    </Box>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            background: `url(${dropimg})`,
                            backgroundPosition: 'center center',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            px: { xs: 1, sm: 3 },
                            py: { xs: 1.5, sm: 2.5 },
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '320px',
                                pr: { xs: 1, sm: 2 },
                            }}
                        >
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
                                You Get
                            </Box>
                            <InputBase
                                readOnly
                                fullWidth
                                sx={{
                                    width: '100%',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    fontSize: { xs: '12px', sm: '15px' },
                                }}
                                value={outputAmount}
                            />
                        </Box>
                        <Button
                            sx={{
                                fontSize: { xs: '12px', sm: '18px' },
                                borderRadius: '25px',
                                padding: '6px 10px',
                                color: '#FFFFFF',
                                gap: { xs: 0.5, sm: 1 },
                                mt: { xs: 1, sm: 1.5 },
                            }}
                            onClick={() => {
                                setCurrentTokenSelection('token2');
                                toggleList();
                            }}
                        >
                            <img
                                src={selectedToken.token2.image}
                                alt=""
                                style={{
                                    width: matches ? '20px' : '30px',
                                }}
                            />
                            {selectedToken.token2.symbol}
                            <ArrowDropDown sx={{ fontSize: { xs: '20px', sm: '25px' } }} />
                        </Button>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'center', sm: 'flex-end' }}
                        gap={1}
                        my={{ xs: 1, sm: 1 }}
                    >
                        <Box
                            sx={{
                                py: '5px',

                                fontStyle: 'normal',
                                fontWeight: '500',
                                fontSize: '12px',
                                lineHeight: '18px',
                                letterSpacing: '0.045em',
                                color: '#FFFFFF',
                            }}
                        >
                            Recipient Wallet
                        </Box>
                        <Box
                            onClick={handleOpenModal}
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '8px',
                                lineHeight: '12px',
                                letterSpacing: '0.045em',
                                color: '#FFFFFF',
                                cursor: 'pointer',
                            }}
                        >
                            Don’t have a wallet yet?
                        </Box>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            background: `url(${qrcard})`,
                            backgroundPosition: 'center center',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            px: { xs: 1.5, sm: 3 },
                            py: { xs: 2, sm: 2.5 },
                        }}
                    >
                        <InputBase
                            placeholder="Enter the Payout address"
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '15px',
                                color: '#ffffff',
                                width: '100%',
                                maxWidth: '380px',
                                '& ::placeholder': {
                                    color: '#CBCACA',
                                },
                            }}
                            value={recipient ? recipient : ''}
                            onChange={(e) => {
                                setRecipient(e.target.value);
                            }}
                        />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                        <Box
                            sx={{
                                py: 1,
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '8px',
                                lineHeight: '12px',
                                letterSpacing: '0.045em',
                                color: '#D8D8D8',
                            }}
                        >
                            FIO protocol names are supported
                        </Box>
                    </Stack>
                    <Stack
                        direction={'row'}
                        gap={3}
                        my={2}
                        mt={{ xs: 2, sm: 3, md: 4 }}
                        justifyContent="center"
                    >
                        <Button
                            variant="gradient"
                            sx={{
                                boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.3)',
                                borderRadius: '10px',
                                fontStyle: 'normal',
                                fontWeight: '600',
                                fontSize: '13px',
                                padding: { xs: '8px 35px', sm: '10px 45px' },
                            }}
                            onClick={() => handleNext1()}
                        >
                            Next
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </>
    );
}
