//interfaces import
import { Course } from "../../../../Interfaces/interfaces";
import { SubjectDirectory } from "../../../../Interfaces/interfaces";

const apiUrl = process.env.REACT_APP_API_URL as string;

export const getLessons = async (courseSectionId: number) => {
    const response = await fetch(`${apiUrl}/api/vectorX/course-management/getLessons`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courseSectionId: courseSectionId,
        }),
    });

    const data = await response.json();
    return data;
};

export const createLesson = async (courseSectionId: number) => {
    const response = await fetch(`${apiUrl}/api/vectorX/course-management/createLesson`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courseSectionId: courseSectionId,
        }),
    });

    const data = await response.json();
    return data;
};

export const deleteLesson = async (lessonId: number) => {
    await fetch(`${apiUrl}/api/vectorX/course-management/deleteLesson`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lessonId: lessonId,
        }),
    });
};

export const redactLesson = async (lessonId: number, lessonName: string) => {
    await fetch(`${apiUrl}/api/vectorX/course-management/redactLesson`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lessonId: lessonId,
            lessonName: lessonName
        }),
    });
};