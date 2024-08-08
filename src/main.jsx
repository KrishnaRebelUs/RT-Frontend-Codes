// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

/*--------------------------------------------------------------------*/

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
)








/*------------------------------Trash------------------------------------*/

// import React, { Suspense } from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools'; 
// const queryClient = new QueryClient();


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Suspense>
//     <QueryClientProvider client={queryClient}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//     </QueryClientProvider>
//   </Suspense>,
// )