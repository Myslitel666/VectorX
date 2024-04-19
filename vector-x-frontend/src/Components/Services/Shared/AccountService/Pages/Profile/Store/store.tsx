import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './slices/messageSlice'; // Импорт редьюсера для сообщения

// Создание хранилища Redux
const store = configureStore({
    reducer: {
        message: messageReducer, // Добавление редьюсера сообщения в корневой редьюсер
        // Другие редьюсеры могут быть добавлены здесь
    }
});

export type RootState = ReturnType<typeof store.getState>; // Тип для корневого состояния
export type AppDispatch = typeof store.dispatch; // Тип для диспетчера

export default store;