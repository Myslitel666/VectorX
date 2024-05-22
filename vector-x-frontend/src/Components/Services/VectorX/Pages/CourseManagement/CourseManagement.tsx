//React Import
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MUI Import
import { Typography } from '@mui/material';

//MyComponents Import
import { useUserContext } from '../../../../../Context/UserContext';
import Header from '../../../../Common/Header/Header';
import Box from '@mui/material/Box';

const CourseManagement: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { getUser, logoutUser, isLogged } = useUserContext();
    const user = getUser();
    const managementCoursesRolesAccess = ['author', 'admin', 'teacher', 'moderator'];

    //Блокировка доступа к управлению курсами для непривилегированных пользователей
    useEffect(() => {
        if (!managementCoursesRolesAccess.includes(user.userRole)) {
            navigate('/profile');
        }
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
                    Course Management
                </Typography>
            </Box>
        </>
    );
};

export default CourseManagement;