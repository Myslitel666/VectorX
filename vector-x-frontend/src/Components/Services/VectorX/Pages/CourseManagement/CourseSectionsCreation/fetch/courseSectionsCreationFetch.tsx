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

export const deleteCourseSection = async (courseSectionId: number) => {
    await fetch(`${apiUrl}/api/vectorX/course-management/deleteCourseSection`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courseSectionId: courseSectionId,
        }),
    });
};

export const redactCourseSection = async (courseSectionId: number, sectionName: string) => {
    await fetch(`${apiUrl}/api/vectorX/course-management/redactCourseSection`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courseSectionId: courseSectionId,
            sectionName: sectionName
        }),
    });
};