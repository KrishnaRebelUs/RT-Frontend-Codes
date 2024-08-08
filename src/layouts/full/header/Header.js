import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge,Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { IconBellRinging, IconMenu2 ,IconMail} from '@tabler/icons-react';
import { useTheme } from '@emotion/react';
import SelectSearch from './SelectSearch';
import SelectCurrency from './SelectCurrency';

const Header = (props) => {

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.dark,
  }));

  const theme = useTheme();

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="info"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            color: theme.palette.text.secondary
          }}
        >
          <IconMenu2 width="23" height="23" stroke="1.5" />
        </IconButton>
          <Grid container spacing={2} marginLeft='5px'>
            <Grid item xs={3}> <SelectSearch /></Grid>
            <Grid item xs={1.8} className="currency-slector"> <SelectCurrency /></Grid>
          </Grid>

        <Box flexGrow={1} />
          <Stack spacing={1} direction="row" alignItems="center">
            <IconButton
              size="large"
              aria-label="show 11 new notifications"
              color="inherit"
              aria-controls="msgs-menu"
              aria-haspopup="true"
              sx={{
                ...(typeof anchorEl2 === 'object' && {
                  color: 'primary.main',
                }),
              }}
            >
            {/* <Badge variant="dot" color="secondary">
              <IconMail size="21" stroke="1.5" />
            </Badge> */}

            </IconButton>
            <IconButton
              size="large"
              aria-label="show 11 new notifications"
              color="inherit"
              aria-controls="msgs-menu"
              aria-haspopup="true"
              sx={{
                ...(typeof anchorEl2 === 'object' && {
                  color: 'primary.main',
                }),
              }}
            >
            {/* <Badge variant="dot" color="primary">
              <IconBellRinging size="21" stroke="1.5" />
            </Badge> */}

          </IconButton>
           <h4>Profile:</h4>
            <Profile />
          </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleMobileSidebar: PropTypes.func.isRequired, 
};

export default Header;
