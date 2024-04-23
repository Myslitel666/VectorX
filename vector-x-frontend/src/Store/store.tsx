import { configureStore } from '@reduxjs/toolkit';
import cachedUsersReducer from './slices/cachedUsersSlice'; // Импорт редьюсера

// Создание хранилища Redux
const store = configureStore({
    reducer: {
        cachedUsers: cachedUsersReducer, // Добавление редьюсера в корневой редьюсер
        // Другие редьюсеры могут быть добавлены здесь
    }
});

export type RootState = ReturnType<typeof store.getState>; // Тип для корневого состояния
export type AppDispatch = typeof store.dispatch; // Тип для диспетчера

export default store;