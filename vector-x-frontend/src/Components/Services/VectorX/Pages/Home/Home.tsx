//React Import
import React, { useEffect } from 'react';

//MyComponents Import
import Header from '../../../../Common/Header/Header';
import Courses from '../../Pages/Home/Courses'
import PopularCourses from '../../Pages/Home/PopularCourses'
import CoursesFilter from '../../Pages/Home/CoursesFilter'
import { useUserContext } from '../../../../../Context/UserContext';

const Home: React.FC = () => {

    return (
        <>
            <Header />
            <CoursesFilter />
            <PopularCourses />
            <Courses />
        </>
    );
};

export default Home;