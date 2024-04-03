//MUI Import
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

const PopularCourses: React.FC = () => {
    const theme = useTheme();
    const ArrowIconColor = theme.palette.primary.main;

    return (
        <>
            <Typography
                marginLeft='1rem'
                fontSize='24px'
            >
                Popular Courses
            </Typography>
            <Box
                marginTop='0.5rem'
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
                    height='19rem'
                    sx={{float: 'left'}}
                >

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