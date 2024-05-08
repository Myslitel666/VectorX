import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../Components/Services/Shared/AccountService/Interfaces/Interfaces'

// Определение начального состояния среза
interface AdminPanelState {
    users: User[];
    backupUsers: User[]
}

const initialState: AdminPanelState = {
    users: [],
    backupUsers: []
};

const adminPanelSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },
        setBackupUsers(state, action: PayloadAction<User[]>) {
            state.backupUsers = action.payload;
        },
    },
});

export const { setUsers, setBackupUsers } = adminPanelSlice.actions; // Exporting actions

export default adminPanelSlice.reducer; // Exporting reducer
