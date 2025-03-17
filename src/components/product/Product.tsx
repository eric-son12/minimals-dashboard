import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Chip,
  Grid2,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import CreateProductDialog from './create/CreateProduct';

import { useNavigate } from 'react-router-dom';

const Product: React.FC = () => {
  const navigate = useNavigate();
  const [openCreateProduct, setOpenCreateProduct] = useState(false);

  const columnsProduct: GridColDef[] = [
    {
      field: 'product',
      headerName: 'Product',
      width: 300,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <img
            style={{ width: 50, height: 50, borderRadius: '8px' }}
            src={'https://api-dev-minimal-v630.pages.dev/assets/images/m-product/product-1.webp'}
            alt={params.row.name}
          />

          <Box>
            <Typography
              variant='body2'
              fontWeight={600}
              mb={0}
              sx={{ color: 'var(--palette-text-primary)' }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                navigate(`/dashboard/product/detail`);
              }}
            >
              {params.row.name}
            </Typography>
            <Typography fontSize={'13px'} mt={0.5} sx={{ color: 'var(--palette-text-secondary)' }}>
              {params.row.category}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant='body2'>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 250,
      renderCell: (params) => (
        <Box>
          <Box sx={{ mb: 0.5, width: '100%' }}>
            <LinearProgress
              color={
                params.row.stockLevel > 10
                  ? 'success'
                  : params.row.stockLevel === 0
                    ? 'error'
                    : 'warning'
              }
              variant='determinate'
              value={params.row.stockLevel}
            />
          </Box>

          <Typography variant='caption' sx={{ color: 'var(--palette-text-secondary)' }}>
            {`${params.row.stockStatus === 'out of stock' ? '' : params.row.stockLevel} ${params.row.stockStatus}`}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'price',
      headerName: 'Price ($)',
      width: 100,
      valueFormatter: (params: number) => `$${params ? params.toFixed(2) : 0}`,
    },
    {
      field: 'publishStatus',
      headerName: 'Publish Status',
      width: 150,
      renderCell: (params) => (
        <Chip color={params.value === 'Published' ? 'info' : 'default'} label={params.value} />
      ),
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

  const productData = [
    {
      id: 1,
      image: '/images/urban-explorer-sneakers.jpg',
      name: 'Urban Explorer Sneakers',
      category: 'Accessories',
      createdAt: '28 Dec 2024, 8:04 pm',
      stockStatus: 'out of stock',
      stockLevel: 0,
      price: 83.74,
      publishStatus: 'Draft',
    },
    {
      id: 2,
      image: '/images/classic-leather-loafers.jpg',
      name: 'Classic Leather Loafers',
      category: 'Shoes',
      createdAt: '27 Dec 2024, 7:04 pm',
      stockStatus: 'in stock',
      stockLevel: 72,
      price: 97.14,
      publishStatus: 'Published',
    },
    {
      id: 3,
      image: '/images/mountain-trekking-boots.jpg',
      name: 'Mountain Trekking Boots',
      category: 'Apparel',
      createdAt: '26 Dec 2024, 6:04 pm',
      stockStatus: 'low stock',
      stockLevel: 10,
      price: 68.71,
      publishStatus: 'Published',
    },
    {
      id: 4,
      image: '/images/elegance-stiletto-heels.jpg',
      name: 'Elegance Stiletto Heels',
      category: 'Shoes',
      createdAt: '25 Dec 2024, 5:04 pm',
      stockStatus: 'in stock',
      stockLevel: 72,
      price: 85.21,
      publishStatus: 'Draft',
    },
    {
      id: 5,
      image: '/images/comfy-running-shoes.jpg',
      name: 'Comfy Running Shoes',
      category: 'Apparel',
      createdAt: '24 Dec 2024, 4:04 pm',
      stockStatus: 'low stock',
      stockLevel: 10,
      price: 52.17,
      publishStatus: 'Published',
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

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
        onClick={() => setOpenCreateProduct(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New Product
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={productData}
              columns={columnsProduct}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              className='datagrid-minimals-custom'
              sx={{ minHeight: 500, maxHeight: 500 }}
            />
          </Paper>
        </Grid2>
      </Grid2>

      <CreateProductDialog open={openCreateProduct} onClose={() => setOpenCreateProduct(false)} />
    </>
  );
};

export default Product;
