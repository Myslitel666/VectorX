﻿//React Import
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//MUI Import
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';

//MyComponents Import
import { ColorModeContextProps, useColorMode } from '../../../../../../Context/ColorModeContext';
import { useUserContext } from '../../../../../../Context/UserContext';
import MyButton from '../../../../../Common/User Interface/MyButton';

const Content: React.FC<({ setOpen: React.Dispatch<React.SetStateAction<boolean>> })> = ({ setOpen }) => {

    interface User {
        userId: number;
        username: string;
        role: string;
        avatar: string;
    }

    const theme = useTheme();
    const { themeMode, iconColor, defaultAvatars }: ColorModeContextProps = useColorMode();
    const { setUser, logoutUser } = useUserContext();
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    let defaultAvatarPath = themeMode === 'dark' ? defaultAvatars.dark : defaultAvatars.light;

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

    // Создаем функцию для обработки клика на иконку корзины
    const handleDeleteIconClick = (userId: number) => {
        // Извлекаем данные из localStorage
        const cachedUserIdsString = localStorage.getItem('cachedUserIds');

        // Проверяем, есть ли данные в localStorage по ключу 'cachedUserIds'
        if (cachedUserIdsString !== null) {
            // Преобразуем строку в массив
            const cachedUserIds: number[] = JSON.parse(cachedUserIdsString);
            const updatedCachedUserIds = cachedUserIds.filter(id => id !== userId);

            // Обновляем данные в localStorage
            localStorage.setItem('cachedUserIds', JSON.stringify(updatedCachedUserIds));
        }

        updateCachedUsers();
    };

    // Создаем функцию для обработки клика на иконку корзины
    const updateCachedUsers = () => {
        const cachedUserIdsString = localStorage.getItem('cachedUserIds');

        // Проверяем, есть ли данные в localStorage по ключу 'cachedUserIds'
        if (cachedUserIdsString !== null) {
            // Преобразуем строку в массив
            const cachedUserIds: number[] = JSON.parse(cachedUserIdsString);

            getCachedUsers(cachedUserIds);
        }
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

    useEffect(() => {
        setIsHoveredBox(Array(users.length).fill(false));
        setIsHoveredClear(false);
    }, [users])

    // Создаем массив состояний для каждого Box'а
    const [isHoveredBox, setIsHoveredBox] = useState(Array(users.length).fill(false));
    const [isHoveredClear, setIsHoveredClear] = useState(false);

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
                        setIsHoveredBox(prevState => prevState.map((value, i) => i === index ? true : value));
                    }}
                    onMouseLeave={() => {
                        setIsHoveredBox(prevState => prevState.map((value, i) => i === index ? false : value));
                    }}
                    onClick={() => {
                        if (!isHoveredClear) {
                            setUser(user.userId, user.role, user.username, user.avatar);
                            navigate('/home');
                        }
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
                        sx={{
                            display: isHoveredBox[index] ? 'visible' : 'none',
                        }}
                    >
                        <DeleteIcon
                            sx={{
                                color: iconColor,
                                position: 'absolute',
                                top: '50%',
                                right: '0',
                                transform: 'translateY(-50%)',
                                marginRight: '2.5rem',
                                fontSize: '1.66rem'
                            }}
                            onMouseEnter={() => {
                                setIsHoveredClear(true);
                            }}
                            onMouseLeave={() => {
                                setIsHoveredClear(false);
                            }}
                            onClick={() => handleDeleteIconClick(user.userId)} // Передаем userId при клике
                        />
                    </Tooltip>
                </Box>
            ))}
            {users.length === 0 &&
                <>
                    <Typography
                        fontSize='1rem'
                        marginTop='1.5rem'
                        marginBottom='1rem'
                    >
                        Your saved accounts will be displayed here.
                </Typography>
                <Box
                    display='flex'
                    justifyContent='center'
                >
                    <MyButton
                        variant='contained'
                        size="large"
                        sx={{
                            height: '3.4rem',
                            width: '10rem',
                            marginBottom: '-0.4rem'
                        }}
                        onClick={() => { setOpen(false) }}
                    >
                        OK, Accept
                    </MyButton>
                    </Box>
                </>
            }
        </>
    );
}

export default Content;
