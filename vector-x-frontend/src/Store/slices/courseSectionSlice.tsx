//Redux Import 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//interfaces import
import { CourseSection } from '../../Components/Services/VectorX/Interfaces/interfaces';

// Определение начального состояния среза
interface CreatedCourseState {
    courseSectionId: number,
    courseSection: String,
    isOpen: boolean,
}

// Получение начального состояния
const initialState: CreatedCourseState = {
    courseSectionId: 0,
    courseSection: '',
    isOpen: false,
};

const courseSectionSlice = createSlice({
    name: 'createdCourse',
    initialState,
    reducers: {
        updateCourseSectionId(state, action: PayloadAction<number>) {
            state.courseSectionId = action.payload;
        },
        updateCourseSection(state, action: PayloadAction<string>) {
            state.courseSection = action.payload;
        },
        updateIsOpen(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
    },
});

export const { 
    updateCourseSectionId: updateCourseSectionId,
    updateCourseSection: updateCourseSection, 
    updateIsOpen: updateIsOpen, 
} = courseSectionSlice.actions; // Экспорт экшенов

export default courseSectionSlice.reducer; // Экспорт редьюсера
