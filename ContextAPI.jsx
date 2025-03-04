import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const DataContext = createContext();

const ContextAPI = (props) => {
    // exchange type

    const [exchangeType, setExchangeType] = useState('fixed');
    const toggleExchangeType = () => {
        setExchangeType(exchangeType === 'fixed' ? 'float' : 'fixed');
    };
    //login and singup
    const [loggedIn, setLoggedIn] = useState(false);
    const handleLoggedIn = () => {
        setLoggedIn(!loggedIn);
    };
    const handleLoggedOut = () => {
        localStorage.removeItem('x-auth-token');
        setLoggedIn(false);
    };
    const [isAdmin, setIsAdmin] = useState(false);
    const [authToken, setAuthToken] = useState({
        authToken: null,
        isAuthenticated: false,
    });

    const getAuthToken = async (auth) => {
        const verify = await axios.get(`${import.meta.env.VITE_BASE_URL}users/verify`, {
            headers: {
                'x-auth-token': auth,
            },
        });

        if (auth)
            if (verify.status === 200) {
                setAuthToken({
                    authToken: auth,
                    isAuthenticated: true,
                });
                setIsAdmin(verify.data);
                setLoggedIn(true);
            } else {
                localStorage.removeItem('x-auth-token');
                setLoggedIn(false);
            }
    };

    useEffect(() => {
        let auth = localStorage.getItem('x-auth-token');
        if (auth) getAuthToken(auth);
    }, [loggedIn]);
    // admin fee
    const [adminFee, setAdminFee] = useState(0);
    const getFee = async (auth) => {
        await axios
            .get(`${import.meta.env.VITE_BASE_URL}wallet/getfee`, {
                headers: {
                    'x-auth-token': auth,
                },
            })
            .then((res) => {
                setAdminFee(res?.data?.fee);

                // NIM"
            });
    };
    const setFee = async () => {
        let auth = localStorage.getItem('x-auth-token');
        await axios

            .post(
                `${import.meta.env.VITE_BASE_URL}wallet/updatefee`,
                {
                    fee: adminFee,
                },
                {
                    headers: {
                        'x-auth-token': auth,
                    },
                },
            )
            .then(() => {
                toast.success('Fee Updated Successfully');
            });
    };

    useEffect(() => {
        let auth = localStorage.getItem('x-auth-token');
        if (auth) getFee(auth);
    }, []);

    const [logo, setLogo] = useState(''); // Set default logo URL
    const callingForHelmet = (logo) => {
        return (
            <Helmet>
                <link rel="icon" type="image/svg+xml" id="dynamicFavicon" href={logo} />
            </Helmet>
        );
    };
    useEffect(() => {
        if (logo) {
            axios
                .post(`${import.meta.env.VITE_BASE_URL}logo`, {
                    logoBase64: logo,
                })
                .then(() => {
                    callingForHelmet(logo);
                });
            localStorage.setItem('globalLogo', logo);
        } else {
            // let logo = localStorage.getItem('x-auth-token');
            axios.get(`${import.meta.env.VITE_BASE_URL}logo`, {}).then((res) => {
                setLogo(res?.data?.response?.base64);
                localStorage.setItem('globalLogo', res?.data?.response?.base64);
                callingForHelmet(res?.data?.response?.base64);
            });
        }
        // if (logo) setLogo(logo?.res?.base64);
    }, [logo]);

    // useEffect(()=>{},[logo])

    const setGlobalLogo = (newLogo) => {
        setLogo(newLogo);
        // localStorage.setItem('logo', newLogo);
    };
    //app js
    const [loader, setLoader] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [currentTokenSelection, setCurrentTokenSelection] = useState('token1');
    const [inputAmount, setInputAmount] = useState();
    const [outputAmount, setOutputAmount] = useState(0);
    const [conversion, setConversion] = useState(0);
    const [recipient, setRecipient] = useState('');
    const [kycModal, setKycModal] = useState(false);
    const [selectedToken, setSelectedToken] = useState({
        token1: {
            name: 'BNB',
            symbol: 'BNB',
            image: 'https://content-api.changenow.io/uploads/bnbbsc_331e969a6b.svg',
            decimals: 18,
            convertId: 1839,
        },
        token2: {
            name: 'ETH',
            symbol: 'ETH',
            image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg',
            decimals: 6,
            convertId: 1027,
        },
    });

    const switchTokens = () => {
        setSelectedToken((prev) => {
            return {
                token1: {
                    ...prev.token2,
                },
                token2: {
                    ...prev.token1,
                },
            };
        });
    };

    const toggleList = () => setOpenList(!openList);

    const handleChange = async () => {
        setLoader(true);
        let converted = conversion * inputAmount;
        let percent = (adminFee / 100) * converted;
        converted = converted - percent;
        setOutputAmount(converted?.toFixed(4));

        setLoader(false);
    };

    const getConversionData = async (send, receive) => {
        try {
            const {
                data: { price: convertValue },
            } = await axios.post(`${import.meta.env.VITE_BASE_URL}convertapi`, {
                send: send,
                receive: receive,
            });
            setConversion(convertValue);
        } catch (error) {
            toast.error('Server not responding.');
        }
    };

    useEffect(() => {
        getConversionData(selectedToken.token1.convertId, selectedToken.token2.convertId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedToken]);

    useEffect(() => {
        if (inputAmount) handleChange();
        else setOutputAmount(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputAmount, conversion, adminFee]);

    //stepper
    const [activeStep, setActiveStep] = useState(0);
    const [data, setData] = useState();

    let [searchParams, setSearchParams] = useSearchParams();
    const getMid = async () => {
        setLoader(true);
        let auth = localStorage.getItem('x-auth-token');
        await axios
            .post(
                `${import.meta.env.VITE_BASE_URL}wallet/createtx`,
                {
                    recipient: recipient,
                    amount: inputAmount,
                    send: outputAmount,
                    sendCurrency: selectedToken.token1.symbol,
                    receiveCurrency: selectedToken.token2.symbol,
                    sendCurrecnyId: selectedToken.token1.convertId,
                    receiveCurrecnyId: selectedToken.token2.convertId,
                    exchangeType: exchangeType,
                },
                {
                    headers: {
                        'x-auth-token': auth,
                    },
                },
            )
            .then((res) => {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSearchParams({
                    txid: res.data.txID,
                });
            })
            .catch((err) => {
                toast.error(err.response.data);
                setLoader(false);
            });
    };

    const getData = async () => {
        setActiveStep(1);
        await axios
            .post(`${import.meta.env.VITE_BASE_URL}wallet/verifyTransaction`, {
                txID: searchParams.get('txid'),
            })
            .then((res) => {
                if (res.data.status === 'success') {
                    setData(res.data.txRecord);
                    getConversionData(
                        res.data.txRecord.exchangeType.sendId,
                        res.data.txRecord.exchangeType.receiveId,
                    );
                    setLoader(false);
                } else {
                    toast.error('Invalid Transaction ID');
                    setLoader(false);
                }
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    };

    useEffect(() => {
        let data = searchParams.get('txid');

        if (data) {
            getData();
        } else {
            setActiveStep(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const handleNext1 = () => {
        if (inputAmount > 0 && outputAmount > 0) {
            getMid();
        } else {
            toast.error('Please enter a valid amount');
        }
    };

    const handleNext = async () => {
        if (data) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            toast.error('Invalid Transaction');
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setData();
        setSearchParams();
    };

    return (
        <DataContext.Provider
            value={{
                //exchange type
                exchangeType,
                toggleExchangeType,
                // login signup
                loggedIn,
                handleLoggedIn,
                authToken,
                handleLoggedOut,
                isAdmin,
                //admin fee
                adminFee,
                setAdminFee,
                setFee,
                // appjs
                loader,
                setLoader,
                setCurrentTokenSelection,
                currentTokenSelection,
                setInputAmount,
                inputAmount,
                setOutputAmount,
                outputAmount,
                setRecipient,
                logo,
                setGlobalLogo,
                recipient,
                setSelectedToken,
                selectedToken,
                switchTokens,
                toggleList,
                openList,
                conversion,
                //stepper
                setActiveStep,
                activeStep,
                setData,
                data,
                handleNext1,
                handleNext,
                handleBack,
                getMid,
                // kyc modal
                kycModal,
                setKycModal,
                searchParams,
            }}
        >
            {callingForHelmet(logo)}
            {props.children}
        </DataContext.Provider>
    );
};

export default ContextAPI;
