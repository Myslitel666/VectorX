import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ќпределение начального состо€ни€ среза
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
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },
    },
});

export const { setUsers } = cachedUsersSlice.actions; // Ёкспорт экшенов

export default cachedUsersSlice.reducer; // Ёкспорт редьюсера
