//React Import
import React, { useEffect, useState } from 'react';

//MUI Import
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

//MyComponents Import
import { useUserContext } from '../../../Context/UserContext';
import { useColorMode, ColorModeContextProps } from '../../../Context/ColorModeContext';

export default function NestedList() {
    const { themeMode, defaultAvatars }: ColorModeContextProps = useColorMode();
    const { getUser } = useUserContext();
    let user = getUser();
    let defaultAvatarPath = themeMode === 'dark' ? defaultAvatars.dark : defaultAvatars.light;

    const addImagePrefix = (image: string) => {
        const subString = 'data:image/png;base64,';

        if (image.startsWith(subString)) {
            return image;
        }

        return subString + image;
    };

    useEffect(() => {
        console.log(user.userId);
        console.log(user.avatar);
    }, []);

    return (
        <>
            <Avatar
                alt="Avatar"
                src={user.avatar ? addImagePrefix(user.avatar) : defaultAvatarPath }
                sx={{
                    left: '-0.3rem'
                }}
            />
        </>
    );
}