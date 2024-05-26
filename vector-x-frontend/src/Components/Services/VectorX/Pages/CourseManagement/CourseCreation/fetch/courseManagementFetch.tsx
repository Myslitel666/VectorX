//interfaces import
import { Course } from "../../../../Interfaces/interfaces";
import { SubjectDirectory } from "../../../../Interfaces/interfaces";

const apiUrl = process.env.REACT_APP_API_URL as string;

export const getSubjects = async () => {
    const response = await fetch(`${apiUrl}/api/vectorX/course-management/getSubjects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    return data as SubjectDirectory[];
};

export const createCourse = async (course: Course) => {
    const response = await fetch(`${apiUrl}/api/vectorX/course-management/createCourse`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
    });

    const data = await response.json();

    return data;
};