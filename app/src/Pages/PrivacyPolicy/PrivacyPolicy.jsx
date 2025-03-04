import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

import privacybg from '../../Components/images/privacybg.png';

const PrivacyPolicy = () => {
    return (
        <>
            <Box
                sx={{
                    background: { md: `url(${privacybg}),#049AE7`, xs: 'transparent' },
                    backgroundSize: { md: '100% 100%', xs: 'cover' },
                    backgroundPosition: { md: 'center center', xs: 'right' },
                    height: { lg: '400', md: '350px', xs: '200px' },
                    py: { md: 10, xs: 2 },
                    color: 'white',
                    mt: { sm: '8rem', xs: '2rem' },
                    px: { md: 4, xs: 1 },
                }}
            >
                <Container>
                    <Grid container spacing={2}>
                        <Grid item md={4}></Grid>
                        <Grid
                            item
                            md={8}
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Box
                                height="200px"
                                display="flex"
                                justifyContent="center"
                                flexDirection="column"
                                alignItems="flex-start"
                            >
                                <Typography
                                    sx={{
                                        fontSize: {
                                            md: '48px',
                                            sm: '30px',
                                            xs: '25px',
                                            fontFamily: 'Audiowide',
                                            fontWeight: '400',
                                        },
                                    }}
                                >
                                    Privacy Policy
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box sx={{ py: { md: 4, xs: 1 } }}>
                <Container maxWidth="xl">
                    <Box my={2}>
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: '700',
                                textAlign: 'left',
                                color: 'white',
                            }}
                        >
                            1. What personal information of users can be used by the company?
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',

                                fontWeight: '400',
                                textAlign: 'left',
                                color: 'rgba(255, 255, 255, 1)',
                                mt: 2,
                            }}
                        >
                            When you enter the portal as a user, you must be sure to register or an
                            account will be created for you, indicating:
                            <br />
                            <br />
                            User account details
                            <br />
                            Exchange history for 7 days
                            <br />
                            <br />
                            Such information about the client is recorded on the portal and remains
                            available for use throughout the entire period of cooperation with the
                            firm.
                        </Typography>
                    </Box>
                    <Box my={2}>
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: '700',
                                textAlign: 'left',
                                color: 'white',
                            }}
                        >
                            2. How is personal information about the client used?
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',

                                fontWeight: '400',
                                textAlign: 'left',
                                color: 'rgba(255, 255, 255, 1)',
                                mt: 2,
                            }}
                        >
                            The personal data you provide during registration on the portal is
                            stored on the service and can be used to:
                            <ul>
                                <li>
                                    Contribute to the efficient operation of the portal and its
                                    applications, to get a complete picture of how well the portal
                                    services are functioning in order to provide quality services to
                                    customers.
                                </li>
                                <li>
                                    Assist in the effective implementation of the technical
                                    department of its activities.
                                </li>
                                <li>
                                    Investigate shortcomings and problems in the functioning of the
                                    portal and improve the quality of services provided by the
                                    company.
                                </li>
                                <li>
                                    Inform customers about advertising and other information, for
                                    example, about new services, convenient applications, etc., by
                                    means of mailings to the e-mail box.
                                </li>
                                <li>
                                    Establish a connection between the client and the administration
                                    of the portal in order to promptly respond to the services
                                    provided and the operation of the resource as a whole.
                                </li>
                                <li>Respond quickly to help the client with fraudulent threats.</li>
                            </ul>
                        </Typography>
                    </Box>
                    <Box my={2}>
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: '700',
                                textAlign: 'left',
                                color: 'white',
                            }}
                        >
                            3. Who can use individual customer data?
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',

                                fontWeight: '400',
                                textAlign: 'left',
                                color: 'rgba(255, 255, 255, 1)',
                                mt: 2,
                            }}
                        >
                            The user information entered during registration on the site is not
                            disclosed to anyone, except in cases where the law provides otherwise.
                            For example, information about customers may be transferred to other
                            persons at the request of the court or law enforcement agencies, when
                            changing the form of organization.
                        </Typography>
                    </Box>
                    <Box my={2}>
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: '700',
                                textAlign: 'left',
                                color: 'white',
                            }}
                        >
                            4. How does the company use cookies?
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: '500',
                                textAlign: 'left',
                                color: 'white',
                                mt: 1,
                            }}
                        >
                            4.1 What are cookies for?
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',

                                fontWeight: '400',
                                textAlign: 'left',
                                color: 'rgba(255, 255, 255, 1)',
                                mt: 2,
                            }}
                        >
                            Information about all user actions on the Internet (entering information
                            about yourself, viewing the content of portals, etc.) is temporarily
                            stored in cookies, which are small in size and are located on the
                            user&apos;s computer device. Thanks to the operation of these files, the
                            user, when revisiting the portal, does not enter his personal data a
                            second time, because the system has recorded all his actions in memory.
                            Portal employees, guided by the information received from cookies, can
                            identify user priorities and thus adjust the site menu, services and
                            offers for more convenient use.
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',

                                fontWeight: '400',
                                textAlign: 'left',
                                color: 'rgba(255, 255, 255, 1)',
                                mt: 2,
                            }}
                        >
                            Types of cookies:
                            <ul>
                                <li>
                                    Analytical files (they are used to authenticate users and
                                    collect information about them in general, which includes moving
                                    through portals and viewing certain content).
                                </li>
                                <li>
                                    Necessary files (give users access to the services and
                                    applications of the portal, determine the software and browser
                                    used to access the network, etc.).
                                </li>
                                <li>
                                    Functional files (save selected user parameters, thereby
                                    facilitating interaction with network portals).
                                </li>
                            </ul>
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: '500',
                                textAlign: 'left',
                                color: 'white',
                                mt: 1,
                            }}
                        >
                            4.2 How long are cookies stored on a computer?
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',

                                fontWeight: '400',
                                textAlign: 'left',
                                color: 'rgba(255, 255, 255, 1)',
                                mt: 2,
                            }}
                        >
                            The information contained in text files is stored on the computer for a
                            long time. The storage time depends on the type of cookie. As soon as
                            certain tasks are completed, these files are automatically deleted from
                            the computer.
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: '500',
                                textAlign: 'left',
                                color: 'white',
                                mt: 1,
                            }}
                        >
                            4.3 Who else can use cookies?
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',

                                fontWeight: '400',
                                textAlign: 'left',
                                color: 'rgba(255, 255, 255, 1)',
                                mt: 2,
                            }}
                        >
                            The search engine and third parties may use client data contained in
                            cookies for their own purposes, except for the use of data outside the
                            portal, as this must be specified in a special agreement.
                            <br />
                            When visiting the portal for the first time, the visitor automatically
                            agrees upon access to the platform. The user may also refuse this by
                            removing these files from his browser on his own.
                        </Typography>
                    </Box>
                    <Box my={2}>
                        <Typography
                            sx={{
                                fontSize: '20px',
                                fontWeight: '700',
                                textAlign: 'left',
                                color: 'white',
                            }}
                        >
                            5. Guaranteed safety for users
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',

                                fontWeight: '400',
                                textAlign: 'left',
                                color: 'rgba(255, 255, 255, 1)',
                                mt: 2,
                            }}
                        >
                            The portal administration staff provides for a set of measures to
                            protect user data. They are designed to quickly detect fraudulent
                            activities, which helps to reduce the facts of distribution of user
                            information to other persons. But, even despite this, there can be no
                            full guarantee of protection against account hacking by attackers, since
                            the latter use more and more new tricks to achieve their goals. Users
                            need to securely protect their accounts: have complex passwords, do not
                            share them with anyone. If it was noticed that someone logged into your
                            account, then immediately let the technical support department know
                            about it to protect your data.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default PrivacyPolicy;
