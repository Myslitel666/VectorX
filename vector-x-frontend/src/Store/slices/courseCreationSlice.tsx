//Redux Import 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//ImageUploading Import
import { ImageListType } from 'react-images-uploading';

// Получение courseId из кэша или установка дефолтного значения
const getCreatedCourseId = (): number => {
    const cachedCourseId = localStorage.getItem('createdCourseId');
    return cachedCourseId ? parseInt(cachedCourseId) : -1;
};

// Определение начального состояния среза
interface CreatedCourseState {
    courseId: number,
    isLoadedAvatar: boolean,
    avatar: string
}

// Получение начального состояния из кэша или установка дефолтного значения, если кэш пуст
const initialState: CreatedCourseState = {
        courseId: getCreatedCourseId(),
        isLoadedAvatar: false,
        avatar: ''
};

const createdCourseSlice = createSlice({
    name: 'createdCourse',
    initialState,
    reducers: {
        updateCourseId(state, action: PayloadAction<number>) {
            state.courseId = action.payload;
            localStorage.setItem('createdCourseId', action.payload.toString());
        },
        updateIsLoadedAvatar(state, action: PayloadAction<boolean>) {
            state.isLoadedAvatar = action.payload;
        },
        updateCourseAvatar(state, action: PayloadAction<string>) {
            state.avatar = action.payload;
        },
    },
});

export const { 
    updateCourseId: updateCourseId, 
    updateIsLoadedAvatar: updateIsLoadedAvatar, 
    updateCourseAvatar: updateCourseAvatar 
} = createdCourseSlice.actions; // Экспорт экшенов

export default createdCourseSlice.reducer; // Экспорт редьюсера
