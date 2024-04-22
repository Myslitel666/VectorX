import React, { useState } from 'react';

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
    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { iconColor }: ColorModeContextProps = useColorMode();

    // Массив пользователей с информацией о username, role и avatars
    const users = [
        { username: 'React.dev', role: 'learner', avatars: '/images/testCourses/react.png' },
        { username: 'Svelte.dev', role: 'learner', avatars: '/images/testCourses/svelte.png' },
        { username: 'Admin', role: 'admin', avatars: '/images/default-avatars/light.jpg' },
        { username: 'Python Master', role: 'master', avatars: '/images/testCourses/python.png' },
        { username: 'Desmos Master', role: 'master', avatars: '/images/testCourses/desmos.png' }
    ];

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
                        src={user.avatars}
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
