//React Import
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MyComponents Import
import Header from '../../../../Common/Header/Header';
import Content from './Content';
import { useUserContext } from '../../../../../Context/UserContext';

const Home: React.FC = () => {

    return (
        <>
            <Header />
            <Content />
        </>
    );
};

export default Home;