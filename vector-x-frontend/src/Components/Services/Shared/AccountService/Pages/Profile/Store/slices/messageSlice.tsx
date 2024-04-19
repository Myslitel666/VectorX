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
        resetMessage(state) {
            state.text = initialState.text; // Сбрасываем текст в начальное состояние
            state.isError = initialState.isError; // Сбрасываем isError в начальное состояние
        },
    },
});

export const { updateMessage, resetMessage } = messageSlice.actions; // Экспорт экшенов

export default messageSlice.reducer; // Экспорт редьюсера
