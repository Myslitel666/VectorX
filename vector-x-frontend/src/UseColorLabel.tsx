import { useState, useEffect } from 'react';
import { useColorMode, ColorModeContextProps } from '../src/Context/ColorModeContext';

export const useColorLabel = (initialLabel: string) => {
    const { themeMode, primaryColor }: ColorModeContextProps = useColorMode();

    //Преобразование метки в цвет
    const getColorFromLabel = (label: string): string => {
        if (themeMode === 'dark' && label === 'green') {
            return '#1cc841';
        } else if (themeMode === 'light' && label === 'green') {
            return '#5bb056';
        } else if (themeMode === 'dark' && label === 'red') {
            return '#cc0000';
        } else if (themeMode === 'light' && label === 'red') {
            return '#d84040';
        } else if (themeMode === 'dark' && label === 'purple') {
            return '#e03def';
        } else if (themeMode === 'light' && label === 'purple') {
            return '#9f59a5';
        } else if (themeMode === 'dark' && label === 'blue') {
            return '#1e45c5';
        } else if (themeMode === 'light' && label === 'blue') {
            return '#466ccc';
        } else if (themeMode === 'dark' && label === 'orange') {
            return '#ffc924';
        } else if (themeMode === 'light' && label === 'orange') {
            return '#eccb7a';
        } else if (themeMode === 'dark' && label === 'violet') {
            return '#951cf4';
        } else if (themeMode === 'light' && label === 'violet') {
            return '#9450c9';
        } else if (themeMode === 'dark' && label === 'light green') {
            return '#bcff2d';
        } else if (themeMode === 'light' && label === 'light green') {
            return '#aac06f';
        } else {
            // Вернуть значение по умолчанию или для других условий
            return '#5bb056';
        }
    };

    //Получение метки по текущему цвету
    const getLabelFromColor = (): string => {
        if (primaryColor === '#2ef824' || primaryColor === '#5bb056') {
            return 'green';
        } else if (primaryColor === '#cc0000' || primaryColor === '#d84040') {
            return 'red';
        } else if (primaryColor === '#e03def' || primaryColor === '#9f59a5') {
            return 'purple';
        } else if (primaryColor === '#1e45c5' || primaryColor === '#466ccc') {
            return 'blue';
        } else if (primaryColor === '#ffc924' || primaryColor === '#eccb7a') {
            return 'orange';
        } else if (primaryColor === '#951cf4' || primaryColor === '#9450c9') {
            return 'violet';
        } else if (primaryColor === '#bcff2d' || primaryColor === '#aac06f') {
            return 'light green';
        } else {
            // Вернуть значение по умолчанию или для других условий
            return 'green';
        }
    };

    return { getColorFromLabel, getLabelFromColor };
};