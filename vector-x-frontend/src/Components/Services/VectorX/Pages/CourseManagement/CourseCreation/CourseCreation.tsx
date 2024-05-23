//React Import
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArticleIcon from '@mui/icons-material/Article';
import GavelIcon from '@mui/icons-material/Gavel';

//MyComponents Import
import { ColorModeContextProps, useColorMode } from '../../../../../../Context/ColorModeContext';
import { useColorLabel } from '../../../../../../Context/UseColorLabel';
import { useUserContext } from '../../../../../../Context/UserContext';
import Header from '../../../../../Common/Header/Header';
import CourseImageUploading from './CourseImageUploading';

const CourseCreation: React.FC = () => {

    //Context
    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { getColorFromLabel } = useColorLabel('red');
    const navigate = useNavigate();
    const location = useLocation();
    const { getUser, isLogged } = useUserContext();
    const user = getUser();
    const managementCoursesRolesAccess = ['admin', 'teacher', 'moderator']

    const isDesktop = useMediaQuery({ minWidth:900 });

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
            <Box 
                padding = {isDesktop ? '4.75rem 4.75rem 0rem 4.75rem' : '4.75rem 0rem 0rem 0rem'}
            >
                <Typography 
                    fontSize='2.25rem'
                    marginBottom='0.25rem'
                    marginLeft = {isDesktop ? '0rem' : '1rem'}
                >
                    Course Creation
                </Typography>
                <Box
                    display={isDesktop ? 'flex' : 'flow'}
                >
                    <Box>
                        <Box 
                            sx={{ 
                                marginTop: '0.5rem',
                            }}
                        >
                            <CourseImageUploading />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default CourseCreation;