import React, { useContext } from 'react';
import { Box, Container, Step, StepLabel, Stepper, styled } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import stepimg from '../../Components/images/stepimg.png';
import stepbg from '../../Components/images/stepbg.png';
import Confirm from './Confirm';
import Enter from './Enter';
import Complete from './Complete';
import { DataContext } from '../../utils/ContextAPI';

const ColorlibConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 17,
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
    width: 35,
    height: 35,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:
        ' linear-gradient(#080C48, #080C48  ),linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'content-box, border-box',
    padding: '1.5px',
    ...(ownerState.active && {
        background: 'linear-gradient(90.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
        width: 35,
        height: 35,
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {active ? <img src={stepimg} alt="" /> : ''}
        </ColorlibStepIconRoot>
    );
}

const steps = ['Enter Exchange Details', 'Confirm the Exchange', 'Complete the Exchange'];

export default function CustomizedSteppers() {
    const { activeStep } = useContext(DataContext);

    return (
        <Box
            sx={{
                pt: 10,
                py: 1,
                background: `url(${stepbg})`,
                backgroundPosition: { xs: '70% top', sm: '60% top', md: 'center top' },
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Container>
                <Box
                    sx={{
                        overflowX: 'scroll',
                        mx: 'auto',
                        '&::-webkit-scrollbar': {
                            height: { xs: '5px', sm: '0px' },
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'linear-gradient(270.24deg, #0055C2 6.69%, #00BFF5 67.89%)',
                            boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.3)',
                            borderRadius: '14px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#064D86',
                            borderRadius: '14px',
                        },
                    }}
                    pt={{ xs: 15, sm: 15, md: 25 }}
                    pb={{ xs: 0, sm: 5, md: 5 }}
                >
                    <Stepper
                        sx={{
                            width: '100%',
                            minWidth: { xs: '760px', sm: 'auto' },
                            py: 3,
                        }}
                        activeStep={activeStep}
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
                                    letterSpacing: '0.01em',
                                    color: '#C8C7C7',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                {activeStep === 0 ? (
                    <>
                        <Enter />
                    </>
                ) : activeStep === 1 ? (
                    <>
                        <Confirm />
                    </>
                ) : (
                    <>
                        <Complete />
                    </>
                )}
            </Container>
        </Box>
    );
}
