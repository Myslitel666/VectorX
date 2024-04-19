import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ����������� ���������� ��������� �����
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

// �������� ����� ��� ���������� ����������
const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        updateMessage(state, action: PayloadAction<{ text: string; isError: boolean }>) {
            state.text = action.payload.text; // ���������� ������ ���������
            state.isError = action.payload.isError; // ���������� �������� isError
        },
        resetMessage(state) {
            state.text = initialState.text; // ���������� ����� � ��������� ���������
            state.isError = initialState.isError; // ���������� isError � ��������� ���������
        },
        updateUnlockSaveButton(state, action: PayloadAction<boolean>) {
            state.unlockSaveButton = action.payload;
        },
    },
});

export const { updateMessage, resetMessage, updateUnlockSaveButton } = messageSlice.actions; // ������� �������

export default messageSlice.reducer; // ������� ���������
