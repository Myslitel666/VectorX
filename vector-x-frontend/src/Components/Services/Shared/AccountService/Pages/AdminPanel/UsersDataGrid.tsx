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

const avatars = [
  '/images/testCourses/c++.png',
  '/images/testCourses/chess.png',
  '/images/testCourses/desmos.png',
  '/images/testCourses/python.png',
  '/images/testCourses/csharp.png',
];

const roles = ['learner', 'master', 'admin'];
const randomRole = () => {
  return roles[0];
};

const initialRows: GridRowsProp = [
  {
    id: 0,
    username: 'John',
    role: randomRole(),
  },
  {
    id: 1,
    username: 'Dark',
    role: randomRole(),
  },
  {
    id: 2,
    username: 'Byte',
    role: randomRole(),
  },
  {
    id: 3,
    username: 'Frog',
    role: randomRole(),
  },
  {
    id: 4,
    username: 'Stack',
    role: randomRole(),
  },
];

export default function UsersDataGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const { iconColor, theme }: ColorModeContextProps = useColorMode();

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
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
            src={avatars[params.row.id]}
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
    },
    {
      field: 'role',
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
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

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
                        onClick={handleSaveClick(id)}
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
                    onClick={handleCancelClick(id)}
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
                    onClick={handleEditClick(id)}
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
            sx={{
              '& .MuiDataGrid-cell': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }
            }}
        />
    </Box>
  );
}
