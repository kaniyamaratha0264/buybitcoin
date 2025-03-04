import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DataContext } from '../../utils/ContextAPI';
import { useNavigate } from 'react-router-dom';

const UpdateForm = () => {
    const { handleLoggedOut } = useContext(DataContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        walletAddress: '',
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.email) {
            toast.error('Please Enter Email Address');
            return;
        }
        let auth = localStorage.getItem('x-auth-token');
        await axios
            .post(
                `${import.meta.env.VITE_BASE_URL}users/editProfile`,
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
                    handleLoggedOut();
                    navigate({
                        pathname: '/',
                    });
                }
            })
            .catch(() => {
                toast.error('Failed to Update');
            });
    };

    const getRecord = async () => {
        let auth = localStorage.getItem('x-auth-token');
        const record = await axios.get(`${import.meta.env.VITE_BASE_URL}users/getProfile`, {
            headers: {
                'x-auth-token': auth,
            },
        });
        setFormData({
            name: record.data.name,
            email: record.data.email,
            password: '',
            walletAddress: record.data.wallet,
        });
    };

    useEffect(() => {
        getRecord();
    }, []);

    return (
        <Box mt={10} mb={10}>
            <Container maxWidth="sm">
                <Typography sx={{ fontSize: '28px', textAlign: 'center', mt: 10, mb: 2 }}>
                    Update form
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="email"
                        label="Email"
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

export default UpdateForm;
