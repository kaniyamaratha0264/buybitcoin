import { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchBlogs = useCallback(async () => {
        const response = await axios
            .get(`${import.meta.env.VITE_BASE_URL}blogs/get`)
            .then((res) => {
                return res.data;
            });
        if (response) {
            setBlogs(response?.response);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);
    const navigate = useNavigate();
    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return (
        <>
            <Typography
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '28px',
                    fontWeight: 500,
                }}
                mt={20}
            >
                Blogs
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15px',
                    flexWrap: 'wrap',
                }}
                mt={5}
                mb={10}
            >
                {blogs.length > 0 ? (
                    <>
                        {blogs.map((item, ind) => {
                            const date = new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            }).format(item.createAt);

                            return (
                                <Box
                                    key={ind}
                                    p={1}
                                    sx={{
                                        width: '100%',
                                        maxWidth: '600px',
                                        minHeight: '200px',
                                        backgroundColor: '#50A6ED',
                                        borderRadius: '7px',
                                        cursor: 'pointer',
                                        boxShadow:
                                            '0 0 2px rgba(0,0,0,0.4),0 0 5px rgba(0,0,0,0.3)',
                                        textDecoration: 'none',
                                    }}
                                    onClick={() => navigate(`/singleBlogs/${item._id}`)}
                                >
                                    <Box p={1} sx={{}}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 0 3px #ddd',
                                                }}
                                            >
                                                <img
                                                    style={{
                                                        objectFit: 'cover',
                                                    }}
                                                    width="100%"
                                                    src="https://images.pexels.com/photos/2103864/pexels-photo-2103864.jpeg?auto=compress&cs=tinysrgb&w=600"
                                                />
                                            </Box>
                                            <Typography
                                                sx={{
                                                    fontSize: '18px',
                                                    fontWeight: '600',
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {item.userName}
                                            </Typography>
                                        </Box>

                                        <Box pl={2} mt={1}>
                                            <Typography
                                                sx={{
                                                    fontSize: '20px',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                {item.title}
                                            </Typography>
                                            <Box
                                                mt={0.5}
                                                sx={{
                                                    display: 'flex',
                                                    gap: '15px',
                                                }}
                                            >
                                                <Typography sx={{ fontSize: '12px !important' }}>
                                                    #learning
                                                </Typography>
                                                <Typography sx={{ fontSize: '12px !important' }}>
                                                    #technical
                                                </Typography>
                                                <Typography sx={{ fontSize: '12px !important' }}>
                                                    #life
                                                </Typography>
                                                <Typography sx={{ fontSize: '12px !important' }}>
                                                    #earnPeace
                                                </Typography>
                                                <Typography sx={{ fontSize: '12px !important' }}>
                                                    #Metaverse
                                                </Typography>
                                            </Box>
                                            <Box
                                                mt={2}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <Typography sx={{ fontSize: '14px !important' }}>
                                                    Date: {date}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{ fontSize: '14px !important' }}
                                                    >
                                                        14 min read
                                                    </Typography>
                                                    <BookmarkBorderIcon />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                    </>
                ) : (
                    <>
                        {loading ? (
                            'Loading...'
                        ) : (
                            <Typography variant="h3">There is No Blogs at this time</Typography>
                        )}
                    </>
                )}
            </Box>
        </>
    );
};
export default ShowBlogs;
