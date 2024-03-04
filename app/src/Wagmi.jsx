import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import ContextAPI from './utils/ContextAPI';

function WagmiUtils() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <BrowserRouter>
                <ContextAPI>
                    <App />
                </ContextAPI>
            </BrowserRouter>
        </>
    );
}

export default WagmiUtils;
