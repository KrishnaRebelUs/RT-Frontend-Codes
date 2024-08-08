// import React, { lazy } from 'react';
// import { Navigate } from 'react-router-dom';
// import Loadable from '../layouts/full/shared/loadable/Loadable';

// import { Routes } from 'react-router-dom'; // Import Routes



// /* ***Layouts**** */
// const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

// /* ****Pages***** */
// const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
// const Excesscoopbilling = Loadable(lazy(() => import('../views/excesscoopbilling/Excesscoopbilling')));
// const ManageDispute = Loadable(lazy(() => import('../views/excesscoopbilling/ManageDispute')));
// const ShortageLog = Loadable(lazy(() => import('../views/shortage/Shortagelog')));
// const Shortage = Loadable(lazy(() => import('../views/shortage/ShortageClaim')));
// const ShortageClaimFinding = Loadable(lazy(() => import('../views/shortage/ShortageClaimFinding')));
// const PriceClaim = Loadable(lazy(() => import('../views/priceclaim/PriceClaim')));
// const FinancialScorecard = Loadable(lazy(() => import('../views/financialscorecard/FinancialScorecard')));
// const MissedInvoicing = Loadable(lazy(() => import('../views/missedinvoicing/MissedInvoicing')));
// const OpsChargeBack = Loadable(lazy(() => import('../views/OpsCharge/OpsChargeBack')));
// const MachineLog = Loadable(lazy(() => import('../views/MachineLogs/Machinelog')));
// const ManageUser =  Loadable(lazy(() => import('../views/ManageUser/ManageUser')));
// const ClientAccess = Loadable(lazy(() => import('../views/ManageUser/components/ClientPage')));
// const UserAccess = Loadable(lazy(() => import('../views/ManageUser/components/UserPage')));
// const GroupAccess = Loadable(lazy(() => import('../views/ManageUser/components/GroupPage')));
// const DownloadManager = Loadable(lazy(() => import('../views/DownloadManager/Download')));
// const Error = Loadable(lazy(() => import('../views/authentication/Error')));
// const Register = Loadable(lazy(() => import('../views/authentication/Register')));
// const Login = Loadable(lazy(() => import('../views/authentication/Login')));


// const Router = [
//   {
//     path: '/',
//     element: <FullLayout />,
//     children: [
//       { path: '/', element: <Navigate to="/auth/login" /> }, 
//       { path: '/dashboard', exact: true, element: <Dashboard /> },
//       { path: '/excess-coop-billing', exact: true, element: <Excesscoopbilling /> },  
//       { path: '/shortage-claim', exact: true, element: <Shortage /> }, 
//       { path: '/manage-dispute', exact: true, element: <ManageDispute /> }, 
//       { path: '/shortage-log', exact: true, element: <ShortageLog /> },
//       { path: '/shortage-claim-finding', exact: true, element: <ShortageClaimFinding /> },  
//       { path: '/price-claim', exact: true, element: <PriceClaim /> },  
//       { path: '/Machine-Logs', exact: true, element: <MachineLog /> },  
//       { path: '/manage-access', exact: true, element: <ManageUser /> },  
//       { path: '/client-access', exact: true, element: <ClientAccess /> },  
//       { path: '/user-access', exact: true, element: <UserAccess /> },  
//       { path: '/group-access', exact: true, element: <GroupAccess /> },  
//       { path: '/download-manager', exact: true, element: <DownloadManager /> },  
//       { path: '/P&l-analysis', exact: true, element: <FinancialScorecard /> },
//       { path: '/missed-invoicing', exact: true, element: <MissedInvoicing /> },
//       { path: '/ops-chargeback', exact: true, element: <OpsChargeBack /> }, 
//     ],
//   },
//   {
//     path: '/auth',
//     children: [
//       { path: '404', element: <Error /> }, 
//       { path: '/auth/register', element: <Register /> }, 
//       { path: '/auth/login', element: <Login /> }, 
//       { path: '*', element: <Navigate to="/auth/404" /> },
//     ],
//   },
// ];


// export default Router;






/*------------------------------------------------------------- Code 4 --------------------------------------------------------------------*/



import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';


// Layouts
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

// Pages
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Excesscoopbilling = Loadable(lazy(() => import('../views/excesscoopbilling/Excesscoopbilling')));
const ManageDispute = Loadable(lazy(() => import('../views/excesscoopbilling/ManageDispute')));
const ShortageLog = Loadable(lazy(() => import('../views/shortage/Shortagelog')));
const Shortage = Loadable(lazy(() => import('../views/shortage/ShortageClaim')));
const ShortageClaimFinding = Loadable(lazy(() => import('../views/shortage/ShortageClaimFinding')));
const PriceClaim = Loadable(lazy(() => import('../views/priceclaim/PriceClaim')));
const FinancialScorecard = Loadable(lazy(() => import('../views/financialscorecard/FinancialScorecard')));
const MissedInvoicing = Loadable(lazy(() => import('../views/missedinvoicing/MissedInvoicing')));
const UploadLog = Loadable(lazy(() => import('../views/missedinvoicing/UploadLog')));
const JobStatus = Loadable(lazy(() => import('../views/missedinvoicing/JobStatus')));
const OpsChargeBack = Loadable(lazy(() => import('../views/OpsCharge/OpsChargeBack')));
const MachineLog = Loadable(lazy(() => import('../views/MachineLogs/Machinelog')));
const ManageUser = Loadable(lazy(() => import('../views/ManageUser/ManageUser')));
const ClientAccess = Loadable(lazy(() => import('../views/ManageUser/components/ClientPage')));
const UserAccess = Loadable(lazy(() => import('../views/ManageUser/components/UserPage')));
const GroupAccess = Loadable(lazy(() => import('../views/ManageUser/components/GroupPage')));
const DownloadManager = Loadable(lazy(() => import('../views/DownloadManager/Download')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

// ProtectedRoute component to check if user is authenticated
const ProtectedRoute = ({ element }) => {
  const token = sessionStorage.getItem('token');
  return token ? element : <Navigate to="/auth/login" />;
};

const routes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/login" /> },
      { path: 'dashboard', element: <ProtectedRoute element={<Dashboard />} /> },
      { path: 'excess-coop-billing', element: <ProtectedRoute element={<Excesscoopbilling />} /> },
      { path: 'shortage-claim', element: <ProtectedRoute element={<Shortage />} /> },
      { path: 'manage-dispute', element: <ProtectedRoute element={<ManageDispute />} /> },
      { path: 'shortage-log', element: <ProtectedRoute element={<ShortageLog />} /> },
      { path: 'shortage-claim-finding', element: <ProtectedRoute element={<ShortageClaimFinding />} /> },
      { path: 'price-claim', element: <ProtectedRoute element={<PriceClaim />} /> },
      { path: 'machine-logs', element: <ProtectedRoute element={<MachineLog />} /> },
      { path: 'manage-access', element: <ProtectedRoute element={<ManageUser />} /> },
      { path: 'client-access', element: <ProtectedRoute element={<ClientAccess />} /> },
      { path: 'user-access', element: <ProtectedRoute element={<UserAccess />} /> },
      { path: 'group-access', element: <ProtectedRoute element={<GroupAccess />} /> },
      { path: 'download-manager', element: <ProtectedRoute element={<DownloadManager />} /> },
      { path: 'P&l-analysis', element: <ProtectedRoute element={<FinancialScorecard />} /> },
      { path: 'missed-invoicing', element: <ProtectedRoute element={<MissedInvoicing />} /> },
      { path: 'upload-log', element: <ProtectedRoute element={<UploadLog />} /> },
      { path: 'job-status', element: <ProtectedRoute element={<JobStatus />} /> },
      { path: 'ops-chargeback', element: <ProtectedRoute element={<OpsChargeBack />} /> },
      
    ],
  },
  {
    path: '/auth',
    children: [
      { path: '404', element: <Error /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default routes;



/*-------------------------------------------------------------- Code 5 ------------------------------------------------------------------*/



