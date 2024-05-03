import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
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
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return 2;
};

const initialRows: GridRowsProp = [
  {
    id: 0,
    name: 'John',
    age: 25,
    joinDate: '25.12.2022',
    role: randomRole(),
  },
  {
    id: 1,
    name: 'Dark',
    age: 36,
    joinDate: '25.12.2022',
    role: randomRole(),
  },
  {
    id: 2,
    name: 'Byte',
    age: 19,
    joinDate: '25.12.2022',
    role: randomRole(),
  },
  {
    id: 3,
    name: 'Frog',
    age: 28,
    joinDate: '25.12.2022',
    role: randomRole(),
  },
  {
    id: 4,
    name: 'Stack',
    age: 23,
    joinDate: '25.12.2022',
    role: randomRole(),
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 0;
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
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

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
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
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'joinDate',
      headerName: 'Join date',
      type: 'string',
      width: 180,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Department',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Market', 'Finance', 'Development'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
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
                    onClick={handleDeleteClick(id)}
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
        height: 438,
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
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
            toolbar: EditToolbar as GridSlots['toolbar'],
            }}
            slotProps={{
            toolbar: { setRows, setRowModesModel },
            }}
        />
    </Box>
  );
}
