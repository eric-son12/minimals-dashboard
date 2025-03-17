import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Drawer,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

import Sidebar from './Sidebar';
import { notificationIcon, searchIcon, settingIcon } from '../../shared/icon/icon';
import { MENU_ITEMS } from './menu';

const drawerWidth = 240;

const Layout: React.FC = () => {
  const location = useLocation();
  const currentPathName = location.pathname.split('/').pop() || 'Overview';

  const [isHideBreadcrumbs, setIsHideBreadcrumbs] = useState(false);

  useEffect(() => {
    const currentPathName = location.pathname.split('/').pop() || 'Overview';
    const managementItem = MENU_ITEMS.find((item) => item.title === 'Management');
    if (managementItem && currentPathName) {
      const managementPathName = managementItem.items.map((item) => item.pathName);
      if (managementPathName.includes(currentPathName)) {
        setIsHideBreadcrumbs(true);
      } else {
        setIsHideBreadcrumbs(false);
      }
    } else {
      setIsHideBreadcrumbs(false);
    }
  }, [location]);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 0,
            borderRadius: 0,
            padding: 0,
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: `calc(100vw - ${drawerWidth}px)`,
        }}
      >
        {/* Header */}
        <AppBar
          position='sticky'
          sx={{
            py: 0.5,
            bgcolor: 'white',
            boxShadow: 'none',
            pl: '28px',
            pr: '40px',
            bgColor: 'rgba(255, 255, 255, 0.36)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Toolbar sx={{ p: '0 !important' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex' }}>
                <IconButton>
                  <MenuOpenOutlinedIcon />
                </IconButton>
                <TextField
                  placeholder='Search...'
                  variant='outlined'
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <img width={18} src={searchIcon} alt='' />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    ml: 2,
                    '.MuiInputBase-adornedStart': {
                      paddingLeft: '8px',
                    },
                    '.MuiOutlinedInput-input': {
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      fontSize: '12px',
                    },
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton>
                  <img width={24} height={24} src={notificationIcon} alt='' />
                </IconButton>
                <IconButton>
                  <img width={24} height={24} src={settingIcon} alt='' />
                </IconButton>
                <Avatar
                  sx={{ ml: 1, width: 40, height: 40 }}
                  alt='User'
                  src='https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp'
                />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          component='main'
          sx={{
            position: 'relative',
            flexGrow: 1,
            px: '40px',
            py: 2,
            bgcolor: 'var(--palette-background-paper)',
            minHeight: 'calc(100vh - 72px)',
          }}
        >
          <Stack sx={{ mb: 4 }} spacing={2}>
            <Typography variant='h3'>
              {currentPathName
                ? currentPathName[0].toLocaleUpperCase() + currentPathName.slice(1)
                : ''}
            </Typography>

            {isHideBreadcrumbs && (
              <Breadcrumbs
                sx={{ fontSize: '13px', fontWeight: 500, color: 'var(--palette-text-primary)' }}
                separator='•'
                aria-label='breadcrumb'
              >
                <Link underline='hover' color='inherit' href='/dashboard'>
                  Dashboard
                </Link>
                <Link
                  underline='hover'
                  color='inherit'
                  href='/material-ui/getting-started/installation/'
                >
                  {currentPathName
                    ? currentPathName[0].toLocaleUpperCase() + currentPathName.slice(1)
                    : ''}
                </Link>
                <Typography
                  fontSize={'13px'}
                  fontWeight={500}
                  sx={{ color: 'var(--palette-text-secondary)' }}
                >
                  List
                </Typography>
              </Breadcrumbs>
            )}
          </Stack>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
