import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../Components/Services/Shared/AccountService/Interfaces/Interfaces'

// Определение начального состояния среза
interface CachedUsersState {
    users: User[];
}

const initialState: CachedUsersState = {
    users: [],
};

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
