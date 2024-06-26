import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

import termsBg from '../../Components/images/termsBg.png';
import star from '../../Components/images/star.png';
const data = [
    {
        id: 1,
        heading: 'Enforcement & Amendments',
        list: [
            'The following Terms of Use constitute an obligatory agreement between BuyBitcoin and the User conceived after a User visits the official website and avails the services offered. Thereby, the User confirms that he/she had read and agreed to these Terms of Use before starting to use the BuyBitcoin service.',
            'The User acknowledges that the Terms of Use may be updated or revised by BuyBitcoin on occasions. If the User fails to read and agree to the Terms of Use, he/she should not continue to use the Service.',
            'Any changes in the Terms will be communicated to the Users through the available contact details.',
            'BuyBitcoin follows and complies with best practices and regulation in privacy including but not limited to General Data Protection Regulation (GDPR).',
        ],
    },
];
const data1 = [
    {
        id: 2,
        heading: 'Provided Services',
        list: [
            'Services provided by BuyBitcoin enable users to exchange one type of crypto asset to another.',
            "Here to indicate that shall be understood as an exchange of crypto asset of one type to the crypto asset of another under the terms and conditions agreed on by the exchanging parties. This exchanging operation is carried out via a third-party service in the respective blockchain network. When you exchange crypto assets you acknowledge and agree that the Exchange will be processed through the third-party exchange service with additional fees applicable to such Exchange. You acknowledge and agree that on the 'Standard rate' mode the exchange rates information made available via the Services are an estimation only and may differ from prevailing rates available via other sources outside of our Services. You acknowledge and agree that on the 'Fixed rate' mode BuyBitcoin has the right to refuse to conduct a transaction through the BuyBitcoin platform if the rate has changed by more than 2% with an immediate refund of funds to the User (if the User has already sent funds).",
            "Here to 'Crypto Assets' shall be understood as a type of assets which can only and solely be transferred with the blockchain technology, including but not limited to digital coins and digital tokens and any other type of digital mediums of exchange such as Bitcoin, Ethereum, Ripple etc., to the full and absolute exempt of the securities of any kind.",
            'To be able to avail the services, we may require under special conditions you to consent to pass through AML/KYC procedures that may be implemented on you according to our internal AML/KYC policies. During these procedures, BuyBitcoin reserves the right to request additional information and documents which are intended without limitation to identify our User and to prove the source of the funds.',
            "To carry out the Exchange via our services, our system automatically generates the particular address that contains information about the customer; pairs the crypto asset that User wants to exchange and the crypto asset that User wants to receive (jointly - 'crypto pair'); and the recipient address provided by the User (the address where exchanged crypto assets be deposited). All addresses are reusable only for standard rates transactions: those addresses can be used to perform an unlimited amount of transactions with the same parameters. If crypto pair and/or recipient address change, a new address will be generated by our system the funds.",
            'You recompense and hold buybitcoin innocuous against any direct or indirect, consequential or special damages, or damages of any kind, including but not restricted to, loss of use, loss of profits or loss of data, whether in an action in contract, tort (including but not limited to negligence) or otherwise, arising out of or in any way connected with your use of our services, including but not limited to those arising from your personal error and misbehavior such as incorrect use of reusable address, incorrectly constructed transactions etc.',
            'Buybitcoin does not provide safekeeping services, which implies, we do not provide services offering to store crypto assets on deposits or balances. your exchange may be delayed in some cases such as the requirement to pass through aml/kyc procedure. you hereby understand and acknowledge, that any delays are possible; you indemnify and hold us harmless against any claims, demands and damages, whether direct, indirect, consequential or special, or any other damages of any kind, including, but not limited to, loss of use, loss of profits or loss of data, whether in an action in contract, tort (including but not limited to negligence) or otherwise, arising out of or in any way connected with the exchange delay, whether originated from our fault or not.',
        ],
    },
    {
        id: 3,
        heading: 'Refund policy for the fixed rates exchange transactions',
        list: [
            'User understands that cryptocurrency and Crypto Assets are highly volatile; their exchange rates are transitory; transactions on a blockchain are generally irreversible. BuyBitcoin is not taking responsibility for any risk in use of the platform, including but not limited to exchange rate risk and market risk. All sales and transactions after the successful BuyBitcoin exchange are final and the amount is non-refundable.',
            'There is a number of cases when the transaction cannot be completed by BuyBitcoin and Crypto Assets may be refunded to User depending on BuyBitcoin decision. Crypto Assets, sent by the User, do not correspond to the Crypto Assets wallet address provided by BuyBitcoin. Crypto Assets are sent to an address that differs from the initial address provided by BuyBitcoin for the particular transaction. User sends assets later than 10 minutes after he/she confirmed the transaction in the Fixed rates exchange mode. User sent Crypto Assets in an amount that does not correspond to the initial amount of assets confirmed by the User before the Crypto Assets transfer. The Parties agree that under dramatic changes in the cryptocurrency market they understand the changes in the cryptocurrency rates equal to 2% or higher in any direction since the initiation of the transaction. BuyBitcoin only accepts one deposit per transaction ID (TXID) on the Fixed rate exchanges. If your funds are deposited in a TXID with more than one deposit, you will need to contact support to receive a refund. The exchange rate will not be honored and your exchange cannot be completed. User sent Crypto Assets in an amount below the minimum limits determined on the Website, therefore transaction can not be completed.',
            'BuyBitcoin handles refund requests from the Users on a case-by-case basis. Any decisions by BuyBitcoin with respect to refunds or exchanges are final.',
            'In case of a positive decision in favor of a refund, the Digital Asset will be sent either to the specified by User refund address specified by the User (for Fixed rate exchanges) or to the address provided by the User to the BuyBitcoin support team within 7 days since the transaction initiation (for Standard rate exchanges). BuyBitcoin transfers assets to the User s wallet address except the network fee only in full before the subtraction of the network fee.',
            'In the event that the user requires any additional services as the result of their own error or misuse of the Service, BuyBitcoin may charge an additional 50 USD transaction fee. Additional services may include, without limitation, asset extraction, manual intervention in the exchange process. By requesting such services, the user agrees to pay the applicable fees.',
            'In case the transaction was made on a partner’s platform(any other website, application, service, etc. other than BuyBitcoin), BuyBitcoinis not responsible for the refund procedure. Should this happen, a User must apply for the refund on the partner’s platform where the transaction was made.',
            'In case the User does not wish to disclose their identity for certain reasons and refuses to undergo the KYC/AML procedure, BuyBitcoin has the right to terminate the exchange and the deposited funds are then transferred back to the initial address the deposit was made from, subtracting the network fee and BuyBitcoin operational fee in amount of 10% from transferred assets but not less than 100 USD equivalent.',
        ],
    },
    {
        id: 4,
        heading: 'AML and KYC procedure',
        list: [
            'BuyBitcoin reserves the right to apply the AML/KYC procedure to specific Users, addresses and particular transactions of crypto assets.',
            'The up-to-date information on the AML/KYC procedures can always be found at the [bitcoinbank.cc](https://bitcoinbank.cc) website.',
            'In case the User refuses to undergo the KYC/AML procedure, refund policy is carried out in accordance with Paragraph 3.6 of the Terms.',
        ],
    },
    {
        id: 5,
        heading: 'Eligibility',
        list: [
            'Prior to your use of the Services and on an ongoing basis you represent, warrant, covenant and agree that:You use our services at your sole purpose, discretion and risk. BuyBitcoin is available for installation and use in all jurisdictions. BuyBitcoin respects and due diligence treats the national legislation of the states, international acts and customs, as well as the users of the application. You are at least 16 years old or of other legal age, according to your relevant jurisdiction. You agree to pay the fees for Exchanges completed via Services as defined by BuyBitcoin, which We may change from time to time. There are some risks connected with the Internet-based system, such as failure of hardware, software and internet connections and perils with the Blockchain protocols, such as malfunction, unintended function, unexpected functioning or attack on the Blockchain protocol. You guarantee that the crypto assets are solely yours and not sold, hampered, not in contention, or under seizure, and not under the control of any third party. You shall provide accurate information for performing Exchange (e.g. recipient and sender wallet address).',
            'You are solely responsible for your actions and/or inactions while availing our services. Furthermore, you concur and authorize that you will not violate any law, contract, third-party right or perpetrate by accessing or using the services. Without prejudice to the foregoing, you represent, agree and warrant, that YOU WILL NOT: Use our services or will promptly stop using them if any relevant law in your country forbids or will prohibit you at any moment from doing so. Use our service to take part in fraudulent, scam or any type of illegal activity. Use our services to either exchange or pay-in crypto assets which are sourced from illegal gambling activities; fraud; money-laundering; or terrorist activities; or any other illegal activities. Crypto assets obtained from legitimate sources can only be used by the User to avail our services. Provide false, inaccurate, or misleading information; Attempt to modify, decompile, reverse-engineer or disassemble our software in any way. Use any robot, spider, crawler, scraper or other automated means or interface not provided by us to access the Services or to extract data. Attempt to bypass any content screening techniques we employ or attempt to access any service or area of our services which are not authorized for access to the Users. Develop any third-party applications that interact with our Services without our prior written consent. Encourage or induce any third party to engage in any of the activities prohibited under this Section.',
            'You recompense and hold buybitcoin innocuous against any claims, demands and damages whether direct or indirect, consequential or special damages or damages of any kind, including but not restricted to, loss of use, loss of profits or loss of data or loss of assets, whether in an action in contract, tort (including but not limited to negligence) or otherwise, originated from or in any way connected with invalidity or breach of any of the provisions of this section and the entire terms.',
        ],
    },
];
const TermsUse = () => {
    return (
        <>
            <Box
                sx={{
                    background: { md: `url(${termsBg}),#049AE7`, xs: 'transparent' },
                    backgroundSize: { md: 'cover', xs: 'cover' },
                    backgroundPosition: { md: 'center center', xs: 'right' },

                    py: { md: 18, xs: 2 },
                    color: 'white',
                    mt: { sm: '8rem', xs: '4rem' },
                    px: { md: 4, xs: 1 },
                }}
            >
                <Container>
                    <Grid container spacing={2}>
                        <Grid item md={8}></Grid>
                        <Grid
                            item
                            md={4}
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
                                            sm: '40px',
                                            xs: '30px',
                                        },
                                        fontFamily: 'Audiowide',
                                        fontWeight: '400',
                                    }}
                                >
                                    Terms of Use
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{ px: { md: 4, xs: 1 } }}>
                <Container maxWidth="xl">
                    <Box py={3} color="white" px={{ md: 10, xs: 0 }}>
                        <Typography
                            sx={{
                                fontSize: '20px',

                                fontWeight: '700',
                                textAlign: 'center',
                            }}
                        >
                            Last Updated: January, 2023
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '15px',
                                fontWeight: '400',
                                textAlign: 'justify',
                                color: 'rgba(255, 255, 255, 1)',
                                mt: 2,
                            }}
                        >
                            These Terms of Use and any terms incorporated herein (hereinafter, the
                            “Terms”) apply to your (“user”, “you“) use of the Services, including
                            https://bitcoinbank.cc (“Website“), the technology and the platform
                            integrated therein and any related applications (including without
                            limitation the mobile one) associated therewith (“BuyBitcoin”, “We”,
                            “Service” or “Us”), which are operated and maintained by Btcfintechs
                            Ltd. We provide you with the possibility to use our Services as defined
                            above on the following terms and conditions…
                        </Typography>
                    </Box>
                    <Box mt={10}>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                {data.map(({ id, heading, list }, i) => {
                                    return (
                                        <Box key={i}>
                                            <Typography
                                                sx={{
                                                    fontSize: '20px',
                                                    fontWeight: '700',
                                                    textAlign: 'left',
                                                    color: 'white',
                                                }}
                                            >
                                                {id}. {heading}
                                            </Typography>
                                            <ol>
                                                {list.map((item, i) => (
                                                    <li
                                                        key={i}
                                                        style={{
                                                            fontFamily: 'Poppins',
                                                            fontSize: '15px',
                                                            fontWeight: '400',
                                                            color: 'rgba(255, 255, 255, 1)',
                                                            marginTop: '20px',
                                                            lineHeight: '22.5px',
                                                            letterSpacing: '1%',
                                                            textAlign: 'justify',
                                                        }}
                                                    >
                                                        {item}
                                                    </li>
                                                ))}
                                            </ol>
                                        </Box>
                                    );
                                })}
                            </Grid>
                            <Grid item md={6} xs={12} display={{ md: 'block', xs: 'none' }}>
                                <img src={star} alt="stra" />
                            </Grid>
                        </Grid>
                        <Box mt={{ xs: 0, md: -20 }}>
                            {data1.map(({ id, heading, list }, i) => {
                                return (
                                    <Box key={i} mt={3}>
                                        <Typography
                                            sx={{
                                                fontSize: '20px',
                                                fontWeight: '700',
                                                textAlign: 'left',
                                                color: 'white',
                                            }}
                                        >
                                            {id}. {heading}
                                        </Typography>
                                        <ol>
                                            {list.map((item, i) => (
                                                <li
                                                    key={i}
                                                    style={{
                                                        fontFamily: 'Poppins',
                                                        fontSize: '15px',
                                                        fontWeight: '400',
                                                        textAlign: 'justify',
                                                        color: 'rgba(255, 255, 255, 1)',
                                                        marginTop: '20px',
                                                        lineHeight: '22.5px',
                                                        letterSpacing: '1%',
                                                    }}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ol>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default TermsUse;
