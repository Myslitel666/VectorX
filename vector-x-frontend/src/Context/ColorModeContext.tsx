﻿import React, { createContext, useContext, useMemo, useState, ReactNode, useEffect } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material';
import '../../src/Font.css';

export interface ColorModeContextProps {
    //methods
    toggleColorMode: () => void;
    setThemeMode: (mode: 'light' | 'dark') => void;
    setPrimaryColor: (color: string) => void;
    //properies
    theme: Theme;
    themeMode: 'light' | 'dark';
    primaryColor: string;
    iconColor: string;
    defaultAvatars: {
        light: string,
        dark: string,
        courseLight: string,
        courseDark: string,
    }
}

const ColorModeContext = createContext<ColorModeContextProps | undefined>(undefined);

export const useColorMode = () => {
    const context = useContext(ColorModeContext);
    if (!context) {
        throw new Error('useColorMode must be used within a ColorModeProvider');
    }
    return context;
};

interface ColorModeProviderProps {
    children: ReactNode;
}

export const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children }) => {
    const [themeMode, setThemeModeState] = useState<'light' | 'dark'>(() => {
        const storedTheme = localStorage.getItem('themeMode');
        return (storedTheme as 'light' | 'dark') || 'light';
    });

    const [primaryColor, setPrimaryColorState] = useState<string>(() => {
        const storedColor = localStorage.getItem('primaryColor');
        return storedColor || '#5bb056';
    });

    const toggleColorMode = () => {
        setThemeModeState((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const setThemeMode = (mode: 'light' | 'dark') => {
        setThemeModeState(mode);
    };

    const setPrimaryColor = (color: string) => {
        localStorage.setItem('primaryColor', color);
        setPrimaryColorState(color);
    };

    const theme = useMemo(
        () =>
            createTheme({
                typography: {
                    fontFamily: 'MyFont, sans-serif',
                },
                palette: {
                    mode: themeMode,
                    primary: {
                        main: primaryColor,
                    },
                    text: {
                        primary: themeMode === 'light' ? '#000000' : '#FFFFFF',
                    },
                    background: {
                        default: themeMode === 'light' ? '#FFFFFF' : '#101010',
                    },
                    action: {
                        disabledBackground: themeMode === 'light' ? '#FFFFFF' : '#252525',
                    },
                    error: {
                        main: themeMode === 'light' ? '#d84040' : '#E10000',
                    }
                },
            }),
        [themeMode, primaryColor]
    );

    useEffect(() => {
        localStorage.setItem('themeMode', themeMode);
    }, [themeMode]);

    const defaultAvatars = {
        light: '/images/default-avatars/light.jpg',
        dark: '/images/default-avatars/dark.jpg',
        courseLight: '/images/default-avatars/course-light.png',
        courseDark: '/images/default-avatars/course-dark.png'
    }

    const iconColor = theme.palette.mode === 'dark' ? 'white' : '#5F5F5F';

    const contextValue = useMemo(() => {
        return {
            //methods
            toggleColorMode,
            setThemeMode,
            setPrimaryColor,
            //properties
            theme,
            themeMode,
            primaryColor,
            iconColor,
            defaultAvatars,
        };
    }, [themeMode, primaryColor]);

    return (
        <ColorModeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};
