import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ќпределение начального состо€ни€ среза
interface MessageState {
    text: string;
    isError: boolean;
    unlockSaveButton: boolean;
}

const initialState: MessageState = {
    text: '',
    isError: true,
    unlockSaveButton: false,
};

// —оздание среза дл€ управлени€ сообщением
const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        updateMessage(state, action: PayloadAction<{ text: string; isError: boolean }>) {
            state.text = action.payload.text; // ќбновление текста сообщени€
            state.isError = action.payload.isError; // ќбновление значени€ isError
        },
        resetMessage(state) {
            state.text = initialState.text; // —брасываем текст в начальное состо€ние
            state.isError = initialState.isError; // —брасываем isError в начальное состо€ние
        },
        updateUnlockSaveButton(state, action: PayloadAction<boolean>) {
            state.unlockSaveButton = action.payload;
        },
    },
});

export const { updateMessage, resetMessage, updateUnlockSaveButton } = messageSlice.actions; // Ёкспорт экшенов

export default messageSlice.reducer; // Ёкспорт редьюсера
