import { useTheme } from '@emotion/react';
import { useMediaQuery, Box, Drawer, styled} from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';

const Sidebar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const sidebarWidth = '270px';

  const SidebarStyle = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main
  }));
  const theme = useTheme();

  if (lgUp) {
    return (
      <Box sx={{ width: sidebarWidth, flexShrink: 0 }} >
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <SidebarStyle sx={{ height: '100%' }}>
            <Box 
              p={1}
              mb={2}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                borderBottom: '1px solid #eee', 
                backgroundColor: '#fff' 
              }}
            >
              <Logo />
            </Box>
            <Box>
              <SidebarItems />
            </Box>
          </SidebarStyle>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box px={2}>
        <Logo />
      </Box>
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
