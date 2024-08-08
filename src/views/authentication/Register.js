import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography,styled } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthRegister from './auth/AuthRegister';
import bgImg from "src/assets/images/backgrounds/login-image.png";

const Register2 = () => {
  const TypographyTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
  }));
  return (
    <PageContainer title="Register" description="This is the Register page">
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <Card elevation={9} sx={{ width: '100%', maxWidth: '1000px' }}>
              <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <img 
                      src={bgImg} 
                      alt="Background" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} pt={0}>
                  <Box sx={{ p: 4, width: '100%', height: '100%' }}>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                      <Logo />
                    </Box>
                    <AuthRegister
                     title={
                      <TypographyTitle variant="h2" textAlign="center" color="textSecondary" mb={1}>
                         signup
                      </TypographyTitle>
                      }
                      subtext={
                        <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                          lorem ipsum dolor sit amet
                        </Typography>
                      }
                      subtitle={
                        <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                          <Typography
                            component={Link}
                            to="/auth/login"
                            fontWeight="500"
                            sx={{
                              textDecoration: 'none',
                              color: 'primary.main',
                            }}
                          >
                            Sign In
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

export default Register2;
