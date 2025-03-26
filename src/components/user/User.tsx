import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Box, Button, Chip, Grid2, IconButton, Paper, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import CreateUserDialog from './create/CreateUser';
import ConfirmationDialog from '../confirmation/ConfirmationModal';

const User: React.FC = () => {
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [usersData, setUsersData] = useState<any[]>([
    {
      id: 1,
      avatar: 'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-15.webp',
      name: 'Angelique Morse',
      email: 'benny89@yahoo.com',
      phoneNumber: '+46 8 123 456',
      address: '123 Main St, Anytown, USA',
      department: 'Wuckert Inc',
      role: 'Staff',
      status: 'Banned',
    },
    {
      id: 2,
      avatar: 'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-15.webp',
      name: 'Ariana Lang',
      email: 'avery43@hotmail.com',
      phoneNumber: '+54 11 1234-5678',
      address: '123 Main St, Anytown, USA',
      department: 'Feest Group',
      role: 'Staff',
      status: 'Pending',
    },
    {
      id: 3,
      avatar: 'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-15.webp',
      name: 'Aspen Schmitt',
      email: 'mireya13@hotmail.com',
      phoneNumber: '+34 91 123 4567',
      address: '123 Main St, Anytown, USA',
      department: 'Kihn, Marquardt and Crist',
      role: 'Staff',
      status: 'Banned',
    },
    {
      id: 4,
      avatar: 'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-15.webp',
      name: 'Brycen Jimenez',
      email: 'tyrel.greenholt@gmail.com',
      phoneNumber: '+52 55 1234 5678',
      address: '123 Main St, Anytown, USA',
      department: 'Rempel, Hand and Herzog',
      role: 'Manager',
      status: 'Active',
    },
    {
      id: 5,
      avatar: 'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-15.webp',
      name: 'Chase Day',
      email: 'joana.simonis84@gmail.com',
      phoneNumber: '+86 10 1234 5678',
      address: '123 Main St, Anytown, USA',
      department: 'Mraz, Donnelly and Collins',
      role: 'Manager',
      status: 'Banned',
    },
  ]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const columnsUser: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 80,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar src={params.row.avatar} alt='Avatar' sx={{ width: 40, height: 40 }} />

          <Box>
            <Typography
              variant='body2'
              fontWeight={600}
              mb={0}
              sx={{ color: 'var(--palette-text-primary)' }}
            >
              {params.row.name}
            </Typography>
            <Typography fontSize={'13px'} mt={0.5} sx={{ color: 'var(--palette-text-secondary)' }}>
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    { field: 'phoneNumber', headerName: 'Phone number', width: 180 },
    { field: 'department', headerName: 'Department', width: 220 },
    { field: 'role', headerName: 'Role', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        return (
          <Chip
            color={
              params.value === 'Active'
                ? 'success'
                : params.value === 'Pending'
                  ? 'warning'
                  : 'error'
            }
            label={params.value}
          />
        );
      },
    },
    {
      field: 'functions',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size='small'
            onClick={() => {
              setOpenCreateUser(true);
              setOpenEditUser(true);
              setCurrentUser(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentUser(params.row);
            }}
          >
            <img width={18} height={18} src={trashIcon} alt='' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleDeleteUser = (id: number) => {
    const newUsersData = usersData.filter((user) => user.id !== id);
    setUsersData(newUsersData);
  };

  return (
    <>
      <Button
        sx={{
          position: 'absolute',
          right: '40px',
          top: '16px',
          width: 'fit-content',
          bgcolor: 'var(--palette-grey-800)',
          color: 'var(--palette-common-white)',
          padding: '8px',
          gap: '4px',
          fontSize: '13px',
        }}
        type='submit'
        variant='contained'
        fullWidth
        onClick={() => setOpenCreateUser(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New user
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={usersData}
              columns={columnsUser}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              className='datagrid-minimals-custom'
              sx={{ minHeight: 500, maxHeight: 500 }}
            />
          </Paper>
        </Grid2>
      </Grid2>

      <CreateUserDialog
        open={openCreateUser}
        isEdit={openEditUser}
        user={currentUser}
        onClose={(user) => {
          if (user && user.id) {
            if (openEditUser) {
              const index = usersData.findIndex((u) => u.id === user.id);
              const newUsersData = [...usersData];
              newUsersData[index] = user;
              setUsersData(newUsersData);
            } else {
              setUsersData([...usersData, user]);
            }
          }
          setOpenEditUser(false);
          setOpenCreateUser(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete user'
        description='Are you sure you want to delete this user?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => {
          handleDeleteUser(currentUser.id);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default User;
