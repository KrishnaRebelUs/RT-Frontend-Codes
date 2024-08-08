/*----------------------------------------------------------------- My Code ---------------------------------------------------------------*/


// import React, { useEffect, useState } from 'react';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import { useRoutes } from 'react-router-dom';
// import Router from './routes/Router';
// import { baselightTheme } from "./theme/DefaultColors";
// import './App.css'

// const isMobileDevice = () => {
//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
// };

// function App() {
//   const [showErrorMessage, setShowErrorMessage] = useState(false);
//   const routing = useRoutes(Router);
//   const theme = baselightTheme;

//   useEffect(() => {
//     if (isMobileDevice()) {
//       setShowErrorMessage(true);
//     }
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {showErrorMessage ? (
//         <div style={{ textAlign: 'center', padding: '20px' }}>
//           <h1>This portal cannot be accessed on a mobile device</h1>
//         </div>
//       ) : (
//         routing
//       )}
//     </ThemeProvider>
//   );
// }

// export default App;



/*-------------------------------------------------------------------  New Code 1   -----------------------------------------------------------*/




import React, { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import routes from './routes/Router'; 
import { baselightTheme } from "./theme/DefaultColors";
import './App.css'


const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

function App() {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const routing = useRoutes(routes); 
  const theme = baselightTheme;

  useEffect(() => {
    if (isMobileDevice()) {
      setShowErrorMessage(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showErrorMessage ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>This portal cannot be accessed on a mobile device</h1>
        </div>
      ) : (
        routing
      )}
    </ThemeProvider>
  );
}

export default App;
