import React, { useContext, useState } from 'react';
import { Box, Dialog, Stack, useMediaQuery, InputBase, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search } from '@mui/icons-material';

import { tokenList } from '../../utils/tokenList';
import { DataContext } from '../../utils/ContextAPI';

export default function TokenList() {
    const { currentTokenSelection, setSelectedToken, selectedToken, toggleList, openList } =
        useContext(DataContext);
    const [search, setSearch] = useState('');
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const tokenChange = (list) => {
        setSelectedToken((prev) => {
            return {
                ...prev,
                [currentTokenSelection]: {
                    name: list.name,
                    symbol: list.symbol,
                    image: list.image,
                    decimals: list.decimals,
                    convertId: list.convertId,
                },
            };
        });
        toggleList();
    };

    return (
        <>
            <Dialog
                fullScreen={smallScreen}
                fullWidth
                open={openList}
                onClose={() => toggleList()}
                sx={{
                    '.MuiDialog-paperScrollPaper': {
                        borderRadius: '10px',
                        background: '#080D4A',
                    },
                }}
            >
                <Box px={{ sm: 5, xs: 2 }} pb={5} pt={3}>
                    <Stack direction="column" gap={2}>
                        <Box fontSize="20px" fontWeight={500}>
                            Select a Currency
                        </Box>
                        <Box
                            sx={{
                                background: 'rgba(217, 217, 217, 0.1)',
                                border: '2px solid #012F7B',
                                borderRadius: '5px',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                px: 2,
                                py: 0.7,
                            }}
                        >
                            <Search />
                            <InputBase
                                sx={{ width: '100%' }}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                placeholder="Type a Currency"
                            />
                        </Box>
                        {/* <Stack
                            direction="row"
                            alignItems="center"
                            gap={{ sm: 1, xs: 0.5 }}
                            justifyContent="space-evenly"
                            flexWrap="wrap"
                        >
                            <Button
                                variant="chipactive"
                                sx={{
                                    borderRadius: '50px',
                                }}
                            >
                                All
                            </Button>
                            <Button
                                variant="chip"
                                sx={{
                                    borderRadius: '50px',
                                }}
                            >
                                New
                            </Button>
                            <Button
                                variant="chip"
                                sx={{
                                    borderRadius: '50px',
                                }}
                            >
                                Gainers 24h
                            </Button>
                            <Button
                                variant="chip"
                                sx={{
                                    borderRadius: '50px',
                                }}
                            >
                                Losers 24h
                            </Button>
                        </Stack> */}
                        <Box fontSize="16px" fontWeight={400}>
                            Popular Currencies
                        </Box>
                        {tokenList
                            .filter((list) => {
                                let re = new RegExp(search, 'gi');
                                return list.name.match(re);
                            })
                            .filter((list) => {
                                return list.name !== selectedToken[currentTokenSelection].name;
                            })
                            .map((list, index) => (
                                <Stack
                                    onClick={() => tokenChange(list)}
                                    key={index}
                                    direction="row"
                                    alignItems="center"
                                    sx={{
                                        cursor: 'pointer',
                                        gap: 2,
                                        py: 1.5,
                                        pl: 3,
                                        pr: 3,
                                        border: '1px solid #50A6ED',
                                        borderRadius: '10px',
                                        boxShadow: '0px 3px 9px rgba(0, 0, 0, 0.29)',
                                        transition: 'all 0.2s ease-in',
                                        '&:hover': {
                                            pl: 4,
                                            gap: 2.5,
                                            background: 'rgba(190, 193, 198, 0.15)',
                                        },
                                    }}
                                >
                                    <img src={list.image} alt="coin" width="30px" height="30px" />
                                    <Stack direction="column">
                                        <Typography fontSize="14px" fontWeight="600">
                                            {list.name}
                                        </Typography>
                                        <Typography
                                            fontSize="11px"
                                            fontWeight="400"
                                            color="#C3C1C1"
                                        >
                                            {list.symbol}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            ))}
                    </Stack>
                </Box>
            </Dialog>
        </>
    );
}
