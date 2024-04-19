import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определение начального состояния среза
interface MessageState {
    text: string;
    isError: boolean; // Добавляем логическую переменную isError
}

const initialState: MessageState = {
    text: '',
    isError: true, // Инициализируем значение isError
};

// Создание среза для управления сообщением
const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        updateMessage(state, action: PayloadAction<{ text: string; isError: boolean }>) {
            state.text = action.payload.text; // Обновление текста сообщения
            state.isError = action.payload.isError; // Обновление значения isError
        },
    },
});

export const { updateMessage } = messageSlice.actions; // Экспорт экшенов

export default messageSlice.reducer; // Экспорт редьюсера
