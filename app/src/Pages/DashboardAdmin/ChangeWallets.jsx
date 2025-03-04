import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangeWallets = () => {
    const [formData, setFormData] = useState({
        algorand_admin_mnemonic: '',
        admin_mnemonic: '',
        algorand_admin_address: '',
        evm_admin_address: '',
        btc_admin_address_one: '',
        btc_admin_address_two: '',
        btc_admin_address_three: '',
        ltc_admin_address: '',
        doge_admin_address: '',
        solana_admin_address: '',
        tron_admin_address: '',
        stellar_admin_address: '',
        polkadot_admin_address: '',
        thor_admin_address: '',
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
        const record = await axios.get(`${import.meta.env.VITE_BASE_URL}wallets`, {
            headers: {
                'x-auth-token': auth,
            },
        });
        setFormData({
            algorand_admin_mnemonic: record.data.algorand_admin_mnemonic,
            admin_mnemonic: record.data.admin_mnemonic,
            algorand_admin_address: record.data.algorand_admin_address,
            evm_admin_address: record.data.evm_admin_address,
            btc_admin_address_one: record.data.btc_admin_address_one,
            btc_admin_address_two: record.data.btc_admin_address_two,
            btc_admin_address_three: record.data.btc_admin_address_three,
            ltc_admin_address: record.data.ltc_admin_address,
            doge_admin_address: record.data.doge_admin_address,
            solana_admin_address: record.data.solana_admin_address,
            tron_admin_address: record.data.tron_admin_address,
            stellar_admin_address: record.data.stellar_admin_address,
            polkadot_admin_address: record.data.polkadot_admin_address,
            thor_admin_address: record.data.thor_admin_address,
        });
    };
    useEffect(() => {
        getRecord();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (
            !formData.algorand_admin_mnemonic ||
            !formData.admin_mnemonic ||
            !formData.algorand_admin_address ||
            !formData.evm_admin_address ||
            !formData.btc_admin_address_one ||
            !formData.btc_admin_address_two ||
            !formData.btc_admin_address_three ||
            !formData.ltc_admin_address ||
            !formData.doge_admin_address ||
            !formData.solana_admin_address ||
            !formData.tron_admin_address ||
            !formData.stellar_admin_address ||
            !formData.polkadot_admin_address ||
            !formData.thor_admin_address
        ) {
            toast.error('Kindly fill all fields');
            return;
        }
        let auth = localStorage.getItem('x-auth-token');
        await axios
            .post(
                `${import.meta.env.VITE_BASE_URL}wallets/change`,
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
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>
                        24 Word Algorand Memonics
                    </Typography>
                    <TextField
                        name="algorand_admin_mnemonic"
                        value={formData.algorand_admin_mnemonic}
                        onChange={handleChange}
                        // disabled
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>
                        12 Word Admin Mnemonics
                    </Typography>
                    <TextField
                        name="admin_mnemonic"
                        value={formData.admin_mnemonic}
                        // disabled
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>
                        Algorand Address on Path /0
                    </Typography>
                    <TextField
                        name="algorand_admin_address"
                        value={formData.algorand_admin_address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>EVM Address on Path /0</Typography>
                    <TextField
                        name="evm_admin_address"
                        value={formData.evm_admin_address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>BTC Address on Path /0</Typography>
                    <TextField
                        name="btc_admin_address_one"
                        value={formData.btc_admin_address_one}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>BTC Address on Path /1</Typography>
                    <TextField
                        name="btc_admin_address_two"
                        value={formData.btc_admin_address_two}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>BTC Address on Path /2</Typography>
                    <TextField
                        name="btc_admin_address_three"
                        value={formData.btc_admin_address_three}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>LTC Address on Path /0</Typography>
                    <TextField
                        name="ltc_admin_address"
                        value={formData.ltc_admin_address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>
                        DOGE Address on Path /0
                    </Typography>
                    <TextField
                        name="doge_admin_address"
                        value={formData.doge_admin_address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>
                        Solana Address on Path /0
                    </Typography>
                    <TextField
                        name="solana_admin_address"
                        value={formData.solana_admin_address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>
                        Tron Address on Path /0
                    </Typography>
                    <TextField
                        name="tron_admin_address"
                        value={formData.tron_admin_address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>
                        Steller Address on Path /0
                    </Typography>
                    <TextField
                        name="stellar_admin_address"
                        value={formData.stellar_admin_address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>
                        Polkadot Address on Path /0
                    </Typography>
                    <TextField
                        name="polkadot_admin_address"
                        value={formData.polkadot_admin_address}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Typography sx={{ fontSize: '20px', mt: 2 }}>
                        Thor Address on Path /0
                    </Typography>
                    <TextField
                        name="thor_admin_address"
                        value={formData.thor_admin_address}
                        onChange={handleChange}
                        fullWidth
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

export default ChangeWallets;
