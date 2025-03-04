import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Grid,
    InputBase,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import helpbg1 from '../../Components/images/helpbg1.png';
import helpframe from '../../Components/images/helpframe.png';
import contactBg from '../../Components/images/contactBg.png';
import contactmob from '../../Components/images/contactmob.png';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

const data = [
    {
        heading: 'How can I access my exchange?',
        text: 'A secure session code can access your exchange to view progress and to keep track of your cryptocurrency. With dozens of currencies always available, start your encrypted exchange',
        link: 'now',
    },
    {
        heading: 'Invested to keep me safe?',
        text: 'Invested in keeping you safe. Your wallet is encrypted and only accessible by you. Stored offline, your funds backed up and you hold the keys. Lock your account after each use to keep your wallets even more safe, only you know the login.',
    },
    {
        heading: 'How fast does it take to exchange?',
        text: 'Our platform is large enough to allow every exchange possible with very affordable fees, always free deposits and easy sending to any wallet. The entire exchange should take less than 30 minutes to process, from receiving and sending your freshly exchanged crypto.',
    },
    {
        heading: 'Where is BuyBitcoin based?',
        text: 'Founded in 2019, bitcoinbank.cc is a Cayman Islands registered cryptocurrency exchange that adopts blockchain technology to build the next-generation financial ecosystem. We provide the latest trading services for hundreds of diverse crypto assets.',
    },
    {
        heading: 'How do I exchange and mix bitcoin?',
        // eslint-disable-next-line
        text: "Click exchange, select cryptos to swap and enter the amount. Confirm and your one-time secure deposit address is displayed, deposit within 12 hours - and watch your fresh crypto arrive shortly (or close the tab no problem) to your wallet. It's that easy.",
    },
];

const Help = () => {
    const match = useMediaQuery('(max-width:900px)');
    const [email, setemail] = useState('');
    const [subject, setsubject] = useState('');
    const [message, setmessage] = useState('');

    const submit = async () => {
        if (!email || !subject || !message) {
            toast.error('Fill all fields');
            return;
        }

        let template_params = {
            user_email: email,
            subject: subject,
            message: message,
        };
        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERID,
                import.meta.env.VITE_EMAILJS_TEMPID,
                template_params,
                import.meta.env.VITE_EMAILJS_PUBKEY,
            )
            .then(
                function () {
                    toast.success('Response Submitted');
                    setemail('');
                    setsubject('');
                    setmessage('');
                },
                function (error) {
                    toast.error(error.message);
                },
            );
    };

    return (
        <>
            <Box
                sx={{
                    background: { md: `url(${helpbg1}),#049AE7`, xs: 'transparent' },
                    backgroundSize: { md: '100% 100%', xs: 'cover' },
                    backgroundPosition: { md: 'center center', xs: 'right' },
                    py: { md: 20, sm: 5, xs: 2 },
                    color: 'white',
                    mt: '5rem',
                }}
            >
                <Container pt={20}>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{ display: { md: 'block', xs: 'none' } }}
                        ></Grid>
                        <Grid item xs={12} md={6} display="flex" justifyContent="center">
                            <Box
                                height="100%"
                                display="flex"
                                width="100%"
                                justifyContent="center"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Typography
                                    sx={{
                                        fontSize: {
                                            md: '48px',
                                            sm: '30px',
                                            xs: '25px',
                                            fontFamily: 'Audiowide',
                                            fontWeight: '400',
                                            mt: 1,
                                        },
                                    }}
                                >
                                    Frequently asked questions
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container>
                <Box sx={{ mt: 4, px: { md: 5, xs: 0 } }}>
                    <Box
                        sx={{
                            background: `url(${helpframe})`,
                            backgroundSize: '100% 100%',
                            // backgroundPosition: "center center",
                            height: '100%',
                            py: 8,
                            my: 4,
                            px: { md: 8, xs: 2 },
                            color: 'white',
                        }}
                    >
                        {data.map(({ heading, text, link }, i) => {
                            return (
                                <Accordion
                                    key={i}
                                    sx={{ my: 2, background: 'rgba(167, 165, 165, 0.1)' }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMore sx={{ color: 'white' }} />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography
                                            sx={{
                                                color: 'rgba(246, 246, 246, 1)',
                                                fontSize: { md: '20px', xs: '15px' },

                                                fontWeight: '500',
                                            }}
                                        >
                                            {heading}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography
                                            sx={{
                                                color: 'rgba(246, 246, 246, 1)',
                                                fontSize: { md: '15px', xs: '13px' },

                                                fontWeight: '400',
                                            }}
                                        >
                                            {text}{' '}
                                            <Link to="/exchange" style={{ color: '#fff' }}>
                                                {link && link}
                                            </Link>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </Box>
                </Box>

                <Box sx={{ mt: 10, px: { md: 15, xs: 0 } }}>
                    <Box
                        sx={{
                            background: !match ? `url(${contactBg})` : `url(${contactmob})`,
                            width: '100%',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            py: 4,
                            my: 4,
                            px: { md: 4, xs: 6 },
                            color: 'white',
                        }}
                    >
                        <Grid container>
                            <Grid item md={6}>
                                <Box textAlign={{ md: 'left', xs: 'center' }}>
                                    <Typography
                                        sx={{
                                            fontSize: '25px',
                                            fontWeight: '700',
                                            color: 'rgba(8, 12, 72, 1)',
                                            textAlign: { md: 'left', xs: 'center' },
                                        }}
                                    >
                                        Contact us
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            color: 'rgba(8, 12, 72, 1)',
                                        }}
                                    >
                                        If you have any questions, concerns or suggestions, feel
                                        free to contact us via the following email:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '20px',
                                            fontWeight: '600',
                                            mt: 2,
                                            color: 'rgba(8, 12, 72, 1)',
                                        }}
                                    >
                                        For support queries
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            color: 'rgba(8, 12, 72, 1)',
                                        }}
                                    >
                                        support@bitcoinbank.cc
                                    </Typography>
                                    <Box mt={4}>
                                        <InputBase
                                            onChange={(e) => setemail(e.target.value)}
                                            value={email}
                                            style={{
                                                borderRadius: '10px',
                                                color: 'rgba(8, 12, 72, 1)',
                                                padding: '0.5rem 1rem',
                                                fontWeight: '400',
                                                fontSize: '18px',
                                                width: '100%',
                                                border: '1px solid rgba(8, 12, 72, 1)',
                                            }}
                                            fullWidth
                                            mt={4}
                                            type="text"
                                            id="standard-basic"
                                            variant="standard"
                                            placeholder="Email"
                                        />
                                    </Box>
                                    <Box mt={4}>
                                        <InputBase
                                            onChange={(e) => setsubject(e.target.value)}
                                            value={subject}
                                            style={{
                                                borderRadius: '10px',
                                                color: 'rgba(8, 12, 72, 1)',
                                                padding: '0.5rem 1rem',

                                                fontWeight: '400',
                                                fontSize: '18px',
                                                width: '100%',
                                                border: '1px solid rgba(8, 12, 72, 1)',
                                            }}
                                            fullWidth
                                            mt={4}
                                            type="text"
                                            id="standard-basic"
                                            variant="standard"
                                            placeholder="Subject"
                                        />
                                    </Box>
                                    <Box my={4}>
                                        <InputBase
                                            onChange={(e) => setmessage(e.target.value)}
                                            value={message}
                                            style={{
                                                borderRadius: '10px',
                                                color: 'rgba(8, 12, 72, 1)',
                                                padding: '0.5rem 1rem',

                                                fontWeight: '400',
                                                fontSize: '18px',
                                                width: '100%',
                                                border: '1px solid rgba(8, 12, 72, 1)',
                                            }}
                                            multiline={true}
                                            minRows={4}
                                            fullWidth
                                            mt={4}
                                            type="text"
                                            id="standard-basic"
                                            variant="standard"
                                            placeholder="Message"
                                        />
                                    </Box>
                                    <Button
                                        sx={{
                                            color: 'white',
                                            px: 3,
                                            background: '#014D7D',
                                            '&:hover': {
                                                background: '#014D7D',
                                            },
                                        }}
                                        onClick={() => submit()}
                                    >
                                        Send
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item md={6}></Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Help;
