import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ListItemText,
  IconButton,
  Paper,
  Autocomplete,
  Chip,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';

import { uploadIcon, uploadImageIcon } from '../../../shared/icon/icon';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateProductDialog: React.FC<Props> = ({ open, onClose }) => {
  const sizeOptions = ['7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];
  const tags = ['Education', 'Food and Beverage', 'Home and Garden', 'Sports', 'Entertainment'];
  const categories = ['Technology', 'Health and Wellness', 'Travel', 'Finance'];
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
  });

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAll = () => {
    setImages([]);
  };

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    quantity: Yup.number().required('Quantity is required').min(1, 'Minimum 1 item'),
    description: Yup.string().required('Description is required'),
    size: Yup.array().min(1, 'Select at least one size'),
    category: Yup.string().required('Category is required'),
    gender: Yup.array().min(1, 'Select at least one gender'),
    tags: Yup.array().min(1, 'Select at least one tag'),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log('Product Data:', values);
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>Create Product</DialogTitle>
      <Formik
        initialValues={{
          productName: '',
          price: '',
          quantity: '',
          description: '',
          size: [''],
          category: '',
          gender: [''],
          tags: [''],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, setFieldValue, values }) => (
          <Form>
            <DialogContent>
              <Box display='flex' flexDirection='column' gap={2}>
                <Field
                  as={TextField}
                  label='Product Name'
                  name='productName'
                  fullWidth
                  variant='outlined'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.productName}
                  error={!!values.productName && !!values.productName.error}
                  helperText={
                    <ErrorMessage name='productName'>
                      {(msg) => (
                        <Typography variant='caption' color='error' sx={{ marginTop: '4px' }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                  }
                />

                <Field
                  as={TextField}
                  label='Price'
                  name='price'
                  type='number'
                  fullWidth
                  variant='outlined'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  error={!!values.price && !!values.price.error}
                  helperText={
                    <ErrorMessage name='price'>
                      {(msg) => (
                        <Typography variant='caption' color='error' sx={{ marginTop: '4px' }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                  }
                />

                <Field
                  as={TextField}
                  label='Quantity'
                  name='quantity'
                  type='number'
                  fullWidth
                  variant='outlined'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quantity}
                  error={!!values.quantity && !!values.quantity.error}
                  helperText={
                    <ErrorMessage name='quantity'>
                      {(msg) => (
                        <Typography variant='caption' color='error' sx={{ marginTop: '4px' }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                  }
                />

                <Field
                  as={TextField}
                  label='Description'
                  name='description'
                  fullWidth
                  multiline
                  rows={4}
                  variant='outlined'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  error={!!values.description && !!values.description.error}
                  helperText={
                    <ErrorMessage name='description'>
                      {(msg) => (
                        <Typography variant='caption' color='error' sx={{ marginTop: '4px' }}>
                          {msg}
                        </Typography>
                      )}
                    </ErrorMessage>
                  }
                />

                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Field
                    as={Select}
                    name='category'
                    label='Category'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Field>
                  <Typography
                    variant='caption'
                    color='error'
                    sx={{ marginLeft: 2, marginTop: '4px' }}
                  >
                    <ErrorMessage name='category' />
                  </Typography>
                </FormControl>

                <FormControl>
                  <Autocomplete
                    multiple
                    options={tags}
                    getOptionLabel={(option) => option}
                    onChange={(_, value) => setFieldValue('tags', value)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip label={option} {...getTagProps({ index })} key={option} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Tags'
                        placeholder='Select tags'
                        sx={{ mb: 1, mt: 2 }}
                      />
                    )}
                  />
                  <ErrorMessage name='tags'>
                    {(msg) => (
                      <Typography variant='caption' color='error' sx={{ marginTop: '4px' }}>
                        {msg}
                      </Typography>
                    )}
                  </ErrorMessage>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Size</InputLabel>
                  <Field
                    as={Select}
                    name='size'
                    label='Size'
                    multiple
                    value={values.size}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    renderValue={(selected: string[]) => selected.join(', ')}
                  >
                    {sizeOptions.map((size: string) => (
                      <MenuItem key={size} value={size}>
                        <Checkbox checked={values.size.includes(size)} />
                        <ListItemText primary={size} />
                      </MenuItem>
                    ))}
                  </Field>
                  <Typography
                    variant='caption'
                    color='error'
                    sx={{ marginLeft: 2, marginTop: '4px' }}
                  >
                    <ErrorMessage name='size' />
                  </Typography>
                </FormControl>

                <FormControl>
                  <FormGroup row>
                    {['Male', 'Female', 'Unisex'].map((gender: string) => (
                      <FormControlLabel
                        key={gender}
                        control={
                          <Checkbox
                            name='gender'
                            value={gender}
                            checked={values.gender.includes(gender)}
                            onChange={(e) => {
                              const newGenders = e.target.checked
                                ? [...values.gender, gender]
                                : values.gender.filter((g) => g !== gender);
                              handleChange({ target: { name: 'gender', value: newGenders } });
                            }}
                          />
                        }
                        label={gender}
                      />
                    ))}
                  </FormGroup>
                  <Typography
                    variant='caption'
                    color='error'
                    sx={{ marginLeft: 2, marginTop: '4px' }}
                  >
                    <ErrorMessage name='gender' />
                  </Typography>
                </FormControl>

                <Paper>
                  <Box>
                    <Typography mb={2} variant='h6' fontWeight='bold'>
                      Images
                    </Typography>
                    <Box
                      {...getRootProps()}
                      sx={{
                        border: '2px dashed #ddd',
                        padding: 3,
                        pt: 1,
                        borderRadius: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        marginBottom: 2,
                      }}
                    >
                      <input {...getInputProps()} />
                      <img width={190} src={uploadImageIcon} alt='' />
                      <Typography variant='h5' fontWeight='bold'>
                        Drop or select file
                      </Typography>
                      <Typography
                        variant='caption'
                        fontSize={12}
                        sx={{ color: 'var(--palette-text-secondary)' }}
                      >
                        Drop files here or click to browse through your machine.
                      </Typography>
                    </Box>

                    <Box display='flex' gap={1} flexWrap='wrap'>
                      {images.map((image, index) => (
                        <Box key={index} position='relative'>
                          <img
                            src={image.preview}
                            alt='preview'
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 8,
                              objectFit: 'cover',
                              border: '1px solid var(--palette-grey-200)',
                            }}
                          />
                          <IconButton
                            size='small'
                            onClick={() => removeImage(index)}
                            style={{
                              width: 18,
                              height: 18,
                              position: 'absolute',
                              top: -8,
                              right: -8,
                              background: 'rgba(0,0,0,0.5)',
                              color: '#fff',
                            }}
                          >
                            <CloseIcon sx={{ fontSize: 12 }} fontSize='small' />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>

                    {images.length > 0 && (
                      <Box marginTop={2} display='flex' gap={2} justifyContent='flex-end'>
                        <Button
                          variant='outlined'
                          sx={{
                            color: 'var(--palette-grey-800)',
                            bg: 'var(--palette-common-white)',
                            borderColor: 'transparent',
                            fontSize: '11px',
                            padding: 0,
                          }}
                          onClick={handleRemoveAll}
                        >
                          Remove all
                        </Button>
                        <Button
                          variant='contained'
                          sx={{
                            bgcolor: 'var(--palette-grey-800)',
                            color: 'var(--palette-common-white)',
                            fontSize: '11px',
                            padding: '6px 12px',
                            gap: '4px',
                          }}
                        >
                          <img width={16} src={uploadIcon} alt='' /> Upload
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  color: 'var(--palette-grey-800)',
                  bg: 'var(--palette-common-white)',
                  borderColor: 'transparent',
                }}
                onClick={onClose}
                variant='outlined'
              >
                Cancel
              </Button>
              <Button
                sx={{ bgcolor: 'var(--palette-grey-800)', color: 'var(--palette-common-white)' }}
                type='submit'
                variant='contained'
              >
                Create
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateProductDialog;
