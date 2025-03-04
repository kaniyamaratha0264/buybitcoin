import {
    Box,
    Button,
    InputBase,
    Stack,
    Typography,
    Dialog,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import axios from 'axios';
import { toast } from 'react-toastify';
import { DataContext } from '../../utils/ContextAPI';

const uploadImage = async (image) => {
    try {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'usman2210');
        data.append('cloud_name', 'dqhsionv3');
        const imgurl = await fetch('https://api.cloudinary.com/v1_1/dqhsionv3/image/upload', {
            method: 'post',
            body: data,
        });
        const url = await imgurl.json();
        return url?.url;
    } catch (err) {
        toast.error('cloudnary image uploading error');
    }
};

export default function Upload() {
    const { kycModal, setKycModal, setLoader, searchParams } = useContext(DataContext);

    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [img1, setimg1] = useState();
    const [img2, setimg2] = useState();
    const [img3, setimg3] = useState();

    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        if (img1?.size > 10485760) {
            toast.error('Image size should be less than 10MB');
            setimg1('');
        }
        if (img2?.size > 10485760) {
            toast.error('Image size should be less than 10MB');
            setimg2('');
        }
        if (img3?.size > 10485760) {
            toast.error('Image size should be less than 10MB');
            setimg3('');
        }
    }, [img1, img2, img3]);

    const emailHandler = (val) => {
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        if (!validEmail.test(val)) {
            toast.error('Invalid Email');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        let txId = searchParams.get('txid');

        if (name && emailHandler(email) && img1 && img2 && img3) {
            try {
                // upload to cloudinary & get url
                const img1url = await uploadImage(img1);
                const img2url = await uploadImage(img2);
                const img3url = await uploadImage(img3);
                if (img1url && img2url && img3url) {
                    // save to db
                    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}kyc`, {
                        txId,
                        email,
                        name,
                        img1url,
                        img2url,
                        img3url,
                    });
                    toast.success(res?.data?.message);

                    setimg1('');
                    setimg2('');
                    setimg3('');
                    setemail('');
                    setname('');

                    toast.success('Waiting for admin approval');
                    setLoader(false);
                    setKycModal(false);
                } else {
                    toast.error('image uploading error');
                }
            } catch (err) {
                toast.error(err, 'error in uploading catch');
                setLoader(false);
            }
        } else {
            toast.error('Fill all Fields for KYC');
            setLoader(false);
        }
    };

    return (
        <>
            <Dialog
                fullScreen={smallScreen}
                fullWidth
                open={kycModal}
                onClose={() => setKycModal(false)}
                sx={{
                    '.MuiDialog-paperScrollPaper': {
                        borderRadius: '10px',
                        background: '#080D4A',
                    },
                }}
            >
                <Box px={{ sm: 5, xs: 2 }} pb={5} pt={3}>
                    <Box
                        sx={{
                            my: { xs: 2 },
                            fontSize: '28px ',
                            fontWeight: 700,
                            textAlign: 'center',
                        }}
                    >
                        Enter the Personal info
                    </Box>
                    <Box sx={{ width: '80%', mx: 'auto' }}>
                        <InputBase
                            placeholder="Enter your Name "
                            sx={{
                                px: 2,
                                py: 1,
                                mb: 2,
                                width: '100%',
                                fontSize: '18px',
                                border: '1px solid #ffffff',
                                borderRadius: '5px',
                            }}
                            onChange={(e) => setname(e.target.value)}
                        />
                        <InputBase
                            placeholder="Enter your Email"
                            sx={{
                                px: 2,
                                py: 1,
                                mb: 2,
                                width: '100%',
                                fontSize: '18px',
                                border: '1px solid #ffffff',
                                borderRadius: '5px',
                            }}
                            onChange={(e) => setemail(e.target.value)}
                        />

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                mb: 2,
                                width: '100%',
                                fontSize: '18px',
                                border: '1px solid #ffffff',
                                color: '#fff',
                                borderRadius: '5px',
                                overflow: 'hidden',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#8285A3',
                                    fontWeight: '600',
                                    pl: 2,
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    width: '50%',
                                }}
                            >
                                {img1?.name ? img1?.name : 'Proof of Identity'}
                            </Typography>
                            <Button
                                variant="text"
                                component="label"
                                sx={{
                                    height: '100%',
                                    bgcolor: '#008000',
                                    color: '#FFFFFF',
                                    py: 1.5,
                                }}
                            >
                                {img1?.size ? <CloudDoneIcon /> : <CloudUploadOutlinedIcon />}
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => setimg1(e.target.files[0])}
                                />
                            </Button>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                mb: 2,
                                width: '100%',
                                fontSize: '18px',
                                border: '1px solid #ffffff',
                                color: '#fff',
                                borderRadius: '5px',
                                overflow: 'hidden',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#8285A3',
                                    fontWeight: '600',
                                    pl: 2,
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    width: '50%',
                                }}
                            >
                                {img2?.name ? img2?.name : 'Proof of Residence'}
                            </Typography>
                            <Button
                                variant="text"
                                component="label"
                                sx={{
                                    height: '100%',
                                    bgcolor: '#008000',
                                    color: '#FFFFFF',
                                    py: 1.5,
                                }}
                            >
                                {img2?.size ? <CloudDoneIcon /> : <CloudUploadOutlinedIcon />}
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => setimg2(e.target.files[0])}
                                />
                            </Button>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                mb: 2,
                                width: '100%',
                                fontSize: '18px',
                                border: '1px solid #ffffff',
                                color: '#fff',
                                borderRadius: '5px',
                                overflow: 'hidden',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#8285A3',
                                    fontWeight: '600',
                                    pl: 2,
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    width: '50%',
                                }}
                            >
                                {/* eslint-disable-next-line */}
                                {img3?.name ? img3?.name : "Proof of Fund's Source"}
                            </Typography>
                            <Button
                                variant="text"
                                component="label"
                                sx={{
                                    height: '100%',
                                    bgcolor: '#008000',
                                    color: '#FFFFFF',
                                    py: 1.5,
                                }}
                            >
                                {img3?.size ? <CloudDoneIcon /> : <CloudUploadOutlinedIcon />}
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => setimg3(e.target.files[0])}
                                />
                            </Button>
                        </Stack>
                        <Button
                            sx={{
                                py: 2,
                                mt: 2,
                                background: 'green',
                                color: '#ffffff',
                                fontWeight: 700,
                                width: '100%',
                                textTransform: 'capitalize',
                            }}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
