// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import {
//     Box,
//     Typography,
//     FormGroup,
//     FormControlLabel,
//     Button,
//     Stack,
//     Checkbox,
//     TextField,
//     styled
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';
// import axios from 'axios';
// import config from '../../../../config';

// const TypographyPara = styled(Typography)(({ theme }) => ({
//     color: theme.palette.text.dark,
//     fontWeight: '500',
//     textDecoration: 'none'
// }));

// const AuthLogin = ({ title, subtext }) => {
//     const theme = useTheme();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const BASE_URL = config.UniUrl;



//     const handleLogin = async (username, password) => {
//         setLoading(true);
//         setError(null);
//         try {

//             //const response = await axios.post('http://16.170.22.123:8082/auth/login', { username, password });
//             const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
//             const { jwtToken } = response.data;
//             sessionStorage.setItem('token', jwtToken);
//             // console.log("Token Received", jwtToken);
//             // Check if jwtToken exists
//             if (jwtToken) {
//                 // Navigate only if jwtToken exists
//                 navigate('/dashboard');
//             } else {
//                 setError('Invalid credentials. Please try again.');
//             }
//         } catch (error) {
//             setError('Login failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const email = event.target.email.value;
//         const password = event.target.password.value;
//         handleLogin(email, password);
//     };

//     return (
//         <>
//             {title && (
//                 <Typography fontWeight="700" variant="h2" mb={1}>
//                     {title}
//                 </Typography>
//             )}
//             {subtext}

//             <form onSubmit={handleSubmit}>
//                 <Stack spacing={2}>
//                     <Box paddingBottom={2}>
//                         <TextField
//                             id="email"
//                             name="email"
//                             variant="outlined"
//                             placeholder="Enter your email here"
//                             fullWidth
//                         />
//                     </Box>
//                     <Box>
//                         <TextField
//                             id="password"
//                             name="password"
//                             type="password"
//                             variant="outlined"
//                             placeholder="Enter your password here"
//                             fullWidth
//                         />
//                     </Box>
//                     <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
//                         <FormGroup>
//                             <FormControlLabel
//                                 control={<Checkbox defaultChecked color="primary" />}
//                                 label="Remember this device"
//                             />
//                         </FormGroup>
//                         <TypographyPara
//                             component={Link}
//                             to="/forgot-password"
//                         >
//                             Forgot Password?
//                         </TypographyPara>
//                     </Stack>
//                 </Stack>
//                 <Box marginTop={1}>
//                     <Button
//                         color="primary"
//                         variant="contained"
//                         size="large"
//                         fullWidth
//                         type="submit"
//                         disabled={loading}
//                         sx={{
//                             '&:hover': {
//                                 backgroundColor: theme.palette.primary.main,
//                             },
//                         }}
//                     >
//                         {loading ? 'Signing In...' : 'Sign In'}
//                     </Button>
//                 </Box>
//                 {error && (
//                     <Typography color="error" variant="body2" mt={1}>
//                         {error}
//                     </Typography>
//                 )}
//             </form>
//         </>
//     );
// };

// export default AuthLogin;




/*---------------------------------------------------------------- New Code --------------------------------------------------------------------*/




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import {
//     Box,
//     Typography,
//     FormGroup,
//     FormControlLabel,
//     Button,
//     Stack,
//     Checkbox,
//     TextField,
//     styled
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useTheme } from '@emotion/react';
// import axios from 'axios';
// import config from '../../../../config';

// const TypographyPara = styled(Typography)(({ theme }) => ({
//     color: theme.palette.text.dark,
//     fontWeight: '500',
//     textDecoration: 'none'
// }));

// const AuthLogin = ({ title, subtext }) => {
//     const theme = useTheme();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const BASE_URL = config.UniUrl;

//     const handleLogin = async (username, password) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.post(`http://35.153.186.247:8082/auth/login`, { username, password });
//             // const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
//             const { jwtToken, userId } = response.data;
//             sessionStorage.setItem('token', jwtToken);
//             sessionStorage.setItem('userId', userId);
//             sessionStorage.setItem('userName', username);
//             // console.log("The userId is " + userId);
//             // console.log("The userName is " + username);
//             if (jwtToken) {
//                 navigate('/dashboard');
//             } else {
//                 setError('Invalid credentials. Please try again.');
//             }
//         } catch (error) {
//             setError('Login failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const email = event.target.email.value;
//         const password = event.target.password.value;
//         handleLogin(email, password);
//     };

//     return (
//         <>
//             {title && (
//                 <Typography fontWeight="700" variant="h2" mb={1}>
//                     {title}
//                 </Typography>
//             )}
//             {subtext}

//             <form onSubmit={handleSubmit}>
//                 <Stack spacing={2}>
//                     <Box paddingBottom={2}>
//                         <TextField
//                             id="email"
//                             name="email"
//                             variant="outlined"
//                             placeholder="Enter your email here"
//                             fullWidth
//                         />
//                     </Box>
//                     <Box>
//                         <TextField
//                             id="password"
//                             name="password"
//                             type="password"
//                             variant="outlined"
//                             placeholder="Enter your password here"
//                             fullWidth
//                         />
//                     </Box>
//                     <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
//                         <FormGroup>
//                             <FormControlLabel
//                                 control={<Checkbox defaultChecked color="primary" />}
//                                 label="Remember this device"
//                             />
//                         </FormGroup>
//                         <TypographyPara
//                             component={Link}
//                             to="/forgot-password"
//                         >
//                             Forgot Password?
//                         </TypographyPara>
//                     </Stack>
//                 </Stack>
//                 <Box marginTop={1}>
//                     <Button
//                         color="primary"
//                         variant="contained"
//                         size="large"
//                         fullWidth
//                         type="submit"
//                         disabled={loading}
//                         sx={{
//                             '&:hover': {
//                                 backgroundColor: theme.palette.primary.main,
//                             },
//                         }}
//                     >
//                         {loading ? 'Signing In...' : 'Sign In'}
//                     </Button>
//                 </Box>
//                 {error && (
//                     <Typography color="error" variant="body2" mt={1}>
//                         {error}
//                     </Typography>
//                 )}
//             </form>
//         </>
//     );
// };

// export default AuthLogin;




/*--------------------------------------------------------------------------------------------------------------------------------------*/


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  TextField,
  styled
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import config from '../../../../config';

const TypographyPara = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.dark,
  fontWeight: '500',
  textDecoration: 'none'
}));

const AuthLogin = ({ title, subtext }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = config.UniUrl;

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`http://35.153.186.247:8082/auth/login`, { username, password });
      const { jwtToken, userId } = response.data;
      console.log('Login response:', response.data);  // Add this line for debugging
      sessionStorage.setItem('token', jwtToken);
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('userName', username);
      if (jwtToken) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    handleLogin(email, password);
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}
      {subtext}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box paddingBottom={2}>
            <TextField
              id="email"
              name="email"
              variant="outlined"
              placeholder="Enter your email here"
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              id="password"
              name="password"
              type="password"
              variant="outlined"
              placeholder="Enter your password here"
              fullWidth
            />
          </Box>
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked color="primary" />}
                label="Remember this device"
              />
            </FormGroup>
            <TypographyPara
              component={Link}
              to="/forgot-password"
            >
              Forgot Password?
            </TypographyPara>
          </Stack>
        </Stack>
        <Box marginTop={1}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>
        {error && (
          <Typography color="error" variant="body2" mt={1}>
            {error}
          </Typography>
        )}
      </form>
    </>
  );
};

export default AuthLogin;
