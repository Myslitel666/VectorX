//React Import
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
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
import MyTypography from '../../../../../Common/User Interface/MyTypography';
import MyAutoComplete from '../../../../../Common/User Interface/MyAutoComplete';
import MyInputBase from '../../../../../Common/User Interface/MyInputBase';
import MyButton from '../../../../../Common/User Interface/MyButton';
import Stepper from './Stepper';

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

    const fieldSelectionDropList = [
        { title: 'Username' },
        { title: 'Password' },
    ]

    const CourseCreationTypography = (typography: string) => {
        return(
            <Typography
                sx={{
                    fontSize: '2rem',
                    float: 'left',
                    marginLeft: isDesktop ? '2rem' : '0.25rem',
                    marginRight: '0.5rem',
                    whiteSpace: 'nowrap', // Запрещает перенос текста
                    minWidth: '14rem',
                    '@media screen and (max-width:1200px)': {
                        fontSize: '1.75rem',
                        minWidth: '12.25rem',
                    },
                    '@media screen and (max-width:1000px)': {
                        fontSize: '1.5rem',
                        minWidth: '10.5rem',
                    },
                }}
            >
                {typography}
            </Typography>
        )
    }

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
                padding = '4.75rem 4.75rem 0rem 4.75rem'
                sx = {{
                    '@media screen and (max-width:1100px)': {
                        padding: '4.75rem 0.5rem 0rem 0.5rem'
                    },
                }}
            >
                <Typography 
                    fontSize='2.25rem'
                    marginBottom='0.25rem'
                    marginLeft = {isDesktop ? '0rem' : '0.25rem'}
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
                    <Box width = '100%'>
                        <Box 
                            display = 'flex'
                            marginTop = {isDesktop ? '0.75rem' : '9.45rem'}
                        >
                            {isDesktop && 
                                CourseCreationTypography('Course Name:')
                            }
                            <TextField
                                id="outlined-basic"
                                label={isDesktop ? 'Course' : 'Course Name'}
                                variant="outlined"
                                //onChange={(e) => setUsername(e.target.value)}
                                //value={username}
                                sx={{
                                    width: '100%'
                                }}
                            />
                        </Box>
                        <Box 
                            display = 'flex'
                            marginTop = '0.75rem'
                        >
                            {isDesktop && 
                                CourseCreationTypography('Subject:')
                            }
                            <MyAutoComplete
                                dropList={fieldSelectionDropList}
                                size='medium'
                                label='Subject'
                                sx={{
                                    width: '100%'
                                }}
                            />
                        </Box>
                        <Box 
                            display = 'flex'
                            marginTop = '0.75rem'
                        >
                            {isDesktop && 
                                CourseCreationTypography('Description:')
                            }
                            <MyInputBase
                                multiline
                                rows={8.5}
                                placeholder='Description'
                                //value={exampleOfUse}
                                //onChange={(e) => setExampleOfUse(e.target.value)}
                                maxLength={5000}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem'
                                }}
                            />
                        </Box>
                        <Box 
                            display = 'flex'
                            marginTop = '0.75rem'
                            marginBottom = '0.75rem'
                        >
                            {isDesktop && 
                                CourseCreationTypography('Price:')
                            }
                            <TextField
                                id="outlined-basic"
                                label='Price'
                                variant="outlined"
                                //onChange={(e) => setUsername(e.target.value)}
                                //value={username}
                                sx={{
                                    width: '49%',
                                    marginRight: '0.5rem'
                                }}
                            />
                            <MyButton
                                variant='contained'
                                sx = {{
                                    width: '49%'
                                }}
                            >
                                Next Step
                            </MyButton>
                        </Box>
                    </Box>
                </Box>
                <Box marginTop='1.75rem'>
                    <Stepper step={0}/>
                </Box>
            </Box>
        </>
    );
};

export default CourseCreation;