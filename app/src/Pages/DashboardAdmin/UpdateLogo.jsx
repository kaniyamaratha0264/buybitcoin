import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import 'react-quill/dist/quill.snow.css';
import { DataContext } from '../../utils/ContextAPI';

const CreateBlog = () => {
    const { logo, setGlobalLogo } = useContext(DataContext);
    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        // Check if a file is selected
        if (!file) {
            console.error('No file provided');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const blobString = reader.result;
            console.log(blobString, 'blobbbbbbb');
            setGlobalLogo(blobString);
        };

        reader.onerror = (error) => {
            console.error('Error reading the file:', error);
        };

        reader.readAsDataURL(file);
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
                            Upload/Update Logo
                        </Typography>
                        {/* Input for uploading the logo */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            style={{ display: 'none' }}
                            id="logo-upload"
                        />
                        <label htmlFor="logo-upload">
                            <Typography component="span" variant="body2">
                                Choose File [Click here]
                            </Typography>
                        </label>
                    </Box>
                    {/* Display the uploaded logo */}
                    {logo && (
                        <Box>
                            <img
                                src={logo}
                                alt="Uploaded Logo"
                                style={{
                                    marginLeft: '20px',
                                    maxWidth: '100px',
                                    maxHeight: '100px',
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default CreateBlog;
