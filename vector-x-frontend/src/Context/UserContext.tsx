//React Import
import React, { createContext, useContext, ReactNode, useState } from 'react';

type User = {
    userId: number;
    userRole: string;
    username: string;
}

export interface UserContextProps {
    setUser: (userId: number, userRole: string, username: string) => void;
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

    const getUser = (): User => {
        return {
            userId: userId,
            userRole: userRole,
            username: username,
        };
    };

    const setUser = (userId: number, userRole: string, username: string) => {
        setUserId(userId);
        localStorage.setItem('userId', userId.toString());
        setUserRole(userRole);
        localStorage.setItem('userRole', userRole);
        setUsername(username);
        localStorage.setItem('username', username);
    }

    const logoutUser = () => {
        setUser(-1, '', '')
    }

    const isLogged = (): boolean => {
        if (userId !== -1) {
            return true
        }
        return false;
    }

    const contextValue: UserContextProps = {
        setUser: setUser,
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
