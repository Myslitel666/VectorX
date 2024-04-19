import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ����������� ���������� ��������� �����
interface MessageState {
    text: string;
    isError: boolean; // ��������� ���������� ���������� isError
}

const initialState: MessageState = {
    text: '',
    isError: true, // �������������� �������� isError
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
    },
});

export const { updateMessage, resetMessage } = messageSlice.actions; // ������� �������

export default messageSlice.reducer; // ������� ���������
