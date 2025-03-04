import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import axios from 'axios';
const SingleBlogs = () => {
    const params = useParams();
    const [Blogs, setBlogs] = useState(null);

    const fetchSingleBlog = async () => {
        setTimeout(async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}blogs/getSingle/${params.blogId}`,
            );
            // eslint-disable-next-line
            if (response) {
                setBlogs(response.data.response);
            }
        }, 500);
    };
    useEffect(() => {
        fetchSingleBlog();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!Blogs) {
        return (
            <Box
                mb={10}
                mt={20}
                sx={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                There is no Record
            </Box>
        );
    } else {
        // eslint-disable-next-line
        const replaceBlog = Blogs.blog.replace(/<img /gim, "<img width='100%'");
        return (
            <Container maxWidth="lg">
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    mb={10}
                    mt={20}
                >
                    <Box
                        p={2}
                        sx={{
                            width: '100%',
                            maxWidth: '900px !important',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{ width: '100%' }}
                            dangerouslySetInnerHTML={{ __html: replaceBlog }}
                        ></div>
                    </Box>
                </Box>
            </Container>
        );
    }
};

export default SingleBlogs;
