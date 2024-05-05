import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../Components/Services/Shared/AccountService/Interfaces/Interfaces'

// Определение начального состояния среза
interface AdminPanelState {
    users: User[];
}

const initialState: AdminPanelState = {
    users: [],
};

const adminPanelSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },
    },
});

export const { setUsers } = adminPanelSlice.actions; // Exporting actions

export default adminPanelSlice.reducer; // Exporting reducer
