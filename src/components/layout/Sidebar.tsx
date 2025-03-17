import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItemText, Toolbar, ListItemButton, ListSubheader } from '@mui/material';

import { MENU_ITEMS } from './menu';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Toolbar style={{ paddingLeft: 28, paddingTop: 20, paddingBottom: 4 }}>
        <img width={40} src='https://mui.com/static/logo.png' alt='app-logo' />
      </Toolbar>

      {MENU_ITEMS.map((list, index) => (
        <List
          key={index}
          sx={{ p: 2, pb: 0, pt: 1.5, width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
          component='nav'
          aria-labelledby='nested-list-subheader'
          subheader={
            <ListSubheader
              style={{
                padding: '0 12px',
                color: 'var(--palette-grey-500)',
                lineHeight: '28px',
                fontSize: '12px',
                fontWeight: 700,
              }}
              component='div'
              id='nested-list-subheader'
            >
              {list.title}
            </ListSubheader>
          }
        >
          {list.items.map((item, index) => (
            <ListItemButton
              sx={{ mb: 0.5, px: 1.5, py: 0.5, gap: 1.5, borderRadius: 2 }}
              key={index}
              onClick={() => navigate(`/dashboard/${item.pathName}`)}
            >
              <img
                style={{ width: 24, height: 24, filter: 'grayscale(1)' }}
                src={item.icon}
                alt=''
              />
              <ListItemText
                sx={{
                  color: 'var(--palette-grey-600)',
                  fontSize: '0.875rem',
                  pt: '3px',
                  pb: '3px',
                  fontWeight: 500,
                }}
                primary={item.text}
                slots={{
                  primary: (ownerState) => (
                    <span
                      style={{
                        color: ownerState.selected
                          ? 'var(--palette-text-primary)'
                          : 'var(--palette-grey-600)',
                      }}
                    >
                      {item.text}
                    </span>
                  ),
                }}
              />
            </ListItemButton>
          ))}
        </List>
      ))}
    </>
  );
};

export default Sidebar;
