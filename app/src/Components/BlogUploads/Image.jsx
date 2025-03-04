import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { toast } from 'react-toastify';

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

const Image = ({ index, updateImg }) => {
    const [img1, setimg1] = useState();

    useEffect(() => {
        if (img1?.size > 10485760) {
            toast.error('Image1 size should be less than 10MB');
            setimg1('');
        } else {
            submit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [img1]);

    const submit = async () => {
        const img1url = await uploadImage(img1);
        updateImg(img1url, index);
    };
    return (
        <>
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
                    {img1?.name ? img1?.name : 'Upload Image'}
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
        </>
    );
};

export default Image;
