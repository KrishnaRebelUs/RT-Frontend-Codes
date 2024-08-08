import React from 'react';
import { styled, ListItem, Grid, Typography } from '@mui/material';
// import man from "src/assets/images/Header/overbilling.png"; 

const Header = ({ title }) => {
  const ListItemStyled = styled(ListItem)(({ theme }) => ({
    whiteSpace: 'nowrap',
    marginBottom: '2px',
    padding: '20px 25px',
    borderRadius: '8px',
    backgroundColor: theme.palette.primary.light,
    paddingLeft: '10px',
  }));
  const TypographyStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
  }));

  return (
    <ListItemStyled>
      <Grid container spacing={2} alignItems="center" justifyContent='space-between' marginTop={0} marginLeft={0}>
        <Grid item xs={6} style={{ paddingTop: '0', marginTop:'0', paddingLeft:'16px'}}>
          <TypographyStyled variant="h3">
            {title}
            </TypographyStyled>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'end', paddingTop: '0', marginTop: '0' }}>
          {/* <img src={man} alt="Man working on laptop" style={{ width: '70px' }} /> */}
        </Grid>
      </Grid>
    </ListItemStyled>
  );
};

export default Header;
