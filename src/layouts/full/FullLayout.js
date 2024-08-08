import React, { useState } from "react";
import { styled, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTheme } from "@emotion/react";

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    // console.log("Toggle Sidebar");
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    // console.log("Toggle Mobile Sidebar");
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // console.log("isSidebarOpen:", isSidebarOpen);
  // console.log("isMobileSidebarOpen:", isMobileSidebarOpen);

  const MainWrapper = styled('div')(() => ({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
  }));
  
  const PageWrapper = styled('div')(() => ({
    display: 'flex',
    flexGrow: 1,
    paddingBottom: '60px',
    flexDirection: 'column',
    zIndex: 1,
    backgroundColor: theme.palette.bg.main,
  }));
  
  const theme = useTheme();

  return (
    <MainWrapper className='mainwrapper'>
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* Main Wrapper */}
      <PageWrapper className="page-wrapper">
        {/* Header */}
        <Header
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
        />
        {/* PageContent */}
        <Container 
          sx={{
            paddingTop: "20px"
          }}
        >
          {/* Page Route */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
          {/* End Page */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
