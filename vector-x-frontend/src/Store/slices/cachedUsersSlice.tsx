import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определение начального состояния среза
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

export const { setStoredUsers } = cachedUsersSlice.actions; // Экспорт экшенов

export default cachedUsersSlice.reducer; // Экспорт редьюсера
