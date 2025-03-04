import {
    Box,
    Button,
    InputBase,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AccountManagement = () => {
    const [records, setrecords] = useState();
    const [search, setsearch] = useState('');
    const navigate = useNavigate();
    const deleteRecord = async (email) => {
        let auth = localStorage.getItem('x-auth-token');
        await axios
            .post(
                `${import.meta.env.VITE_BASE_URL}users/deleteuser`,
                {
                    email: email,
                },
                {
                    headers: {
                        'x-auth-token': auth,
                    },
                },
            )
            .then(() => {
                toast.success('User Deleted');
                getRecords();
            })
            .catch(() => {
                toast.error('Failed to Delete');
            });
    };
    const getRecords = async () => {
        let auth = localStorage.getItem('x-auth-token');
        await axios
            .get(`${import.meta.env.VITE_BASE_URL}users/users`, {
                headers: {
                    'x-auth-token': auth,
                },
            })
            .then((res) => {
                setrecords(res.data);
            });
    };
    useEffect(() => {
        getRecords();
    }, []);

    return (
        <>
            <Box>
                <Box sx={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', my: 2 }}>
                    Account Management
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        my: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'end',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1,
                            alignItems: 'center',
                            fontSize: '16px',
                        }}
                    >
                        Search
                        <InputBase
                            onChange={(e) => {
                                setsearch(e.target.value);
                            }}
                            value={search}
                            sx={{
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: '2px solid #50505060',
                                p: 1,
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        p: 0.5,
                        minWidth: '550px',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 5px 1px gray',
                    }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {records &&
                                    records
                                        ?.filter((data) =>
                                            data.email.toLowerCase().includes(search.toLowerCase()),
                                        )
                                        ?.map(({ email, _id }, i) => (
                                            <TableRow
                                                key={i}
                                                sx={{
                                                    '&:last-child td, &:last-child th': {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell align="left">{email}</TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#fff',
                                                            textTransform: 'capitalize',
                                                        }}
                                                        onClick={() => {
                                                            navigate({
                                                                pathname: '/admin/updateuser',
                                                                search:
                                                                    '?' +
                                                                    createSearchParams({
                                                                        id: _id,
                                                                    }),
                                                            });
                                                        }}
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#fff',
                                                            textTransform: 'capitalize',
                                                        }}
                                                        onClick={() => deleteRecord(email)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
};

export default AccountManagement;
