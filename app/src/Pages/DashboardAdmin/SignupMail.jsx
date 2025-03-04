import { Box, Button, InputBase } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SignupMail = () => {
    const [text, settext] = useState('');

    const handleSubmit = async () => {
        if (!text) {
            toast.error('Please Enter Text');
            return;
        }
        let auth = localStorage.getItem('x-auth-token');
        await axios
            .post(
                `${import.meta.env.VITE_BASE_URL}users/updateSignupMail`,
                {
                    text: text,
                },
                {
                    headers: {
                        'x-auth-token': auth,
                    },
                },
            )
            .then(() => {
                toast.success('Updated Successfuly');
            })
            .catch(() => {
                toast.error('Failed to Update');
            });
    };

    const getRecord = async () => {
        let auth = localStorage.getItem('x-auth-token');
        const record = await axios.get(`${import.meta.env.VITE_BASE_URL}users/getSignupMail`, {
            headers: {
                'x-auth-token': auth,
            },
        });
        settext(record.data);
    };
    useEffect(() => {
        getRecord();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Box>
                <Box sx={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', my: 2 }}>
                    Signup Mail Template
                </Box>
                <InputBase
                    onChange={(e) => {
                        settext(e.target.value);
                    }}
                    placeholder="Enter your text here"
                    value={text}
                    rows={6}
                    multiline
                    sx={{
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '2px solid #50505060',
                        my: 2,
                        p: 1,
                        width: '100%',
                    }}
                />
                <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
                    Update
                </Button>
            </Box>
        </>
    );
};

export default SignupMail;
