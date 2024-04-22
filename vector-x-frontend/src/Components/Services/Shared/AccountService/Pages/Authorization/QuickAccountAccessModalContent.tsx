import React, { useState, useEffect } from 'react';

//MUI Import
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';

//MyComponents Import
import { ColorModeContextProps, useColorMode } from '../../../../../../Context/ColorModeContext'
import MyLink from '../../../../../Common/User Interface/MyLink';

export default function BasicModal() {

    interface User {
        username: string;
        role: string;
        avatar: string;
    }

    const theme = useTheme();
    const { themeMode, iconColor, defaultAvatars }: ColorModeContextProps = useColorMode();
    let defaultAvatarPath = themeMode === 'dark' ? defaultAvatars.dark : defaultAvatars.light;
    const [users, setUsers] = useState<User[]>([]);

    const apiUrl = process.env.REACT_APP_API_URL as string;

    async function getCachedUsers(userIds: number[]) {
        const response = await fetch(`${apiUrl}/api/auth/getCachedUsers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userIds: userIds,
            }),
        });

        const data = await response.json();
        setUsers(data.userDtos);
    };

    const addImagePrefix = (image: string) => {
        const subString = 'data:image/png;base64,';

        if (image.startsWith(subString)) {
            return image;
        }

        return subString + image;
    };

    // В некоторых случаях в качестве изображения передаётся строка 'null'
    const isNull = (image: string) => {
        if (image === null || image === 'null' || image === '') {
            return true;
        }

        return false;
    };

    useEffect(() => {
        const cachedUserIdsString = localStorage.getItem('cachedUserIds');

        // Проверяем, есть ли данные в localStorage по ключу 'cachedUserIds'
        if (cachedUserIdsString !== null) {
            // Преобразуем строку в массив
            const cachedUserIds: number[] = JSON.parse(cachedUserIdsString);

            getCachedUsers(cachedUserIds);
        }
    }, [])

    // Создаем массив состояний для каждого Box'а
    const [isHovered, setIsHovered] = useState(Array(users.length).fill(false));

    return (
        <>
            <Typography
                fontSize='1.65rem'
                marginTop='1rem'
                marginBottom='-0.75rem'
            >
                Quik Account Access
            </Typography>
            {users.map((user, index) => (
                <Box
                    key={index}
                    display='flex'
                    alignItems='center'
                    width='100%'
                    height='7.5rem'
                    margin='1.75rem auto 0'
                    border='1px solid'
                    borderColor={themeMode === 'light' ? '#cecece' : '#4d4d4d'}
                    borderRadius='0.6rem'
                    padding='0.66rem'

                    sx={{
                        cursor: 'pointer',
                        position: 'relative', // Для позиционирования значка DeleteIcon
                        '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                        },
                    }}

                    onMouseEnter={() => {
                        setIsHovered(prevState => prevState.map((value, i) => i === index ? true : value));
                    }}
                    onMouseLeave={() => {
                        setIsHovered(prevState => prevState.map((value, i) => i === index ? false : value));
                    }}
                >
                    <Avatar
                        alt="Avatar"
                        src={isNull(user.avatar) ? defaultAvatarPath : addImagePrefix(user.avatar)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '6rem',
                            height: '6rem'
                        }}
                    />
                    <Box
                        sx={{
                            marginLeft: '0.66rem',
                        }}
                    >
                        <Typography>
                            Username: {user.username}
                        </Typography>
                        <Typography>
                            Role: {user.role}
                        </Typography>
                        <Typography>
                            Password: ●●●●●●●●●
                        </Typography>
                    </Box>
                    {/* Значок корзины */}
                    <Tooltip
                        title='Clear'
                        arrow
                    >
                        <DeleteIcon
                            sx={{
                                display: isHovered[index] ? 'visible' : 'none',
                                color: iconColor,
                                position: 'absolute',
                                top: '50%',
                                right: '0',
                                transform: 'translateY(-50%)',
                                marginRight: '2.5rem',
                                fontSize: '1.66rem'
                            }}
                        />
                    </Tooltip>
                </Box>
            ))}
        </>
    );
}
