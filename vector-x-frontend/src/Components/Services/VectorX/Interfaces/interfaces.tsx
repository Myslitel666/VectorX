export interface Course {
    courseId: number;
    authorId: number;
    subjectId: number;
    title: string;
    courseAvatar: string;
    description: string;
    price: number;
}

export interface SubjectDirectory {
    subjectId: number,
    subjectName: string,
    subjectDescription: string
}

export interface CourseSection {
    courseSectionId: number,
    courseId: number,
    lastSectionId: number | null,
    sectionName: string
    descriptrion: string | null,
    isDeleted: boolean
}

export interface Lesson {
    lessonId: number,
    courseSectionId: number,
    lastLessonId: number | null,
    lessonName: string
    lessonContent: string | null,
    isDeleted: boolean
}

