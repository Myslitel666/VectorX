import { configureStore } from '@reduxjs/toolkit';
import cachedUsersReducer from './slices/cachedUsersSlice'; // ������ ���������

// �������� ��������� Redux
const store = configureStore({
    reducer: {
        cachedUsers: cachedUsersReducer, // ���������� ��������� � �������� ��������
        // ������ ��������� ����� ���� ��������� �����
    }
});

export type RootState = ReturnType<typeof store.getState>; // ��� ��� ��������� ���������
export type AppDispatch = typeof store.dispatch; // ��� ��� ����������

export default store;