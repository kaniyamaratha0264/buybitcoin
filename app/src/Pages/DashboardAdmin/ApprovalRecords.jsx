import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import axios from 'axios';
import ApprovalDetailModal from '../../Components/Modals/ApprovalDetailModal';

export default function Records() {
    const [approval, setApproval] = useState([]);
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState({});

    const getApprovals = async () => {
        await axios.get(`${import.meta.env.VITE_BASE_URL}wallet/approvalRecord`).then((res) => {
            setApproval(res.data);
        });
    };

    const approvalDetail = async (_id) => {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}kyc`, {
            params: { id: _id },
        });
        return res;
    };

    useEffect(() => {
        getApprovals();
    }, [open]);

    return (
        <>
            <ApprovalDetailModal
                open={open}
                setOpen={setOpen}
                detail={detail}
                getApprovals={getApprovals}
            />
            <Box>
                <Box sx={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', my: 2 }}>
                    Approval Records
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
                                    <TableCell>Address</TableCell>
                                    <TableCell align="right">Sent</TableCell>
                                    <TableCell align="right">Received</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {approval &&
                                    approval?.map(
                                        (
                                            {
                                                _id,
                                                amount,
                                                send,
                                                recipientAddress,
                                                currencyType,
                                                txID,
                                            },
                                            i,
                                        ) => (
                                            <TableRow
                                                key={i}
                                                sx={{
                                                    '&:last-child td, &:last-child th': {
                                                        border: 0,
                                                    },
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {recipientAddress.slice(0, 4) +
                                                        '...' +
                                                        recipientAddress.slice(-4)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {amount} {currencyType.send}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {send} {currencyType.receive}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#fff',
                                                            textTransform: 'capitalize',
                                                        }}
                                                        onClick={async () => {
                                                            const {
                                                                data: { name, email, img1, img2 },
                                                            } = await approvalDetail(txID);

                                                            setDetail({
                                                                _id,
                                                                txID,
                                                                amount,
                                                                send,
                                                                recipientAddress,
                                                                currencyType,
                                                                name,
                                                                email,
                                                                img1,
                                                                img2,
                                                            });
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        view
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ),
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
}
