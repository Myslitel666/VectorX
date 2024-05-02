//React Import
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type User = {
    userId: number;
    userRole: string;
    username: string;
    avatar: string;
    browserId: string;
}

export interface UserContextProps {
    //methods
    getUser: () => User;
    setUser: (userId: number, userRole: string, username: string, avatar: string) => void;
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

    const [browserId, setBrowserId] = useState(getBrowserId());

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const wsUrl = process.env.REACT_APP_WS_URL as string;

    const getUser = (): User => {
        return {
            userId: userId,
            userRole: userRole,
            username: username,
            avatar: avatar,
            browserId: browserId
        };
    };

    const setUser = (userId: number, userRole: string, username: string, avatar: string) => {
        setUserId(userId);
        localStorage.setItem('userId', userId.toString());
        setUserRole(userRole);
        localStorage.setItem('userRole', userRole);
        updateUsername(username);
        updateAvatar(avatar);
    }

    const updateUsername = (username: string) => {
        setUsername(username);
        localStorage.setItem('username', username);
    }

    const updateAvatar = async (avatar: string) => {
        setAvatar(avatar);
        localStorage.setItem('avatar', avatar);
    };

    const logoutUser = () => {
        setUser(-1, '', '', '')
    }

    const isLogged = (): boolean => {
        if (userId !== -1) {
            return true
        }
        return false;
    }

    useEffect(() => {
        // Проверяем, авторизован ли пользователь
        if (userId !== -1 && userId !== 0) {
            // Открываем WebSocket с указанным URL
            const url = `${wsUrl}/connect`;
            const newSocket = new WebSocket(url);
            setSocket(newSocket); // Устанавливаем новый сокет в состояние

            newSocket.onopen = () => {
                console.log('WebSocket connected');
            };
 
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
            console.log('WebSocket connected');
            socket.send(userId.toString());
        };
        
        socket.onmessage = (event) => {
            // Получаем данные от сервера и обновляем состояние
            const userData = JSON.parse(event.data);
            console.log('Данные пришли');
            console.log(userData);
            console.log('browserId: ' + browserId);
            setUser(userData.UserId, userData.Role, userData.Username, userData.Avatar);
            socket.send(userId.toString());
        };

        // socket.onerror = (event) => {
        //     console.error('WebSocket error:', event);
        //     // Здесь вы можете принять решение о повторном подключении или другие действия
        //   };

        socket.onclose = (event) => {
            console.log('WebSocket closed');
            console.log(event);
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