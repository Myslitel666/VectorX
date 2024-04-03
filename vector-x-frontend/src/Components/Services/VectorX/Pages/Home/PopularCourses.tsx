//MUI Import
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

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

const courses: Course[] = [
    { courseName: 'Курс по созданию приложений на C# в среде Visual Studio', courseAuthor: 'Артур Германович', coursePrice: 0, imageUrl: '/images/testCourses/csharp.png'},
    { courseName: 'С++ от новичка до профессионала', courseAuthor: 'Юрий Шедогубов', coursePrice: 2000, imageUrl: '/images/testCourses/c++.png' },
    { courseName: 'Шахматы: правила и простейшие комбинации', courseAuthor: 'Тагир', coursePrice: 15000, imageUrl: '/images/testCourses/chess.png' },
    { courseName: 'Математический анализ на практике', courseAuthor: 'Тагир', coursePrice: 12000, imageUrl: '/images/testCourses/desmos.png' },
    { courseName: 'Основы языка программирования Python', courseAuthor: 'Олег Сергеевич', coursePrice: 10000, imageUrl: '/images/testCourses/python.png' },
    // Добавьте другие курсы по вашему усмотрению
];

const PopularCourses: React.FC = () => {
    const theme = useTheme();
    const ArrowIconColor = theme.palette.primary.main;
    const borderBoxColor = theme.palette.action.disabled;

    return (
        <>
            <Typography
                marginLeft='1rem'
                fontSize='24px'
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
                <ArrowCircleLeftIcon sx={{
                    color: ArrowIconColor,
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
                        float: 'left',
                        display: 'flex', // Горизонтальное направление flex
                        alignItems: 'center', // Выравнивание по центру,
                        justifyContent: 'space-between', //Одинаковые интервалы между элементами
                        marginLeft: '1rem',
                        marginRight: '1rem',
                        paddingTop: '1rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                    }}
                >
                    {courses.map((course, index) => (
                        <Box
                            key={index}
                            border='1px solid'
                            borderColor={`${borderBoxColor}`}
                            borderRadius='2rem'
                            padding='1rem'
                            paddingTop='0.5rem'
                            paddingBottom='0.5rem'
                            sx={{
                                marginBottom: '1rem',
                                width: '15rem',
                                height: '24rem'
                            }}>
                                <img src={course.imageUrl}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '12rem',
                                        //objectFit: 'cover',
                                        borderRadius: '8px',
                                        //marginTop: '5px'
                                    }}
                                />
                            <Typography
                                fontSize="1rem"
                                className="course-name"
                                color="primary"
                                fontWeight= 'bold'
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
                                sx={{minWidth: '90%'}}
                            >
                                {course.coursePrice === 0 ? 'get started' : 'add to cart'}
                            </MyButton>
                        </Box>
                    ))}
                </Box>
                <ArrowCircleRightIcon sx={{
                    color: ArrowIconColor,
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