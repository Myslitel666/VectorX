import { configureStore } from '@reduxjs/toolkit';
import cachedUsersReducer from './slices/cachedUsersSlice'; // Импортируем срез хранилища кешированных пользователей
import usersReducer from './slices/adminPanelSlice'; // Импортируем срез хранилища cписка пользователей
import createdCourseReducer from './slices/courseCreationSlice'; // Импортируем срез хранилища данных создаваемого курса
import courseSectionReducer from './slices/courseSectionSlice'; // Импортируем срез хранилища данных раздела курса

const store = configureStore({
    reducer: {
        cachedUsers: cachedUsersReducer, // Добавляем срез кешированных пользователей в качестве редюсера
        users: usersReducer, // Добавляем срез пользователей в качестве редюсера
        createdCourse: createdCourseReducer, // Добавляем срез создаваемого курса в качестве редюсера
        courseSection: courseSectionReducer, // Добавляем срез раздела курса в качестве редюсера
    }
});

export type RootState = ReturnType<typeof store.getState>; // Тип для получения состояния хранилища
export type AppDispatch = typeof store.dispatch; // Тип для отправки действий

export default store;