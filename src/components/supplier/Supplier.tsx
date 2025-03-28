import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Box, Button, Chip, Grid2, IconButton, Paper, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import CreateSupplierDialog from './create/CreateSupplier';
import ConfirmationDialog from '../confirmation/ConfirmationModal';

const Supplier: React.FC = () => {
  const [openCreateSupplier, setOpenCreateSupplier] = useState(false);
  const [openEditSupplier, setOpenEditSupplier] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [suppliersData, setSuppliersData] = useState<any[]>([
    {
      supplierId: 1,
      name: 'Supplier One',
      phone: '+123 456 7890',
      email: 'supplier1@example.com',
      address: '456 Elm St, Anytown, USA',
      createdDate: '2023-01-01',
      updatedDate: '2023-01-10',
      rating: 4.5,
      userId: 101,
    },
    {
      supplierId: 2,
      name: 'Supplier Two',
      phone: '+123 456 7891',
      email: 'supplier2@example.com',
      address: '789 Maple St, Anytown, USA',
      createdDate: '2023-02-01',
      updatedDate: '2023-02-10',
      rating: 4.0,
      userId: 102,
    },
    {
      supplierId: 3,
      name: 'Supplier Three',
      phone: '+123 456 7892',
      email: 'supplier3@example.com',
      address: '321 Oak St, Anytown, USA',
      createdDate: '2023-03-01',
      updatedDate: '2023-03-10',
      rating: 4.8,
      userId: 103,
    },
    {
      supplierId: 4,
      name: 'Supplier Four',
      phone: '+123 456 7892',
      email: 'supplier3@example.com',
      address: '321 Oak St, Anytown, USA',
      createdDate: '2023-03-01',
      updatedDate: '2023-03-10',
      rating: 4.9,
      userId: 103,
    },
    {
      supplierId: 5,
      name: 'Supplier Five',
      phone: '+123 456 7892',
      email: 'supplier3@example.com',
      address: '321 Oak St, Anytown, USA',
      createdDate: '2023-03-01',
      updatedDate: '2023-03-10',
      rating: 3.8,
      userId: 103,
    },
  ]);

  const [currentSupplier, setCurrentSupplier] = useState<any>(null);

  const columnsSupplier: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 80,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar alt='Avatar' sx={{ width: 40, height: 40 }}>
            {params.row.name.charAt(0).toUpperCase()}
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
    { field: 'phone', headerName: 'Phone number', width: 180 },
    { field: 'address', headerName: 'Address', width: 220 },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 120,
      renderCell: (params) => {
        return (
          <Chip
            color={params.value >= 4 ? 'success' : params.value >= 2.5 ? 'warning' : 'error'}
            label={params.value.toFixed(1)}
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
              setOpenCreateSupplier(true);
              setOpenEditSupplier(true);
              setCurrentSupplier(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentSupplier(params.row);
            }}
          >
            <img width={18} height={18} src={trashIcon} alt='' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleDeleteSupplier = (id: number) => {
    const newSuppliersData = suppliersData.filter((supplier) => supplier.supplierId !== id);
    setSuppliersData(newSuppliersData);
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
        onClick={() => setOpenCreateSupplier(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New supplier
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={suppliersData}
              columns={columnsSupplier}
              getRowId={(row) => row.supplierId}
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

      <CreateSupplierDialog
        open={openCreateSupplier}
        isEdit={openEditSupplier}
        supplier={currentSupplier}
        onClose={(supplier) => {
          if (supplier && supplier.supplierId) {
            if (openEditSupplier) {
              const index = suppliersData.findIndex((u) => u.supplierId === supplier.supplierId);
              const newSuppliersData = [...suppliersData];
              newSuppliersData[index] = supplier;
              setSuppliersData(newSuppliersData);
            } else {
              setSuppliersData([...suppliersData, supplier]);
            }
          }
          setOpenEditSupplier(false);
          setOpenCreateSupplier(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete supplier'
        description='Are you sure you want to delete this supplier?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => {
          handleDeleteSupplier(currentSupplier.supplierId);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Supplier;
