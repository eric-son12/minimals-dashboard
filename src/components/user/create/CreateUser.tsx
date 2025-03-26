import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid2 as Grid,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import * as Yup from 'yup';

interface Props {
  open: boolean;
  isEdit?: boolean;
  user?: any;
  onClose: (values: any) => void;
}

const CreateUserDialog: React.FC<Props> = ({ open, isEdit, user, onClose }) => {
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState<any>(null);
  const [roles, setRoles] = useState(['Staff', 'Manager']);

  useEffect(() => {
    if (isEdit && user) {
      setUserData(user);
      setAvatar(user.avatar);
    } else {
      setUserData(null);
    }
  }, [isEdit, user]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string(),
    department: Yup.string(),
    role: Yup.string(),
  });

  const handleAvatarChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit User' : 'New User'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: userData ? userData.name : '',
            email: userData ? userData.email : '',
            phoneNumber: userData ? userData.phoneNumber : '',
            address: userData ? userData.address : '',
            department: userData ? userData.department : '',
            role: userData ? userData.role : '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            let userData;
            if (!isEdit) {
              userData = {
                ...values,
                avatar,
                id: 10,
                status: 'Pending',
              };
            } else {
              userData = {
                ...values,
                id: user.id,
                status: user.status,
                avatar,
              };
            }
            console.log('User Data:', userData);
            setAvatar(null);
            onClose(userData);
          }}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 4,
                }}
              >
                <Avatar src={avatar} sx={{ width: 80, height: 80 }} />
                <input
                  accept='image/*'
                  type='file'
                  id='avatar-upload'
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
                <label htmlFor='avatar-upload'>
                  <Button component='span'>
                    <PhotoCamera />
                    Upload Avatar
                  </Button>
                </label>
              </Box>

              <Grid container spacing={3}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='name'
                    label='Full name'
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='email'
                    label='Email address'
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='phoneNumber'
                    label='Phone number'
                    value={values.phoneNumber}
                    onChange={handleChange}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='address'
                    label='Address'
                    value={values.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    name='department'
                    label='Department'
                    value={values.department}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Field
                      as={Select}
                      name='role'
                      label='Role'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.role}
                    >
                      {roles.map((role, index) => (
                        <MenuItem key={index} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Field>
                    <Typography
                      variant='caption'
                      color='error'
                      sx={{ marginLeft: 2, marginTop: '4px' }}
                    >
                      <ErrorMessage name='role' />
                    </Typography>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justifyContent='flex-end' mt={2}>
                <Button
                  sx={{
                    color: 'var(--palette-grey-800)',
                    bg: 'var(--palette-common-white)',
                    borderColor: 'transparent',
                    mr: 2,
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
                  {isEdit ? 'Save' : 'Create'}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
