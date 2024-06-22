//Redux Import 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определение начального состояния среза
interface LessonState {
    lessonId: number,
    lesson: String,
    isOpen: boolean,
}

// Получение начального состояния
const initialState: LessonState = {
    lessonId: 0,
    lesson: '',
    isOpen: false,
};

const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        updateLessonId(state, action: PayloadAction<number>) {
            state.lessonId = action.payload;
        },
        updateLesson(state, action: PayloadAction<string>) {
            state.lesson = action.payload;
        },
        updateIsOpen(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
    },
});

export const { 
    updateLessonId: updateLessonId,
    updateLesson: updateLesson, 
    updateIsOpen: updateIsOpen, 
} = lessonSlice.actions; // Экспорт экшенов

export default lessonSlice.reducer; // Экспорт редьюсера
