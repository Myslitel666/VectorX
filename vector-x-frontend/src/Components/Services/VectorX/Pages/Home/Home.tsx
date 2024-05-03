//React Import
import React, { useEffect } from 'react';

//MyComponents Import
import { useUserContext } from '../../../../../Context/UserContext';
import Header from '../../../../Common/Header/Header';
import Courses from '../../Pages/Home/Courses'
import PopularCourses from '../../Pages/Home/PopularCourses'
import CoursesFilter from '../../Pages/Home/CoursesFilter'
import Box from '@mui/material/Box';

const Home: React.FC = () => {
    const { getUser, logoutUser } = useUserContext();
    const user = getUser();

    useEffect(() => {
        if (user.isBlocked) {
            logoutUser();
        }
    }, [user.isBlocked]);

    return (
        <>
            <Header />
            <Box sx={{
                marginTop: '4.75rem',
                marginBottom: '1.75rem'
            }}>
                <PopularCourses />
            </Box>
            <CoursesFilter />
            <Courses />
        </>
    );
};

export default Home;