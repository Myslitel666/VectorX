//React Import
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
import { useColorLabel } from '../../../../../../Context/UseColorLabel';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store
import { setStoredUsers } from '../../../../../../Store/slices/cachedUsersSlice'; // Action Import

//fetch import
import { getCachedUsers } from './fetch/getCachedUsers';

const Content: React.FC<({ setOpen: React.Dispatch<React.SetStateAction<boolean>> })> = ({ setOpen }) => {

    const theme = useTheme();
    const { themeMode, iconColor, defaultAvatars }: ColorModeContextProps = useColorMode();
    const { setUser } = useUserContext();
    const navigate = useNavigate();
    let defaultAvatarPath = themeMode === 'dark' ? defaultAvatars.dark : defaultAvatars.light;
    const { getColorFromLabel } = useColorLabel('red');

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const users = useSelector((state: RootState) => state.cachedUsers.users);

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

            getCachedUsers(cachedUserIds)
                .then(users => {
                    dispatch(setStoredUsers(users));
                });
        }
    };

    //Снимаем наведении мыши, если Box был удалён
    useEffect(() => {
        setIsHoveredBox(Array(users.length).fill(false));
        setIsHoveredClear(false);
    }, [users])

    // Создаем массив состояний для каждого Box'а
    const [isHoveredBox, setIsHoveredBox] = useState(Array(users.length).fill(false));
    const [isHoveredClear, setIsHoveredClear] = useState(false);
    const [boxStates, setBoxStates] = useState<Array<{ lastClickedTime: Date | null; errorMessage: string }>>(
        Array(users.length).fill({ lastClickedTime: null, errorMessage: '' })
    );
    

    return (
        <>
            <Typography
                fontSize='1.65rem'
                marginTop='1rem'
                marginBottom='-0.75rem'
            >
                Quick Account Access
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
                            if (user.isBlocked) {
                                setBoxStates(prevBoxStates => {
                                    const updatedBoxStates = [...prevBoxStates];
                                    updatedBoxStates[index] = { lastClickedTime: new Date(), errorMessage: '✗The user was blocked' };
                                    return updatedBoxStates;
                                });
                    
                                setTimeout(() => {
                                    setBoxStates(prevBoxStates => {
                                        const updatedBoxStates = [...prevBoxStates];
                                        updatedBoxStates[index] = { lastClickedTime: null, errorMessage: '' };
                                        return updatedBoxStates;
                                    });
                                }, 1750);
                            }
                            else {
                                setUser(user);
                                navigate('/home');
                            }
                        }
                    }}
                >
                    {user.isBlocked ? 
                        <Avatar
                            alt="Avatar"
                            src={defaultAvatarPath}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '6rem',
                                height: '6rem'
                            }}
                        />
                        :
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
                    }
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
                            Username: {user.isBlocked ? 'DELETED' : user.username}
                        </Typography>
                        <Typography>
                            Role: {user.isBlocked ? 'unknown' : user.userRole}
                        </Typography>
                        <Typography>
                            Password: ●●●●●●●●●
                        </Typography>
                    </Box>
                    <Box sx={{
                        opacity: isHoveredBox[index] ? 1 : 0,
                        transition: 'opacity 0.4s ease'
                    }}>
                        <Tooltip
                            title='Clear'
                            arrow
                        >
                            <DeleteIcon
                                sx={{
                                    color: iconColor,
                                    position: 'absolute',
                                    top: '50%',
                                    right: '0',
                                    transform: 'translateY(-50%)',
                                    marginRight: '1.75rem',
                                    fontSize: '1.66rem',
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