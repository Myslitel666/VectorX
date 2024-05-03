//React Import
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//MyComponents Import
import EnglishAssistantHeader from '../../Common/EnglishAssistantHeader';
import Content from './Content';
import { HomeProvider } from './HomeContext'
import { useUserContext } from '../../../../../Context/UserContext';

const Home: React.FC = () => {
    //Работа с контекстом
    const { getUser, isLogged } = useUserContext();
    let user = getUser();

    const navigate = useNavigate();
    const location = useLocation();

    //Попытка получить доступ к контенту из адресной строки браузера
    //English Assistant Pro доступен только для зарегистрированных пользователей
    useEffect(() => {
        if (!isLogged()) {
            navigate('/auth');
        }
    }, [location.pathname, user.isBlocked]);

    return (
        <HomeProvider>
            <EnglishAssistantHeader />
            <Content/>
        </HomeProvider>
    );
};

export default Home;