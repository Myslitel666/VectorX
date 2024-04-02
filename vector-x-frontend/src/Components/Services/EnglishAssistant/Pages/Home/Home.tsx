//React Import
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MyComponents Import
import EnglishAssistantHeader from '../../Common/EnglishAssistantHeader';
import Content from './Content';
import { HomeProvider } from './HomeContext'
import { useUserContext } from '../../../../../Context/UserContext';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    //Работа с контекстом
    const { isLogged } = useUserContext();

    //Попытка получить доступ к контенту из адресной строки браузера
    //English Assistant Pro доступен только для зарегистрированных пользователей
    useEffect(() => {
        if (location.pathname === '/english-assistant/home') {
            if (!isLogged()) {
                navigate('/auth');
            }
        }
    }, [location.pathname]);

    return (
        <HomeProvider>
            <EnglishAssistantHeader />
            <Content/>
        </HomeProvider>
    );
};

export default Home;