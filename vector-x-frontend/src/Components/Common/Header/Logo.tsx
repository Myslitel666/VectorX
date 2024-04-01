import React, { useState, useEffect } from 'react';
import './Logo.css';
import { useColorMode, ColorModeContextProps } from '../../../Context/ColorModeContext';
import { useColorLabel } from '../../../UseColorLabel';

const Logo = () => {
    const { getColorFromLabel, getLabelFromColor } = useColorLabel('green');
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { setPrimaryColor } = useColorMode();
    let defaultLogoPath = '';
    if (themeMode === 'light') defaultLogoPath = '/images/logo-light-green.png';
    else defaultLogoPath = '/images/logo-dark-red.png';

    const [oldLogoPath, setOldLogoPath] = useState(defaultLogoPath);
    const [newLogoPath, setNewLogoPath] = useState(defaultLogoPath);
    const [isThemeChanged, setIsThemeChanged] = useState(true);

    const handleClick = () => {
        if (themeMode === 'dark' && getLabelFromColor() !== 'red') {
            const currentColor = getColorFromLabel('red');
            setPrimaryColor(currentColor);
        } else if (themeMode === 'dark' && getLabelFromColor() === 'red') {
            const currentColor = getColorFromLabel('purple');
            setPrimaryColor(currentColor);
        } else if (themeMode === 'light' && getLabelFromColor() !== 'green') {
            const currentColor = getColorFromLabel('green');
            setPrimaryColor(currentColor);
        } else if (themeMode === 'light' && getLabelFromColor() === 'green') {
            const currentColor = getColorFromLabel('blue');
            setPrimaryColor(currentColor);
        }
    }

    const getLogoImage = () => {
        // Определите условия для выбора изображения в зависимости от значений
        // localStorage.getItem('themeMode') и localStorage.getItem('primaryColor')
        if (themeMode === 'light' && getLabelFromColor() === 'green') {
            return '/images/logo-light-green.png';
        } else if (themeMode === 'dark' && getLabelFromColor() === 'green') {
            return '/images/logo-dark-green.png';
        } else if (themeMode === 'light' && getLabelFromColor() === 'red') {
            return '/images/logo-light-red.png';
        } else if (themeMode === 'dark' && getLabelFromColor() === 'red') {
            return '/images/logo-dark-red.png';
        } else if (themeMode === 'light' && getLabelFromColor() === 'purple') {
            return '/images/logo-light-purple.png';
        } else if (themeMode === 'dark' && getLabelFromColor() === 'purple') {
            return '/images/logo-dark-purple.png';
        } else if (themeMode === 'light' && getLabelFromColor() === 'blue') {
            return '/images/logo-light-blue.png';
        } else if (themeMode === 'dark' && getLabelFromColor() === 'blue') {
            return '/images/logo-dark-blue.png';
        } else if (themeMode === 'light' && getLabelFromColor() === 'orange') {
            return '/images/logo-light-orange.png';
        } else if (themeMode === 'dark' && getLabelFromColor() === 'orange') {
            return '/images/logo-dark-orange.png';
        } else if (themeMode === 'light' && getLabelFromColor() === 'violet') {
            return '/images/logo-light-violet.png';
        } else if (themeMode === 'dark' && getLabelFromColor() === 'violet') {
            return '/images/logo-dark-violet.png';
        } else if (themeMode === 'light' && getLabelFromColor() === 'light green') {
            return '/images/logo-light-light-green.png';
        } else if (themeMode === 'dark' && getLabelFromColor() === 'light green') {
            return '/images/logo-dark-light-green.png';
        } else {
            // Вернуть значение по умолчанию или для других условий
            return '/images/logo-light-green.png';
        }
    };

    useEffect(() => {
        const currentLogoPath = getLogoImage();

        const delayedUpdate = () => {
            const delay = 1; // задержка в миллисекундах

            setTimeout(() => {
                if (newLogoPath !== currentLogoPath) {
                    setOldLogoPath(newLogoPath);
                    setNewLogoPath(currentLogoPath);
                    setIsThemeChanged(!isThemeChanged);
                }
            }, delay);
        };

        delayedUpdate();
    }, [themeMode, getLabelFromColor]);

    return (
        <div onClick={handleClick}
            className={`logo`} style={{ cursor: 'pointer' }}>
                <img
                    className={`image ${isThemeChanged ? '' : 'hidden'}`}
                    src={`${isThemeChanged ? oldLogoPath : newLogoPath}`}
                    alt="Store Icon"
                    style={{ width: '100%'}}
                />
                <img
                    className={`image ${isThemeChanged ? 'hidden' : ''}`}
                    src={`${isThemeChanged ? newLogoPath : oldLogoPath}`}
                    alt="Store Icon"
                    style={{ width: '100%' }}
                />
        </div>
    );
};

export default Logo;
