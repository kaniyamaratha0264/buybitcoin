import { Box, InputBase, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Paragraph = ({ index, updatePara }) => {
    const theme = useTheme();
    const [title, settitle] = useState();
    const [body, setbody] = useState();

    useEffect(() => {
        if (title && body) updatePara(title, body, index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, body]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                <Typography
                    sx={{
                        fontSize: '20px',
                    }}
                >
                    Title:
                </Typography>
                <InputBase
                    sx={{
                        width: '100%',
                        border: `1px solid ${theme.palette.background.borderLight}`,
                        borderRadius: '10px',
                        p: 1.5,
                    }}
                    onChange={(e) => settitle(e.target.value)}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                <Typography
                    sx={{
                        fontSize: '20px',
                    }}
                >
                    Body:
                </Typography>
                <InputBase
                    sx={{
                        width: '100%',
                        border: `1px solid ${theme.palette.background.borderLight}`,
                        borderRadius: '10px',
                        p: 1.5,
                    }}
                    multiline
                    maxRows={6}
                    onChange={(e) => setbody(e.target.value)}
                />
            </Box>
        </>
    );
};

export default Paragraph;
