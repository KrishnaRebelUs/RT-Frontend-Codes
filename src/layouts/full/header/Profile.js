// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Avatar,
//   Box,
//   Menu,
//   Button,
//   IconButton,
//   MenuItem,
//   ListItemIcon,
//   ListItemText
// } from '@mui/material';

// import { IconSettings, IconBriefcase, IconUser } from '@tabler/icons-react';

// import ProfileImg from 'src/assets/images/profile/user-1.jpg';

// const Profile = () => {
//   const [anchorEl2, setAnchorEl2] = useState(null);
//   const handleClick2 = (event) => {
//     setAnchorEl2(event.currentTarget);
//   };
//   const handleClose2 = () => {
//     setAnchorEl2(null);
//   };

//   const handleLogout = () => {
//     // Clear session storage
//     sessionStorage.removeItem('vendorId');
//     sessionStorage.removeItem('token');
//     // Navigate to login page
//   };


//   return (
//     <Box>
//       <IconButton
//         size="large"
//         aria-label="show 11 new notifications"
//         color="inherit"
//         aria-controls="msgs-menu"
//         aria-haspopup="true"
//         sx={{
//           ...(typeof anchorEl2 === 'object' && {
//             color: 'primary.main',
//           }),
//         }}
//         onClick={handleClick2}
//       >
//         <Avatar
//           src={ProfileImg}
//           alt={ProfileImg}
//           sx={{
//             width: 35,
//             height: 35,
//           }}
//         />
//       </IconButton>
//       {/* ------------------------------------------- */}
//       {/* Message Dropdown */}
//       {/* ------------------------------------------- */}
//       <Menu
//         id="msgs-menu"
//         anchorEl={anchorEl2}
//         keepMounted
//         open={Boolean(anchorEl2)}
//         onClose={handleClose2}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         sx={{
//           '& .MuiMenu-paper': {
//             width: '200px',
//           },
//         }}
//       >
//         <MenuItem>
//           <ListItemIcon>
//             <IconUser width={20} />
//           </ListItemIcon>
//           <ListItemText>My Profile</ListItemText>
//         </MenuItem>
//         <MenuItem>
//           <ListItemIcon>
//             <IconBriefcase width={20} />
//           </ListItemIcon>
//           <ListItemText>My Account</ListItemText>
//         </MenuItem>
//         <MenuItem>
//           <ListItemIcon>
//             <IconSettings width={20} />
//           </ListItemIcon>
//           <ListItemText>Settings</ListItemText>
//         </MenuItem>
//         <Box mt={1} py={1} px={2}>
//           <Button to="/auth/login" variant="outlined" color="primary" component={Link} fullWidth onClick={handleLogout}>
//             Logout
//           </Button>
//         </Box>
//       </Menu>
//     </Box>
//   );
// };

// export default Profile;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  TextField,styled,Stack
} from '@mui/material';

import { IconSettings, IconBriefcase, IconUser,IconX } from '@tabler/icons-react';

import ProfileImg1 from 'src/assets/images/profile/male2.png';
// import ProfileImg2 from 'src/assets/images/profile/user-2.png';
// import ProfileImg3 from 'src/assets/images/profile/user-3.png';
// import ProfileImg4 from 'src/assets/images/profile/user-4.png';
import ProfileImg5 from 'src/assets/images/profile/female3.png';
import ProfileImg6 from 'src/assets/images/profile/female4.png';
import ProfileImg7 from 'src/assets/images/profile/female1.png';
import ProfileImg8 from 'src/assets/images/profile/female2.png';
import ProfileImg9 from 'src/assets/images/profile/male1.png';
import ProfileImg10 from 'src/assets/images/profile/male4.png';
import ProfileImg11 from 'src/assets/images/profile/male3.png';

const ButtonClose = styled(Button)(({ theme }) => ({
  minWidth: '30px',
  height: '30px',
  backgroundColor: 'red',
  color: 'white',
  right: '15px',
  top: '15px',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: 'white'
  }
}));

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(ProfileImg11);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedAvatar(avatarList[0].src); 
    setSelectedAvatarIndex(0); 
  };
  const handleBtnClose = () => {
    setOpen(false); 
  };
  const handleAvatarMenuOpen = () => {
    setAvatarMenuOpen(true);
    setAnchorEl(null);
  };

  const handleAvatarMenuClose = () => {
    setSelectedAvatar(avatarList[selectedAvatarIndex].src);
    setAvatarMenuOpen(false);
  };

  const handleAvatarSelect = (avatar, index) => {
    setSelectedAvatarIndex(index);
  };

  const handleOpenUploadDialog = () => {
    setOpenUploadDialog(true);
    setAnchorEl(null);
  };

  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
  };

  const handleCustomAvatarSubmit = (avatarUrl) => {
    if (avatarUrl.trim() !== '') {
      setSelectedAvatar(avatarUrl);
      setOpenUploadDialog(false);
    }
  };

  const avatarList = [
    
    // { src: ProfileImg2 },
    // { src: ProfileImg3 },
    // { src: ProfileImg4 },
    
    /*-----------------Female-------------------*/
    { src: ProfileImg5 },
    { src: ProfileImg6 },
    { src: ProfileImg7 },
    { src: ProfileImg8 },

    /*-----------------Male-------------------*/
    { src: ProfileImg1 },
    { src: ProfileImg9 },
    { src: ProfileImg10 },
    { src: ProfileImg11 },
  ];

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar
          src={selectedAvatar}
          alt="Selected Avatar"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="profile-dropdown"
      >
        <MenuItem onClick={handleAvatarMenuOpen} minWidth='500'>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Choose Avatar</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconBriefcase width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconSettings width={20} />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <MenuItem>
          <Button to="/auth/login" variant="outlined" color="primary" component={Link} fullWidth>
            Logout
          </Button>
        </MenuItem>
      </Menu>

      <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog}>
        <DialogTitle>Upload Custom Avatar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="custom-avatar"
            label="Avatar URL"
            type="url"
            fullWidth
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleCustomAvatarSubmit(event.target.value);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadDialog}>Cancel</Button>
          <Button onClick={() => handleCustomAvatarSubmit(document.getElementById('custom-avatar').value)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={avatarMenuOpen} onClose={handleAvatarMenuClose} fullWidth maxWidth="xs">
      <Stack direction='row' justifyContent="space-between">
				<DialogTitle variant='h3'>Choose Avatar</DialogTitle>
				<ButtonClose><IconX onClick={handleAvatarMenuClose} size='16' /></ButtonClose>
			</Stack>
        <DialogContent>
          <Grid container spacing={2}>
            {avatarList.map((avatar, index) => (
              <Grid item xs={3} key={index}>
                <Avatar
                  src={avatar.src}
                  alt={`Avatar ${index}`}
                  sx={{
                    width: 64,
                    height: 64,
                    cursor: 'pointer',
                    border: index === selectedAvatarIndex ? '2px solid #5C84C3' : '2px solid #ddd',
                  }}
                  onClick={() => handleAvatarSelect(avatar.src, index)}
                />
                {/* <Typography variant="body2" align="center" mt={1}>
                  Avatar {index + 1}
                </Typography> */}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAvatarMenuClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
