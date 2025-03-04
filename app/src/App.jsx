import React, { useMemo, useState, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider, Backdrop } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { InfinitySpin } from 'react-loader-spinner';

import ApprovalRecords from './Pages/DashboardAdmin/ApprovalRecords';
import DashboardAdmin from './Pages/DashboardAdmin/Index';
import DashboardUser from './Pages/DashboardUser/Index';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { createCustomTheme } from './utils/createCustomTheme';
import About from './Pages/About/About';
import Stepper from './Pages/Stepper/Stepper';
import HomePage from './Pages/Landingpage/Home';
import Help from './Pages/Help/Help';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import TermsUse from './Pages/TermsOfUse/TermsUse';
import TokenList from './Components/Modals/TokenList';
import KycModal from './Components/Modals/KycModal';
import HomeAdmin from './Pages/DashboardAdmin/Home';
import HomeUser from './Pages/DashboardUser/Home';
import { DataContext } from './utils/ContextAPI';
import RejectedRecords from './Pages/DashboardAdmin/RejectedRecords';
import UpdateForm from './Pages/DashboardUser/UpdateForm';
import ShowBlogs from './Pages/Blogs/ShowBlogs';
import SingleBlogs from './Pages/Blogs/SingleBlogs';
import CreateBlog from './Pages/DashboardAdmin/CreateBlog';
import EditBlog from './Pages/DashboardAdmin/EditBlog';
import BlogsShow from './Pages/DashboardAdmin/BlogsShow';
import AccountManagement from './Pages/DashboardAdmin/AccountManagement';
import SignupMail from './Pages/DashboardAdmin/SignupMail';
import UpdateByAdmin from './Pages/DashboardAdmin/UpdateForm';
import ChangeWallets from './Pages/DashboardAdmin/ChangeWallets';
import UpdateLogo from './Pages/DashboardAdmin/UpdateLogo';

const App = () => {
    const { loader } = useContext(DataContext);

    const [mode, setMode] = useState('dark');

    const toggleMode = () => {
        setMode((val) => (val === 'light' ? 'dark' : 'light'));
    };

    const themeClient = useMemo(() => {
        let theme = createCustomTheme(mode);
        theme = responsiveFontSizes(theme);
        return theme;
    }, [mode]);
    const Location = useLocation();

    return (
        <>
            <ThemeProvider theme={themeClient}>
                <CssBaseline enableColorScheme />
                <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
                    <InfinitySpin width="200" color={'#fff'} />
                </Backdrop>
                <TokenList />
                <KycModal />

                {Location.pathname.includes('admin') || Location.pathname.includes('user') ? (
                    ''
                ) : (
                    <Header mode={mode} toggleMode={toggleMode} />
                )}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blogs" element={<ShowBlogs />} />
                    <Route path="/singleBlogs/:blogId" element={<SingleBlogs />} />
                    <Route path="/faq" element={<Help />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/term-of-use" element={<TermsUse />} />
                    <Route path="/exchange" element={<Stepper />} />
                    <Route path="/admin" element={<DashboardAdmin />}>
                        <Route path="" element={<HomeAdmin />} />
                        <Route path="approve" element={<ApprovalRecords />} />
                        <Route path="reject" element={<RejectedRecords />} />
                        <Route path="blogCreate" element={<CreateBlog />} />
                        <Route path="blogEdit/:blogId" element={<EditBlog />} />
                        <Route path="blogShow" element={<BlogsShow />} />
                        <Route path="accounts" element={<AccountManagement />} />
                        <Route path="signupmail" element={<SignupMail />} />
                        <Route path="updateuser" element={<UpdateByAdmin />} />
                        <Route path="wallets" element={<ChangeWallets />} />
                        <Route path="logoUpdate" element={<UpdateLogo />} />
                    </Route>
                    <Route path="/user" element={<DashboardUser />}>
                        <Route path="" element={<HomeUser />} />
                        <Route path="profile" element={<UpdateForm />} />
                    </Route>
                </Routes>
                {Location.pathname.includes('admin') || Location.pathname.includes('user') ? (
                    ''
                ) : (
                    <Footer />
                )}
            </ThemeProvider>
        </>
    );
};

export default App;
