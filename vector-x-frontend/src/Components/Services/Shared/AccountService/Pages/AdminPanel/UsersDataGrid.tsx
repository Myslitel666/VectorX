//React Import
import * as React from 'react';

//MUI Import
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AxeIcon from './AxeIcon';
import { useColorMode, ColorModeContextProps } from '../../../../../../Context/ColorModeContext';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

//Interfaces Import
import { User } from '../../Interfaces/Interfaces';

const users: User[] = [
  {
    userId: 0,
    username: 'John',
    userRole: 'learner',
    avatar: '/images/testCourses/c++.png',
    isBlocked: false,
  },
  {
    userId: 1,
    username: 'Dark',
    userRole: 'master',
    avatar: '/images/testCourses/chess.png',
    isBlocked: false,
  },
  {
    userId: 2,
    username: 'Byte',
    userRole: 'admin',
    avatar: '/images/testCourses/desmos.png',
    isBlocked: false,
  },
  {
    userId: 3,
    username: 'Frog',
    userRole: 'learner',
    avatar: '/images/testCourses/python.png',
    isBlocked: true,
  },
  {
    userId: 4,
    username: 'Stack',
    userRole: 'master',
    avatar: '/images/testCourses/csharp.png',
    isBlocked: false,
  },
];

const roles = ['learner', 'master', 'admin'];
const randomRole = () => {
  return roles[0];
};

const initialRows = users;

export default function UsersDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const { iconColor, theme }: ColorModeContextProps = useColorMode();

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (userId: number) => () => {
    setRowModesModel({ ...rowModesModel, [userId]: { mode: GridRowModes.Edit } });
  };
  
  const handleSaveClick = (userId: number) => () => {
    setRowModesModel({ ...rowModesModel, [userId]: { mode: GridRowModes.View } });
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
            src={params.row.avatar} 
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
    },
  ];

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
