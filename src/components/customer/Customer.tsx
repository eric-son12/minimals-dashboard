import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Box, Chip, Grid2, Paper, Typography } from '@mui/material';

const Customer: React.FC = () => {
  const [customersData, setCustomersData] = useState<any[]>([
    {
      id: 1,
      name: 'John Smith',
      address: '123 Main Street, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      status: true,
      bankCard: '**** **** **** 1234',
      createdDate: '2024-01-15',
      updatedDate: '2024-03-20',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      address: '456 Oak Avenue, Los Angeles, CA 90001',
      phone: '+1 (555) 234-5678',
      email: 'sarah.j@email.com',
      status: true,
      bankCard: '**** **** **** 5678',
      createdDate: '2024-01-20',
      updatedDate: '2024-03-18',
    },
    {
      id: 3,
      name: 'Michael Brown',
      address: '789 Pine Road, Chicago, IL 60601',
      phone: '+1 (555) 345-6789',
      email: 'michael.b@email.com',
      status: false,
      bankCard: '**** **** **** 9012',
      createdDate: '2024-02-01',
      updatedDate: '2024-03-15',
    },
    {
      id: 4,
      name: 'Emma Wilson',
      address: '321 Maple Drive, Houston, TX 77001',
      phone: '+1 (555) 456-7890',
      email: 'emma.w@email.com',
      status: true,
      bankCard: '**** **** **** 3456',
      createdDate: '2024-02-10',
      updatedDate: '2024-03-19',
    },
    {
      id: 5,
      name: 'David Lee',
      address: '654 Elm Street, Phoenix, AZ 85001',
      phone: '+1 (555) 567-8901',
      email: 'david.l@email.com',
      status: true,
      bankCard: '**** **** **** 7890',
      createdDate: '2024-02-15',
      updatedDate: '2024-03-17',
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      address: '987 Cedar Lane, Philadelphia, PA 19101',
      phone: '+1 (555) 678-9012',
      email: 'lisa.a@email.com',
      status: false,
      bankCard: '**** **** **** 2345',
      createdDate: '2024-02-20',
      updatedDate: '2024-03-16',
    },
    {
      id: 7,
      name: 'Robert Taylor',
      address: '147 Birch Court, San Antonio, TX 78201',
      phone: '+1 (555) 789-0123',
      email: 'robert.t@email.com',
      status: true,
      bankCard: '**** **** **** 6789',
      createdDate: '2024-03-01',
      updatedDate: '2024-03-20',
    },
    {
      id: 8,
      name: 'Jennifer White',
      address: '258 Spruce Avenue, San Diego, CA 92101',
      phone: '+1 (555) 890-1234',
      email: 'jennifer.w@email.com',
      status: true,
      bankCard: '**** **** **** 0123',
      createdDate: '2024-03-05',
      updatedDate: '2024-03-19',
    },
    {
      id: 9,
      name: 'William Martinez',
      address: '369 Ash Street, Dallas, TX 75201',
      phone: '+1 (555) 901-2345',
      email: 'william.m@email.com',
      status: false,
      bankCard: '**** **** **** 4567',
      createdDate: '2024-03-10',
      updatedDate: '2024-03-18',
    },
    {
      id: 10,
      name: 'Amanda Clark',
      address: '741 Willow Road, San Jose, CA 95101',
      phone: '+1 (555) 012-3456',
      email: 'amanda.c@email.com',
      status: true,
      bankCard: '**** **** **** 8901',
      createdDate: '2024-03-15',
      updatedDate: '2024-03-20',
    },
  ]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'name',
      headerName: 'Customer',
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar alt='Avatar' sx={{ width: 40, height: 40 }}>
            {params.row.name.charAt(0)}
          </Avatar>

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
    { field: 'phone', headerName: 'Phone', width: 100, flex: 1 },
    { field: 'address', headerName: 'Address', width: 100, flex: 1 },
    { field: 'bankCard', headerName: 'Bank Card', width: 100, flex: 1 },
    { field: 'createdDate', headerName: 'Created Date', width: 120 },
    { field: 'updatedDate', headerName: 'Updated Date', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
      width: 80,
      renderCell: (params) => (
        <Chip color={params.value ? 'success' : 'error'} label={params.value ? 'Active' : 'Inactive'} />
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={customersData}
              columns={columns}
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
    </>
  );
};

export default Customer;
