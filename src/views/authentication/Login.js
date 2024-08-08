import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, styled, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import bgImg from "src/assets/images/backgrounds/login-image.png"; 
import bgImg1 from "src/assets/images/backgrounds/Login12.png"; 
import AuthLogin from './auth/AuthLogin';

const Login2 = () => {
  const TypographyTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
  }));
  const TypographyPara = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.dark,
    marginBottom: '25px',
    fontWeight: '500',
    fontSize: '16px',
  }));

  return (
    <PageContainer title="Login" description="This is the Login page">
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>

          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <Card elevation={9} sx={{ width: '100%', maxWidth: '1000px' }}>
              <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                  {/* Adjusted the image container styles */}
                  <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <img
                      src={bgImg1}
                      alt="Background"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} pt={0}>
                  <Box sx={{ p: 4, width: '100%', height: '100%' }}  style={{padding:'0 50px'}}>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                      <Logo />
                    </Box>
                    <AuthLogin
                      title={
                        <TypographyTitle variant="h2" textAlign="center" color="textSecondary" mb={1}>
                          Welcome!
                        </TypographyTitle>
                      }
                      subtext={
                        <TypographyPara variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                          
                        </TypographyPara>
                      }
                      subtitle={
                        <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                          <Typography
                            component={Link}
                            to="/auth/register"
                            fontWeight="500"
                            sx={{
                              textDecoration: 'none',
                              color: 'primary.main',
                            }}
                          >
                            Create an account
                          </Typography>
                        </Stack>
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
