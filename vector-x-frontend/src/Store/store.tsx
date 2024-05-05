import { configureStore } from '@reduxjs/toolkit';
import cachedUsersReducer from './slices/cachedUsersSlice'; // Импортируем срез хранилища кешированных пользователей
import usersReducer from './slices/adminPanelSlice'; // Импортируем срез хранилища кешированных пользователей

const store = configureStore({
    reducer: {
        cachedUsers: cachedUsersReducer, // Добавляем срез кешированных пользователей в качестве редюсера
        users: usersReducer, // Добавляем срез пользователей в качестве редюсера
        // Дополнительные редюсеры могут быть добавлены здесь по мере необходимости
    }
});

export type RootState = ReturnType<typeof store.getState>; // Тип для получения состояния хранилища
export type AppDispatch = typeof store.dispatch; // Тип для отправки действий

export default store;