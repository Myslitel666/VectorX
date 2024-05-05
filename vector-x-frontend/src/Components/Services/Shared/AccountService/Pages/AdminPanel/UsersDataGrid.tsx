//React Import
import * as React from 'react';
import {useEffect} from 'react';

//MUI Import
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AxeIcon from './AxeIcon';
import { useColorMode, ColorModeContextProps } from '../../../../../../Context/ColorModeContext';
import {
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

//MyComponents Import
import { useColorLabel } from '../../../../../../Context/UseColorLabel';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../Store/store'; // Импорт типа RootState из файла store
import { setUsers } from '../../../../../../Store/slices/adminPanelSlice'; // Action Import

//Interfaces Import
import { User } from '../../Interfaces/Interfaces';

//fetch import
import { getUsers, updateUser, connectWebSocket } from './fetch/adminPanelFetch';

//Utils Import
import {addImagePrefix, isNullImage} from '../../../../../../Utils/ImageUtils'

export default function UsersDataGrid() {
    //Работа с контекстом цветов
    const { getColorFromLabel } = useColorLabel('green');

    //Redux
    const dispatch = useDispatch(); // Получаем диспетчер Redux
    const users = useSelector((state: RootState) => state.users.users);

    const [rows, setRows] = React.useState(users);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    const { iconColor, theme }: ColorModeContextProps = useColorMode();

    const { themeMode, defaultAvatars }: ColorModeContextProps = useColorMode();
    let defaultAvatarPath = themeMode === 'dark' ? defaultAvatars.dark : defaultAvatars.light;

    const [editedRowId, setEditedRowId] = React.useState<GridRowId | null>(null);
    const [backupRowUserData, setBackupRowUserData] = React.useState<{ username: string, userRole: string } | null>(null);
    const [feedbackMessage, setFeedbackMessage] = React.useState('');
    const [isError, setIsError] = React.useState(false);

    const updateFeedbackMessage = (message: string, isError: boolean) => {
        setFeedbackMessage(message);
        setIsError(isError);
    }

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
        else if (params.reason === GridRowEditStopReasons.enterKeyDown) {
            setEditedRowId(params.id); //Сохраняем Id изменённой строки, чтобы отправить запрос в базу, когда изменения отобразятся в таблице
            const backupRow = { username: params.row.username, userRole: params.row.userRole }
            setBackupRowUserData(backupRow) //Сохраняем состояние строки на случай, если запрашиваемые изменения не корректны
        }
    };

    const handleEditClick = (userId: number) => () => {
        setRowModesModel({ ...rowModesModel, [userId]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (userId: number) => () => {
        setRowModesModel({ ...rowModesModel, [userId]: { mode: GridRowModes.View } });
        setEditedRowId(userId); //Сохраняем Id изменённой строки, чтобы отправить запрос в базу, когда изменения отобразятся в таблице
    };

    const handleCancelClick = (userId: number) => () => {
        setRowModesModel({
            ...rowModesModel,
            [userId]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const processRowUpdate = (newRow: User) => {
        setRows(rows.map((row) => (row.userId === newRow.userId ? newRow : row)));
        return newRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns: GridColDef[] = [
    {
        field: 'avatar',
        headerName: 'Avatar',
        width: 70,
        editable: false,
        renderCell: (params) => (
            <Box sx = {{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
            }}>
                <Avatar 
                    alt={params.row.username} 
                    src = {isNullImage(params.row.avatar) ? defaultAvatarPath : addImagePrefix(params.row.avatar)}
                />
            </Box>
        ),
        headerAlign: 'center',
    },
    { 
        field: 'username', 
        headerName: 'Username', 
        width: 250, 
        editable: true,
        headerAlign: 'center',
        cellClassName: 'wrap-cell',
    },
    {
        field: 'userRole',
        headerName: 'Role',
        width: 135,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['learner', 'master', 'admin'],
        headerAlign: 'center',
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        headerAlign: 'center',
        getActions: ({ row }) => {
            const userId = row.userId;
            const isInEditMode = rowModesModel[userId]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <Tooltip title = 'Save' arrow>
                        <GridActionsCellItem
                            icon={
                                <SaveIcon 
                                    sx = {{
                                        color: 'primary.main',
                                        transition: 'color 1s ease',
                                        fontSize: '1.66rem'
                                    }}
                                />
                            }
                            label="Save"
                            onClick={handleSaveClick(userId)}
                        />
                    </Tooltip>,
                    <Tooltip title = 'Cancel' arrow>
                        <GridActionsCellItem
                        icon={
                            <CancelIcon 
                                sx = {{
                                    fontSize: '1.66rem',
                                    color: iconColor,
                                }}
                            />
                        }
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(userId)}
                    />
                    </Tooltip>
                ];
            }

            return [
                <Tooltip title = 'Edit' arrow>
                    <GridActionsCellItem
                        icon={
                            <EditIcon 
                                sx = {{
                                    fontSize: '1.5rem',
                                    color: iconColor
                                }}
                            />
                        }
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(userId)}
                        color="inherit"
                    />
                </Tooltip>,
                <Tooltip title = 'Block' arrow>
                    <GridActionsCellItem
                        icon={
                            <AxeIcon 
                                style = {{
                                    width: '2rem',
                                    height: '2rem',
                                    fill: theme.palette.primary.main,
                                    transition: 'fill 1s ease'
                                }}
                            />}
                        label="Delete"
                        color="inherit"
                    />
                </Tooltip>
            ];
        },
    },];

    useEffect(() => {
        // Выполнить переход после успешной регистрации
        const timeoutId = setTimeout(() => {
            updateFeedbackMessage('', true);
        }, 3000);

        // Очистить таймаут, чтобы избежать утечек при размонтировании компонента
        return () => clearTimeout(timeoutId);
    }, [feedbackMessage, isError]);

    useEffect(() => {
        if (editedRowId) {
            const editedRowIndex = rows.findIndex(row => row.userId === editedRowId);
            const editedRow = rows.find(row => row.userId === editedRowId);
            
            const editingUser = {
                userId: editedRow?.userId,
                desiredUsername: editedRow?.username,
                desiredUserRole: editedRow?.userRole
            };
            const data = updateUser(editingUser);

            updateUser(editingUser)
                .then(data => {
                    updateFeedbackMessage(data.feedbackMessage, data.isError);

                    if (data.isError) {
                        const updatedRows = [...rows];
                        updatedRows[editedRowIndex] = {
                            ...updatedRows[editedRowIndex],
                            username: backupRowUserData?.username || '',
                            userRole: backupRowUserData?.userRole || ''
                        };
                        setRows(updatedRows);
                    }
                    else {
                        //Сохраняем резервную корпию строки, чтобы откатить изменения, если следующий запрос окажется неудачным
                        setBackupRowUserData({username: editedRow?.username || '', userRole: editedRow?.userRole || ''})
                        //Отправляем пользователю новые данные через Web Socket во все активные сессии
                        connectWebSocket(editedRowId.toString());
                    }
                });
        }

        setEditedRowId(null);
    }, [rows]); //Отслеживаем изменения строк таблицы

    useEffect(() => {
        getUsers()
            .then(u => {
                dispatch(setUsers(u));
                setRows(u);
            });
    }, []);

    return (
        <Box
            sx={{
                height: 431,
                width: '100%',
                '& .actions': {
                color: 'text.secondary',
                },
                '& .textPrimary': {
                color: 'text.primary',
                },
            }}
        >
            <Typography 
                sx={{
                    position: 'absolute',
                    top: '11rem',
                    color: isError ? getColorFromLabel('red') : getColorFromLabel('green'),
                }}
            >
                {feedbackMessage}
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                rowHeight={64}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                getRowId={(row) => row.userId}
                sx={{
                    '& .MuiDataGrid-cell': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    '& .MuiInputBase-input': {
                        textAlign: 'center',
                    },
                }}
            />
        </Box>
    );
}