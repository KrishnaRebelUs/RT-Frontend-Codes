// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const token = sessionStorage.getItem('token');
//   const vendorId = sessionStorage.getItem('vendorId'); // Assuming vendorId is stored

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         token && vendorId ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/auth/login" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;



import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = sessionStorage.getItem('token');
  console.log('ProtectedRoute: token =', token);  
  return token ? element : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;









