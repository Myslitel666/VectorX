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
import { setOpenDrafts, updateCourseId } from '../../../../../../Store/slices/courseCreationSlice';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store

//fetch import
import { getSubjects } from './fetch/courseManagementFetch';

//interfaces import
import { SubjectDirectory } from '../../../Interfaces/interfaces';

//Utils Import
import { addImagePrefix } from '../../../../../../Utils/ImageUtils';

const MyDraftsModalContent: React.FC = () => {

    //Context
    const theme = useTheme();
    const { themeMode, iconColor }: ColorModeContextProps = useColorMode();
    const { getUser } = useUserContext();
    const navigate = useNavigate();
    const user = getUser();
    const [subjects, setSubjects] = useState<SubjectDirectory[]>([]);

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const drafts = useSelector((state: RootState) => state.createdCourse.drafts);

    // Создаем функцию для обработки клика на иконку корзины
    const handleDeleteIconClick = (userId: number) => {
        // Извлекаем данные из localStorage
        // const cachedUserIdsString = localStorage.getItem('cachedUserIds');

        // // Проверяем, есть ли данные в localStorage по ключу 'cachedUserIds'
        // if (cachedUserIdsString !== null) {
        //     // Преобразуем строку в массив
        //     const cachedUserIds: number[] = JSON.parse(cachedUserIdsString);
        //     const updatedCachedUserIds = cachedUserIds.filter(id => id !== userId);

        //     // Обновляем данные в localStorage
        //     localStorage.setItem('cachedUserIds', JSON.stringify(updatedCachedUserIds));
        // }

        // updateCachedUsers();
    };

    // Создаем функцию для обработки клика на иконку корзины
    const updateCachedUsers = () => {
        const cachedUserIdsString = localStorage.getItem('cachedUserIds');

        // Проверяем, есть ли данные в localStorage по ключу 'cachedUserIds'
        if (cachedUserIdsString !== null) {
            // Преобразуем строку в массив
            const cachedUserIds: number[] = JSON.parse(cachedUserIdsString);
        }
    };

    // Создаем массив состояний для каждого Box'а
    const [isHoveredBox, setIsHoveredBox] = useState(Array(drafts.length).fill(false));
    const [isHoveredClear, setIsHoveredClear] = useState(false);
    const [boxStates, setBoxStates] = useState<Array<{ lastClickedTime: Date | null; errorMessage: string }>>(
        Array(drafts.length).fill({ lastClickedTime: null, errorMessage: '' })
    );
    
    useEffect(() => {
        const fetchSubjects = async () => {
            const subjects = await getSubjects();
            setSubjects(subjects);
        };

        fetchSubjects();
    }, []);

    return (
        <>
            <Typography
                fontSize='1.65rem'
                marginTop='1rem'
                marginBottom='-0.75rem'
            >
                My Drafts
            </Typography>
            {drafts.map((draft, index) => (
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
                            dispatch(updateCourseId(draft.courseId));
                            dispatch(setOpenDrafts(false));
                            navigate('/course-management/course-creation');
                        }
                    }}
                >
                    <Avatar
                        alt="Avatar"
                        src={addImagePrefix(draft.courseAvatar)}
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
                            <strong>Course Name:</strong> {draft.title.length > 55 ? `${draft.title.substring(0, 55)}...` : draft.title}
                        </Typography>
                        <Typography>
                            <strong>Subject:</strong> {subjects.find(subject => subject.subjectId === draft.subjectId)?.subjectName}
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
            {drafts.length === 0 &&
                <>
                    <Typography
                        fontSize='1rem'
                        marginTop='1.5rem'
                        marginBottom='1rem'
                    >
                        Your saved courses will be displayed here.
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
                            onClick={() => { dispatch(setOpenDrafts(false)) }}
                        >
                            OK, Accept
                        </MyButton>
                    </Box>
                </>
            }
        </>
    );
}

export default MyDraftsModalContent;