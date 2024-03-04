import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

const UpdateByAdmin = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line
    let [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        walletAddress: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const getRecord = async () => {
        let auth = localStorage.getItem('x-auth-token');
        const record = await axios.post(
            `${import.meta.env.VITE_BASE_URL}users/getProfilebyAdmin`,
            { id: searchParams.get('id') },
            {
                headers: {
                    'x-auth-token': auth,
                },
            },
        );
        setFormData({
            name: record.data.name,
            email: record.data.email,
            password: '',
            walletAddress: record.data.wallet,
        });
    };
    useEffect(() => {
        getRecord();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.email) {
            toast.error('Please Enter Email Address');
            return;
        }
        let auth = localStorage.getItem('x-auth-token');
        await axios
            .post(
                `${import.meta.env.VITE_BASE_URL}users/editbyAdmin`,
                {
                    ...formData,
                },
                {
                    headers: {
                        'x-auth-token': auth,
                    },
                },
            )
            .then(() => {
                toast.success('Updated Successfuly');
                if (formData.password) {
                    navigate({
                        pathname: '/admin/accounts',
                    });
                }
            })
            .catch(() => {
                toast.error('Failed to Update');
            });
    };

    return (
        <Box mt={10} mb={10}>
            <Container maxWidth="sm">
                <Typography sx={{ fontSize: '28px', textAlign: 'center', mt: 10, mb: 2 }}>
                    Update User Info
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        label="Name"
                        disabled
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="email"
                        label="Email"
                        disabled
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="walletAddress"
                        label="Wallet Address"
                        value={formData.walletAddress}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Box mt={2}>
                        <Button variant="contained" type="submit" color="primary">
                            Update
                        </Button>
                    </Box>
                </form>
            </Container>
        </Box>
    );
};

export default UpdateByAdmin;
