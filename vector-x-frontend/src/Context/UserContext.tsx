//React Import
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

//Interfaces Import
import { User } from '../Components/Services/Shared/AccountService/Interfaces/Interfaces'

export interface UserContextProps {
    //methods
    getUser: () => User;
    setUser: (user: User) => void;
    updateUsername: (desiredUsername: string) => void;
    updateAvatar: (avatar: string) => void;
    logoutUser: () => void;
    isLogged: () => boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const storedUserId = localStorage.getItem('userId');
    const parsedUserId = storedUserId ? parseInt(storedUserId) : -1;
    const [userId, setUserId] = useState(parsedUserId);

    const storedUserRole = localStorage.getItem('userRole');
    const [userRole, setUserRole] = useState(storedUserRole ? storedUserRole : '');

    const storedUsername = localStorage.getItem('username');
    const [username, setUsername] = useState(storedUsername ? storedUsername : '');

    const storedAvatar = localStorage.getItem('avatar');
    const [avatar, setAvatar] = useState(storedAvatar ? storedAvatar : '');

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const wsUrl = process.env.REACT_APP_WS_URL as string;

    const [isBlocked, setIsBlocked] = useState(false);
    const [browserId, ] = useState(getBrowserId());

    const storedBalance = localStorage.getItem('balance');
    const parsedBalance = storedBalance ? parseInt(storedBalance) : 0;
    const [balance, setBalance] = useState(parsedBalance);

    const getUser = (): User => {
        return {
            userId: userId,
            userRole: userRole,
            username: username,
            avatar: avatar,
            browserId: browserId,
            isBlocked: isBlocked,
            balance: balance
        };
    };

    const setUser = (user: User) => {
        setUserId(user.userId);
        localStorage.setItem('userId', user.userId.toString());
        setUserRole(user.userRole);
        localStorage.setItem('userRole', user.userRole);
        updateUsername(user.username);
        updateAvatar(user.avatar);
        setIsBlocked(user.isBlocked);
        updateBalance(user.balance);
    }

    const updateUsername = (username: string) => {
        setUsername(username);
        localStorage.setItem('username', username);
    }

    const updateAvatar = async (avatar: string) => {
        setAvatar(avatar);
        localStorage.setItem('avatar', avatar);
    };

    const updateBalance = async (balance: number) => {
        setBalance(balance);
        localStorage.setItem('balance', balance.toString());
    };

    const logoutUser = () => {
        const user = {userId: -1, username: '', userRole: '', avatar: '', isBlocked: false, balance: 0}
        setUser(user)
    }

    const isLogged = (): boolean => {
        if (userId !== -1 && isBlocked !== true) {
            return true
        }
        return false;
    }

    const sendConnectionData = () => {
        //Отправляем данные о соединении
        const userConnectionInfo = {
            UserId: userId,
            BrowserId: browserId,
        }
        const jsonData = JSON.stringify(userConnectionInfo);
        if (socket) {
            socket.send(jsonData);
        }
    }

    useEffect(() => {
        // Проверяем, авторизован ли пользователь
        if (userId !== -1 && userId !== 0 && isBlocked !== true) {
            // Открываем WebSocket с указанным URL
            const url = `${wsUrl}/connect`;
            const newSocket = new WebSocket(url);
            setSocket(newSocket); // Устанавливаем новый сокет в состояние

            newSocket.onopen = () => { };
 
            return () => {
                if (newSocket) {
                    if (newSocket.readyState === WebSocket.OPEN) {
                        // Закрываем сокет только если он был успешно открыт
                        newSocket.close();
                    }
                } 
            };
        }
    }, [userId]);
 
    useEffect(() => {
    if (socket) {
        socket.onopen = () => {
            //Отправляем данные о соединении на сервер
            sendConnectionData();
        };
        
        socket.onmessage = (event) => {
            // Получаем данные от сервера и обновляем состояние
            const userData = JSON.parse(event.data);
            const user = {
                userId: userData.UserId,
                username: userData.Username,
                userRole: userData.UserRole,
                avatar: userData.Avatar,
                isBlocked: userData.IsBlocked,
                balance: userData.Balance
            }
            setUser(user);

            //Отправляем данные о соединении на сервер
            sendConnectionData();
        };

        socket.onclose = (event) => {
            console.log('WebSocket closed');
        };
    }
    }, [socket]);

    const contextValue: UserContextProps = {
        setUser: setUser,
        updateUsername: updateUsername,
        updateAvatar: updateAvatar,
        getUser: getUser,
        logoutUser: logoutUser,
        isLogged: isLogged,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

const getBrowserId = (): string  => {
    let browserId = localStorage.getItem('browserId');
    
    if (browserId === null) {
        localStorage.setItem('browserId', navigator.userAgent)
        browserId = navigator.userAgent;
    }

    return browserId;
};