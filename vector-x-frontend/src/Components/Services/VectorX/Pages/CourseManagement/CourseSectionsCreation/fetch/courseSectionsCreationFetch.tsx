//interfaces import
import { Course } from "../../../../Interfaces/interfaces";
import { SubjectDirectory } from "../../../../Interfaces/interfaces";

const apiUrl = process.env.REACT_APP_API_URL as string;

export const getCourseSections = async (courseId: number) => {
    const response = await fetch(`${apiUrl}/api/vectorX/course-management/getCourseSections`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courseId: courseId,
        }),
    });

    const data = await response.json();
    return data;
};

export const createCourseSection = async (courseId: number) => {
    const response = await fetch(`${apiUrl}/api/vectorX/course-management/createCourseSection`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courseId: courseId,
        }),
    });

    const data = await response.json();
    return data;
};