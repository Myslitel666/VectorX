//React Import
import React, { useEffect } from 'react';

//MyComponents Import
import Header from '../../../../Common/Header/Header';
import Courses from '../../Pages/Home/Courses'
import PopularCourses from '../../Pages/Home/PopularCourses'
import CoursesFilter from '../../Pages/Home/CoursesFilter'
import Box from '@mui/material/Box';
import { useUserContext } from '../../../../../Context/UserContext';

const Home: React.FC = () => {

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