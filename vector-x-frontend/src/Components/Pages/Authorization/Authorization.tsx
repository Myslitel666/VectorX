//React Import
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

//MyComponents Import
import MyTypography from '../../Common/MyTypography'
import Header from '../../Common/Header/Header';
import MyButton from '../../Common/MyButton';
import MyLink from '../../Common/MyLink';
import { useColorLabel } from '../../../UseColorLabel';
import PasswordTextField from '../../Common/PasswordTextField'
import { useUserContext } from '../../../Context/UserContext';

const Authorization: React.FC = () => {
    const theme = useTheme();
    const [username, setUsername] = useState('aaa');
    const [password, setPassword] = useState('aaaaaa1');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isError, setIsError] = useState(true);
    const { getColorFromLabel } = useColorLabel('green');
    const KeyIconColor = theme.palette.background.default;
    const borderBoxColor = theme.palette.action.disabled;
    const navigate = useNavigate();
    const location = useLocation();

    //Работа с контекстом
    const { setUser, logoutUser } = useUserContext();

    const apiUrl = process.env.REACT_APP_API_URL as string;

    const updateFeedbackMessage = (isError: boolean, message: string) => {
        setIsError(isError);
        setFeedbackMessage(message);
    };

    async function signIn() {
        const response = await fetch(`${apiUrl}/api/auth/findUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
        if (location.pathname === '/auth') {
            logoutUser();
        }
    }, [location.pathname]);

    const handleAuthoriazation = () => {
        if (username === '') updateFeedbackMessage(true, '✗Enter the "Username"')
        else if (password === '') updateFeedbackMessage(true, '✗Enter the "Password"')
        else {
            signIn();
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
                    <LockIcon style={{
                            fill: KeyIconColor,
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
                    Authorization
                </MyTypography>
                <Typography sx={{
                    textAlign: 'left',
                    color: isError ? getColorFromLabel('red') : getColorFromLabel('green'),
                }}
                >
                    {feedbackMessage}
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
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                defaultChecked
                                sx={{
                                    transition: 'background-color 1s ease, color 1s ease, border-color 1s ease'
                                }}
                            />
                        }
                        label=''
                    />
                    <Typography sx={{marginLeft: '-1.4rem', fontSize: '0.8rem'}}>
                        Remember me
                    </Typography>
                </Box>
                <MyButton
                    variant="contained"
                    onClick={handleAuthoriazation}
                    sx={{
                        width: '100%',
                        height: '3.6rem',
                        transition: 'background-color 1s ease',
                        marginTop: '0rem',
                    }}
                >
                    <Typography
                        fontSize='1.12rem'
                    >
                        SIGN IN
                    </Typography>
                </MyButton>
                <Typography
                    fontSize='0.75rem'
                    sx={{
                        marginTop: '0.9rem',
                        marginBottom: '1rem',
                    }}
                >
                    Don't have an account yet?
                    <MyLink
                        fontSize='0.75rem'
                        marginLeft='0.25rem'
                        href='/reg'
                    >
                        Sign up
                    </MyLink>
                </Typography>
            </Box>
        </>
    )
}

export default Authorization