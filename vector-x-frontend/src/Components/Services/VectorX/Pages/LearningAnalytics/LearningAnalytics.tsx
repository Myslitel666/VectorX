//React Import
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
import { Typography } from '@mui/material';

//MyComponents Import
import { useUserContext } from '../../../../../Context/UserContext';
import Header from '../../../../Common/Header/Header';
import Box from '@mui/material/Box';

const LearningAnalytics: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { getUser, isLogged } = useUserContext();
    const user = getUser();

    //Попытка получить доступ к контенту из адресной строки браузера
    //Learning Analytics доступен только для зарегистрированных пользователей
    useEffect(() => {
        if (!isLogged()) {
            navigate('/auth');
        }
    }, [location.pathname, user.isBlocked]);

    return (
        <>
            <Header />
            <Box sx={{
                marginTop: '4.75rem',
                marginBottom: '1.75rem'
            }}>
                <Typography fontSize='5rem'>
                    Learning Analytics
                </Typography>
            </Box>
        </>
    );
};

export default LearningAnalytics;