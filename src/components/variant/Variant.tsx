import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, IconButton, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import CreateVariantDialog from './create/CreateVariantDialog';

const Variant: React.FC = () => {
  const [openCreateVariant, setOpenCreateVariant] = useState(false);
  const [openEditVariant, setOpenEditVariant] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<any>(null);
  const [variantsData, setVariantsData] = useState<any[]>([
    {
      id: 1,
      name: 'Color',
      description: 'Different colors available',
      variantValues: [{ value: 'Red' }, { value: 'Blue' }, { value: 'Green' }],
    },
    {
      id: 2,
      name: 'Size',
      description: 'Different sizes available',
      variantValues: [{ value: 'S' }, { value: 'M' }, { value: 'L' }],
    },
  ]);

  const columnsVariant: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'name',
      headerName: 'Variant Name',
      width: 200,
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
      flex: 1,
    },
    {
      field: 'variantValues',
      headerName: 'Values',
      width: 300,
      flex: 1,
      renderCell: (params) => params.row.variantValues.map((val: any) => val.value).join(', '),
    },
    {
      field: 'functions',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size='small'
            onClick={() => {
              setOpenCreateVariant(true);
              setOpenEditVariant(true);
              setCurrentVariant(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='Edit' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentVariant(params.row);
            }}
          >
            <img width={18} height={18} src={trashIcon} alt='Delete' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleDeleteVariant = (id: number) => {
    const newVariantsData = variantsData.filter((variant) => variant.id !== id);
    setVariantsData(newVariantsData);
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
        onClick={() => setOpenCreateVariant(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New Variant
      </Button>

      <Paper sx={{ p: 0, mt: 2 }}>
        <DataGrid
          rows={variantsData}
          columns={columnsVariant}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          className='datagrid-minimals-custom'
          sx={{ minHeight: 500, maxHeight: 500 }}
        />
      </Paper>

      <CreateVariantDialog
        open={openCreateVariant}
        isEdit={openEditVariant}
        variant={currentVariant}
        onClose={(variant) => {
          if (variant && variant.id) {
            if (openEditVariant) {
              const index = variantsData.findIndex((v) => v.id === variant.id);
              const newVariantsData = [...variantsData];
              newVariantsData[index] = variant;
              setVariantsData(newVariantsData);
            } else {
              setVariantsData([...variantsData, variant]);
            }
          }
          setOpenEditVariant(false);
          setOpenCreateVariant(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete Variant'
        description='Are you sure you want to delete this variant?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => {
          handleDeleteVariant(currentVariant.id);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Variant;
