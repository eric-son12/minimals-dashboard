import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Box, Chip, Grid2, IconButton, Paper, Typography } from '@mui/material';
import { pencilIcon, trashIcon } from '../../shared/icon/icon';

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
            params.value === 'Active' ? 'success' : params.value === 'Pending' ? 'warning' : 'error'
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
    renderCell: () => (
      <Box>
        <IconButton size='small'>
          <img width={18} height={18} src={pencilIcon} alt='' />
        </IconButton>
        <IconButton size='small'>
          <img width={18} height={18} src={trashIcon} alt='' />
        </IconButton>
      </Box>
    ),
  },
];

const usersData = [
  {
    id: 1,
    avatar: 'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-15.webp',
    name: 'Angelique Morse',
    email: 'benny89@yahoo.com',
    phoneNumber: '+46 8 123 456',
    department: 'Wuckert Inc',
    role: 'Content Creator',
    status: 'Banned',
  },
  {
    id: 2,
    avatar: 'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-15.webp',
    name: 'Ariana Lang',
    email: 'avery43@hotmail.com',
    phoneNumber: '+54 11 1234-5678',
    department: 'Feest Group',
    role: 'IT Administrator',
    status: 'Pending',
  },
  {
    id: 3,
    avatar: 'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-15.webp',
    name: 'Aspen Schmitt',
    email: 'mireya13@hotmail.com',
    phoneNumber: '+34 91 123 4567',
    department: 'Kihn, Marquardt and Crist',
    role: 'Financial Planner',
    status: 'Banned',
  },
  {
    id: 4,
    avatar: 'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-15.webp',
    name: 'Brycen Jimenez',
    email: 'tyrel.greenholt@gmail.com',
    phoneNumber: '+52 55 1234 5678',
    department: 'Rempel, Hand and Herzog',
    role: 'HR Recruiter',
    status: 'Active',
  },
  {
    id: 5,
    avatar: 'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-15.webp',
    name: 'Chase Day',
    email: 'joana.simonis84@gmail.com',
    phoneNumber: '+86 10 1234 5678',
    department: 'Mraz, Donnelly and Collins',
    role: 'Graphic Designer',
    status: 'Banned',
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const User: React.FC = () => {
  return (
    <Grid2 container alignItems={'center'}>
      <Grid2 size={12}>
        <Paper sx={{ p: 0 }}>
          <DataGrid
            rows={usersData}
            columns={columnsUser}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            className='datagrid-minimals-custom'
            sx={{ minHeight: 500, maxHeight: 500 }}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default User;
