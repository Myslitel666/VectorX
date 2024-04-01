//React Import
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MyComponents Import
import Header from '../../Common/Header/Header';
import Content from '../Home/Content';
import { HomeProvider } from '../Home/HomeContext'
import { useUserContext } from '../../../Context/UserContext';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    //Работа с контекстом
    const { isLogged } = useUserContext();

    useEffect(() => {
        if (location.pathname === '/home') {
            if (!isLogged()) {
                navigate('/auth');
            }
        }
    }, [location.pathname]);

    return (
        <HomeProvider>
            <Header />
            <Content/>
        </HomeProvider>
    );
};

export default Home;