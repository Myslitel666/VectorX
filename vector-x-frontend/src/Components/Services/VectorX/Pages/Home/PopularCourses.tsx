﻿//React Import
import React, { useState } from 'react';

//MUI Import
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

//MyComponents Import
import MyButton from '../../../../Common/User Interface/MyButton'

//CSS Import
import './Courses.css'; // Импортируйте стили

interface Course {
    imageUrl: string;
    courseName: string;
    courseAuthor: string;
    coursePrice: number;
}

const popularCourses: Course[] = [
    { courseName: 'Курс по созданию приложений на C# в среде Visual Studio', courseAuthor: 'C# master', coursePrice: 0, imageUrl: '/images/testCourses/csharp.png' },
    { courseName: 'С++ от новичка до профессионала', courseAuthor: 'IT Doctor', coursePrice: 2000, imageUrl: '/images/testCourses/c++.png' },
    { courseName: 'Шахматы: правила и простейшие комбинации', courseAuthor: 'Алексей Лебедев', coursePrice: 15000, imageUrl: '/images/testCourses/chess.png' },
    { courseName: 'Математический анализ на практике', courseAuthor: 'Пифагор', coursePrice: 12000, imageUrl: '/images/testCourses/desmos.png' },
    { courseName: 'Основы языка программирования Python', courseAuthor: 'Python Dev', coursePrice: 10000, imageUrl: '/images/testCourses/python.png' },
    { courseName: 'Курс по веб-разработке на JavaScript', courseAuthor: 'Мария Иванова', coursePrice: 5000, imageUrl: '/images/testCourses/python.png' },
    { courseName: 'Английский язык: от начального до продвинутого', courseAuthor: 'Елена Петрова', coursePrice: 8000, imageUrl: '/images/testCourses/desmos.png' },
    { courseName: 'История искусства: от античности до современности', courseAuthor: 'Александр Васильев', coursePrice: 15000, imageUrl: '/images/testCourses/chess.png' },
    { courseName: 'Финансовая грамотность: как управлять своими деньгами', courseAuthor: 'Наталья Смирнова', coursePrice: 12000, imageUrl: '/images/testCourses/c++.png' },
    { courseName: 'Разработка мобильных приложений на Android', courseAuthor: 'Иван Дмитриев', coursePrice: 10000, imageUrl: '/images/testCourses/csharp.png' },
    { courseName: 'Курс по Photoshop для начинающих', courseAuthor: 'Екатерина Николаева', coursePrice: 5000, imageUrl: '/images/testCourses/c++.png' },
    { courseName: 'Основы маркетинга: как продавать свои товары и услуги', courseAuthor: 'Алексей Иванов', coursePrice: 8000, imageUrl: '/images/testCourses/desmos.png' },
    { courseName: 'Курс по медитации и психологическому развитию', courseAuthor: 'Ольга Сидорова', coursePrice: 0, imageUrl: '/images/testCourses/chess.png' },
    { courseName: 'Изучение японского языка: уровень начинающего', courseAuthor: 'Такахаси Хиро', coursePrice: 5000, imageUrl: '/images/testCourses/chess.png' },
    { courseName: 'Танцы для всех: основные движения и техника', courseAuthor: 'Анна Павлова', coursePrice: 0, imageUrl: '/images/testCourses/desmos.png' },
    { courseName: 'Курс по управлению проектами: от идеи до реализации', courseAuthor: 'Дмитрий Козлов', coursePrice: 10000, imageUrl: '/images/testCourses/chess.png' },
    { courseName: 'Приготовление домашней пасты: секреты и рецепты', courseAuthor: 'Мария Антонова', coursePrice: 5000, imageUrl: '/images/testCourses/chess.png' },
    { courseName: 'Курс по астрономии: путешествие по Вселенной', courseAuthor: 'Владимир Попов', coursePrice: 8000, imageUrl: '/images/testCourses/chess.png' },
    { courseName: 'Физические упражнения для укрепления здоровья', courseAuthor: 'Евгений Сидоров', coursePrice: 0, imageUrl: '/images/testCourses/chess.png' },
    { courseName: 'Основы графического дизайна: создание логотипов и баннеров', courseAuthor: 'Ирина Смирнова', coursePrice: 10000, imageUrl: '/images/testCourses/desmos.png' },
];


const PopularCourses: React.FC = () => {
    const theme = useTheme();
    const ArrowIconColor = theme.palette.primary.main;
    const borderBoxColor = theme.palette.action.disabled;
    let itemsRowLimit = 5;
    const itemsMaxLimit = 15;
    let increase = itemsRowLimit;

    const [startIndex, setStartIndex] = useState(0);

    const handlePrevClick = () => {
        if (startIndex >= itemsRowLimit) {
            setStartIndex(startIndex - itemsRowLimit);
        }
        else {
            setStartIndex(0);
        }
    };

    const handleNextClick = () => {
        if (startIndex + itemsRowLimit < itemsMaxLimit) {
            setStartIndex(startIndex + itemsRowLimit);
        }
    };

    if (useMediaQuery('(max-width:90rem)')) {
        itemsRowLimit = 4;
    }
    if (useMediaQuery('(max-width:75rem)')) {
        itemsRowLimit = 3;
    }
    if (useMediaQuery('(max-width:60rem)')) {
        itemsRowLimit = 2;
    }
    if (useMediaQuery('(max-width:44rem)')) {
        itemsRowLimit = 1;
    }

    if (startIndex + itemsRowLimit < itemsMaxLimit) {
        increase = itemsRowLimit;
    }
    else {
        increase = itemsMaxLimit - startIndex;
    }

    return (
        <>
            <Typography
                marginLeft='4.5rem'
                fontSize='2.25rem'
            >
                Popular Courses
            </Typography>
            <Box
                marginTop='1.75rem'
                marginLeft='0.7rem'
                marginRight='0.7rem'
                sx={{
                    display: 'flex', // Горизонтальное направление flex
                    alignItems: 'center', // Выравнивание по центру,
                }}
            >
                <ArrowCircleLeftIcon
                    onClick={handlePrevClick}
                    sx={{
                        color: startIndex === 0 ? 'gray' : ArrowIconColor,
                        height: '4rem',
                        width: '4rem',
                        float: 'left',
                        transition: 'color 1s ease, transform 1s ease',
                        cursor: 'pointer',
                        ':hover': {
                            transform: 'scale(1.2)'
                        }
                    }} />
                <Box
                    width='100%'
                    height='23rem'
                    sx={{
                        display: 'flex', // Горизонтальное направление flex
                        alignItems: 'center', // Выравнивание по центру,
                        justifyContent: 'center', // Центрирование по горизонтали
                        marginLeft: '1rem',
                        marginRight: '1rem',
                        paddingTop: '1rem',
                        cursor: 'pointer',
                    }}
                >
                    {popularCourses.
                        slice(startIndex, startIndex + increase).
                        map((course, index) => (
                            <Box
                                key={index}
                                border='1px solid'
                                borderColor={`${borderBoxColor}`}
                                borderRadius='2rem'
                                padding='1rem'
                                paddingTop='0.5rem'
                                paddingBottom='0.5rem'
                                marginRight='1rem'
                                sx={{
                                    marginBottom: '1rem',
                                    width: '15rem',
                                    height: '24rem',
                                }}
                            >
                                <img 
                                    src={course.imageUrl}
                                    alt={course.courseName}
                                    title={course.courseName}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '12rem',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Typography
                                    fontSize="1rem"
                                    className="course-name"
                                    color="primary"
                                    fontWeight='bold'
                                    sx={{
                                        transition: 'color 1s esea'
                                    }}
                                >
                                    {course.courseName}
                                </Typography>
                                <Typography
                                    fontSize='0.8rem'
                                    className='course-author'
                                >{course.courseAuthor}</Typography>
                                <Typography fontSize='1.3rem'>
                                    {course.coursePrice === 0 ? 'Free' : `${course.coursePrice} ₽`}
                                </Typography>
                                <MyButton
                                    variant="contained"
                                    sx={{ minWidth: '100%' }}
                                >
                                    {course.coursePrice === 0 ? 'get started' : 'add to cart'}
                                </MyButton>
                            </Box>
                        ))}
                </Box>
                <ArrowCircleRightIcon
                    onClick={handleNextClick}
                    sx={{
                        marginLeft: '-1rem', //Компенсация отступа последнего Box'а (в цикле)
                        color: startIndex + itemsRowLimit >= itemsMaxLimit ? 'gray' : ArrowIconColor,
                        height: '4rem',
                        width: '4rem',
                        float: 'right',
                        transition: 'color 1s ease, transform 1s ease',
                        cursor: 'pointer',
                        ':hover': {
                            transform: 'scale(1.2)'
                        }
                    }} />
            </Box>
        </>
    );
};

export default PopularCourses;