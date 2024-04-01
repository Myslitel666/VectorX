//React Import
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import KeyIcon from '../Registration/RegistrationIco'
import { useTheme } from '@mui/material';

//MyComponents Import
import MyTypography from '../../Common/MyTypography'
import Header from '../../Common/Header/Header';
import MyButton from '../../Common/MyButton';
import MyLink from '../../Common/MyLink';
import { useColorLabel } from '../../../UseColorLabel';
import PasswordTextField from '../../Common/PasswordTextField'
import { useUserContext } from '../../../Context/UserContext';

const Registration: React.FC = () => {
    const theme = useTheme();
    const keyIconColor = theme.palette.background.default;
    const borderBoxColor = theme.palette.action.disabled;
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [username, setUsername] = useState('aaa');
    const [password, setPassword] = useState('aaaaaa1');
    const [confirmPassword, setConfirmPassword] = useState('aaaaaa1');
    const navigate = useNavigate();
    const location = useLocation();

    const [isError, setIsError] = useState(true);
    const { getColorFromLabel } = useColorLabel('green');

    //Работа с контекстом
    const { setUser, logoutUser } = useUserContext();

    const apiUrl = process.env.REACT_APP_API_URL as string;

    const updateFeedbackMessage = (isError: boolean, message: string) => {
        setIsError(isError);
        setFeedbackMessage(message);
    };

    async function signUp() {
        const response = await fetch(`${apiUrl}/api/reg/setUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role: 'learner',
                username: username,
                password: password,
            }),
        });

        const data = await response.json();
        updateFeedbackMessage(data.isError, data.feedbackMessage);

        if (!data.isError) {
            setTimeout(() => {
                setUser(data.user.userId, data.user.role, data.user.username);
            }, 500);
        }
    };

    useEffect(() => {
        if (isError === false) {
            // Выполнить переход после успешной регистрации
            const timeoutId = setTimeout(() => {
                navigate('/home');
            }, 500);

            // Очистить таймаут, чтобы избежать утечек при размонтировании компонента
            return () => clearTimeout(timeoutId);
        }
    }, [isError]);

    useEffect(() => {
        if (location.pathname === '/reg') {
            logoutUser();
        }
    }, [location.pathname]);

    function hasDigits(str: string) {
        return /\d/.test(str);
    }

    const handleRegistration = () => {
        if (username === '') updateFeedbackMessage(true, '✗Enter the "Username"')
        else if (password === '') updateFeedbackMessage(true, '✗Enter the "Password"')
        else if (confirmPassword === '') updateFeedbackMessage(true, '✗Enter the "Confirm Password"')
        else if (password.length < 6) updateFeedbackMessage(true, '✗The password must be at least 6 characters long')
        else if (!hasDigits(password)) updateFeedbackMessage(true, '✗The password must contain letters and numbers')
        else if (password !== confirmPassword) updateFeedbackMessage(true, '✗The password and confirmation password do not match')
        else {
            signUp();
        }
    };

    return (
        <>
            <Header/>
            <Box
                width='23.5rem'
                margin='8rem auto 0'
                border='1px solid'
                borderColor={`${borderBoxColor}`}
                borderRadius='2rem'
                textAlign='center'
                paddingLeft='1rem'
                paddingRight='1rem'
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    margin='1rem auto'
                    width="4.75rem"
                    height="4.75rem"
                    borderRadius="50%"
                    bgcolor="primary.main"
                    sx={{ transition: 'background-color 1s ease' } }
                >
                    <KeyIcon style={{
                            fill: keyIconColor,
                            width: '2.88rem',
                            height: '2.88rem'
                        }}
                    />
                </Box>

                <MyTypography
                    marginTop='-0.7rem'
                    fontSize='1.66rem'
                    color='primary.main'
                >
                    Registration Form
                </MyTypography>
                <Typography sx={{
                        textAlign: 'left',
                    color: isError ? getColorFromLabel('red') : getColorFromLabel('green'),
                    }}
                >
                    { feedbackMessage }
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    sx={{
                        width: '100%',
                        marginTop: '0.6rem'
                    }}
                />
                <PasswordTextField
                    externalPassword={password}
                    setExternalPassword={setPassword}
                    containerSx={{ width: '100%', marginTop: '1rem' }}
                />
                <PasswordTextField
                    externalPassword={confirmPassword}
                    setExternalPassword={setConfirmPassword}
                    containerSx={{ width: '100%', marginTop: '1rem' }}
                />
                <MyButton
                    variant="contained"
                    onClick={handleRegistration}
                    sx={{
                        width: '100%',
                        height: '3.6rem',
                        transition: 'background-color 1s ease',
                        marginTop: '1rem',
                    }}
                >
                    <Typography
                        fontSize='1.12rem'
                    >
                        Create Account
                    </Typography>
                </MyButton>
                <Typography
                    fontSize='0.75rem'
                    sx={{
                        marginTop: '0.9rem',
                        marginBottom: '1rem',
                    }}
                >
                    Already have an account? 
                    <MyLink
                        fontSize='0.75rem'
                        marginLeft='0.25rem'
                        href='/auth'
                    >
                        Sign in
                    </MyLink>
                </Typography>
            </Box>
        </>
    )
}

export default Registration