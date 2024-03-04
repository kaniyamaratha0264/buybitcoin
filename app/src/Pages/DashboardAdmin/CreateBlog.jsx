import { Box, InputBase, Typography } from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import axios from 'axios';

// eslint-disable-next-line
var quill;
const modules = {
    toolbar: {
        container: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        handlers: {
            image: imageHandler,
        },
    },
};
function imageHandler() {
    var range = this.quill.getSelection();
    var value = prompt('please copy paste the image url here.');
    if (value) {
        this.quill.insertEmbed(range.index, 'image', value);
    }
}

const CreateBlog = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');

    const postBlogs = async () => {
        if (!value || !title) {
            toast.error('Please Fill all Fields');
            return false;
        }
        let auth = localStorage.getItem('x-auth-token');

        const response = await axios
            .post(
                `${import.meta.env.VITE_BASE_URL}blogs/create`,
                { blog: value, title },
                {
                    headers: {
                        'x-auth-token': auth,
                    },
                },
            )
            .then((res) => {
                return res.data;
            });

        if (response.status == 'success') {
            toast.success('Blog Post SuccessFully');
            document.querySelector('.ql-editor').innerHTML = null;
        }
    };
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    background: '#50A6ED',
                    borderRadius: '10px',
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            borderTopLeftRadius: '5px',
                            borderTopRightRadius: '5px',
                        }}
                        p={1}
                        mx={1.1}
                        mt={1}
                    >
                        <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: '500',
                            }}
                        >
                            Write Your Blog
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                            mt={2}
                        >
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: '500',
                                }}
                            >
                                Enter Tittle
                            </Typography>
                            <InputBase
                                sx={{
                                    py: 0.5,
                                    px: 1,
                                    width: '100%',
                                    maxWidth: '400px',
                                    borderRadius: '5px',
                                    border: '1px solid #000',
                                }}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title Here ..."
                            />
                        </Box>
                    </Box>
                    <Box px={1}>
                        <ReactQuill
                            ref={(el) => {
                                quill = el;
                            }}
                            modules={modules}
                            theme="snow"
                            onChange={setValue}
                            placeholder="Content goes here..."
                            height="1000px"
                        />
                        <Box
                            mx={0.1}
                            px={1}
                            sx={{
                                height: '50px',
                                borderBottomLeftRadius: '7px',
                                borderBottomRightRadius: '7px',
                            }}
                        >
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'end',
                                    gap: '10px',
                                }}
                            >
                                <button
                                    style={{
                                        backgroundColor: '#F49D1A',
                                        padding: '7px 14px',
                                        outline: 'none',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        color: 'white',
                                        letterSpacing: '1px',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        width: '70px',
                                    }}
                                    onClick={() =>
                                        (document.querySelector('.ql-editor').innerHTML = null)
                                    }
                                >
                                    Clear
                                </button>
                                <button
                                    style={{
                                        backgroundColor: '#285430',
                                        padding: '7px 14px',
                                        outline: 'none',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        color: 'white',
                                        letterSpacing: '1px',
                                        fontSize: '16px',
                                        fontWeight: '500',
                                        width: '70px',
                                    }}
                                    onClick={postBlogs}
                                >
                                    Post
                                </button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default CreateBlog;
