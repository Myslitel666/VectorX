import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ����������� ���������� ��������� �����
interface CachedUsersState {
    users: User[];
}

const initialState: CachedUsersState = {
    users: [],
};

interface User {
    userId: number;
    username: string;
    role: string;
    avatar: string;
}

const cachedUsersSlice = createSlice({
    name: 'cachedUsers',
    initialState,
    reducers: {
        setStoredUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },
    },
});

export const { setStoredUsers } = cachedUsersSlice.actions; // ������� �������

export default cachedUsersSlice.reducer; // ������� ���������
