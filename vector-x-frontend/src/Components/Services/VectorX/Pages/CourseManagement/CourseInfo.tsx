//React Import
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

//MUI Import
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

//Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Store/store'; // Импорт типа RootState из файла store

//fetch import
import { 
    getSubjects, 
    getCourseById,
} from './CourseCreation/fetch/courseManagementFetch';

//interfaces import
import { 
    Course, 
    SubjectDirectory,
} from '../../Interfaces/interfaces';

//Utils Import
import { addImagePrefix } from '../../../../../Utils/ImageUtils';

const CourseInfo: React.FC = () => {

    //Context
    const [subjects, setSubjects] = useState<SubjectDirectory[]>([]);

    //Redux
    const courseId = useSelector((state: RootState) => state.createdCourse.courseId);

    const [course, setCourse] = useState<Course>();

    const isDesktop = useMediaQuery({ minWidth:700 });

    const fetchSubjects = async () => {
        const subjects = await getSubjects();
        setSubjects(subjects);
    };

    useEffect(() => {
        if (courseId != -1) {
            getCourseById(courseId)
                .then(course => {
                    setCourse(course);
                });
        }

        fetchSubjects();
    }, [courseId]);

    return (
        <>
            <Box 
                display='flex'
                justifyContent='center'
                alignItems='center'
                marginTop = '0.75rem'
            >
                <img 
                    src = {addImagePrefix(course?.courseAvatar || '')} 
                    alt="Course Avatar"
                    style = {{
                        width: '10rem',
                        height: '10rem'
                    }}
                />
                <Box
                    marginLeft = '1rem'

                >
                    <Typography fontSize={isDesktop ? '1.38rem' : '1.05rem'} marginBottom='0.25rem'>
                        <strong>Course Name:</strong> {course && course.title.length > 100 ? `${course.title.substring(0, 100)}...` : course?.title}
                    </Typography>
                    <Typography fontSize = {isDesktop ? '1.38rem' : '1.05rem'}>
                        <strong>Subject:</strong> {course && subjects.find(subject => subject.subjectId === course.subjectId)?.subjectName}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default CourseInfo;