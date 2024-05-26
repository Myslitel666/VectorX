export interface Course {
    courseId: number;
    authorId: number;
    courseStatusId: number;
    subjectId: number;
    title: string;
    courseAvatar: string;
    description: string;
    price: number;
}

export interface CourseStatusDirectory {
    courseStatusId: number;
    statusName: string;
    description: string;
}

export interface CourseStatuses {
    id: number;
    courseId: number;
    statusId: number;
}

