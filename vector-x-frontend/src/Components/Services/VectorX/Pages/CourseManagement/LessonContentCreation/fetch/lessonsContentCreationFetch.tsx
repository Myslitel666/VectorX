//interfaces import
const apiUrl = process.env.REACT_APP_API_URL as string;

export const addLessonContent = async (lessonId: number, lessonContent: string, lessonTask: string) => {
    await fetch(`${apiUrl}/api/vectorX/course-management/addLessonContent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lessonId: lessonId,
            lessonContent: lessonContent,
            lessonTask: lessonTask,
        }),
    });
};

export const getLessonById = async (lessonId: number) => {
    const response = await fetch(`${apiUrl}/api/vectorX/course-management/getLessonById`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            lessonId: lessonId,
        }),
    });

    const data = await response.json();
    return data;
};