import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react'; 
import Google from "src/assets/images/logos/google.png"; 

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtext }) => {
    const theme = useTheme(); 
    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box style={{paddingRight: '30px', paddingLeft: '30px'}}>
                <Stack mb={3}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='name' mb="5px">Name</Typography>
                    <CustomTextField id="name" variant="outlined" placeholder='Enter your name here' fullWidth />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="10px">Email Address</Typography>
                    <CustomTextField id="email" variant="outlined"  placeholder='Enter your email here' fullWidth />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="10px">Password</Typography>
                    <CustomTextField id="password" variant="outlined"  placeholder='Enter your password here' fullWidth />
                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth component={Link} to="/auth/login" style={{marginBottom: '15px'}}>
                  Create Account
                </Button>
                <Button
                    color="primary"
                    variant="outlined"
                    size="large"
                    fullWidth
                    component={Link}
                    to="/"
                    type="submit"
                    sx={{
                        '&:hover': {
                            border: '1px solid #5785D0',
                            color: theme.palette.primary.dark
                        },
                    }}
                >
                   <img src={Google} alt="google" style={{width:'30px', paddingRight:'10px'}} />
                    Signup with Google
                </Button>
            </Box>
            <Box marginTop={2} textAlign='center'>
                <Typography sx={{ color: theme.palette.text.dark }}>
                Already have a account? <Link to="/login" sx={{ color: theme.palette.accent.main }}> Sign In</Link>
                </Typography>
            </Box>
        </>
    );
};

export default AuthRegister;
