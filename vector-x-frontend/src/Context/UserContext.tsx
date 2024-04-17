//React Import
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type User = {
    userId: number;
    userRole: string;
    username: string;
    avatar: string
}

export interface UserContextProps {
    setUser: (userId: number, userRole: string, username: string, avatar: string) => void;
    updateUsername: (desiredUsername: string) => void;
    updateAvatar: (avatar: string) => void;
    getUser: () => User;
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

    const getUser = (): User => {
        return {
            userId: userId,
            userRole: userRole,
            username: username,
            avatar: avatar
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

    useEffect(() => {

    }, [avatar]);

    const logoutUser = () => {
        setUser(-1, '', '', '')
    }

    const isLogged = (): boolean => {
        if (userId !== -1) {
            return true
        }
        return false;
    }

    const contextValue: UserContextProps = {
        setUser: setUser,
        updateUsername: updateUsername,
        updateAvatar: updateAvatar,
        getUser: getUser,
        logoutUser: logoutUser,
        isLogged: isLogged
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
