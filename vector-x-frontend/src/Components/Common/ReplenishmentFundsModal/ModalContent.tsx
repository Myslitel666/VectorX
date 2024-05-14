//React Import
import React, { useState } from 'react';

//MUI Import
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

//MyComponents Import
import { ColorModeContextProps, useColorMode } from '../../../Context/ColorModeContext';
import { useColorLabel } from '../../../Context/UseColorLabel';

const Content: React.FC<({ setOpen: React.Dispatch<React.SetStateAction<boolean>> })> = ({ setOpen }) => {

    const theme = useTheme();
    const { themeMode }: ColorModeContextProps = useColorMode();
    const { getColorFromLabel } = useColorLabel('red');

    //Redux
    const paymentMethod = [
        {
            userId: 1,
            username: 'Svelte.dev',
            userRole: 'learner',
            avatar: 'images/testCourses/csharp.png',
        },
        {
            userId: 2,
            username: 'Svelte.dev',
            userRole: 'learner',
            avatar: 'images/testCourses/c++.png',
        },
    ]

    // Создаем массив состояний для каждого Box'а
    const [, setIsHoveredBox] = useState(Array(paymentMethod.length).fill(false));
    const [boxStates] = useState<Array<{ lastClickedTime: Date | null; errorMessage: string }>>(
        Array(paymentMethod.length).fill({ lastClickedTime: null, errorMessage: '' })
    );
    

    return (
        <>
            <Typography
                fontSize='1.65rem'
                marginTop='-1rem'
                marginBottom='-0.75rem'
            >
                Payment Method
            </Typography>
            {paymentMethod.map((user, index) => (
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

                    }}
                >
                    <Avatar
                        alt="Avatar"
                        src={user.avatar}
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
                        {boxStates[index].errorMessage &&
                            <Typography sx={{
                                color: getColorFromLabel('red'),
                            }}
                            >
                                {boxStates[index].errorMessage}
                            </Typography>
                        }
                        <Typography>
                            Username: {user.username}
                        </Typography>
                        <Typography>
                            Role: {user.userRole}
                        </Typography>
                        <Typography>
                            Password: ●●●●●●●●●
                        </Typography>
                    </Box>
                </Box>
            ))}
        </>
    );
}

export default Content;