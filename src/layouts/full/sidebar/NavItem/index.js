// import React from 'react';
// import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
// import { ListItemIcon, ListItem, List, styled, ListItemText, useTheme } from '@mui/material';

// const NavItem = ({ item, level, pathDirect, onClick }) => {
//   const Icon = item.icon;
//   const theme = useTheme();
//   const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

//   const ListItemStyled = styled(ListItem)(({ theme }) => ({
//     whiteSpace: 'nowrap',
//     marginBottom: '2px',
//     padding: '8px 10px',
//     borderRadius: '8px',
//     backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
//     color: theme.palette.text.white,
//     paddingLeft: '10px',
//     '&:hover': {
//       backgroundColor: '#3f68a9',
//       color: theme.palette.text.white,
//     },
//     '&.Mui-selected': {
//       color: 'white',
//       backgroundColor: theme.palette.primary.light,
//       '&:hover': {
//         backgroundColor: theme.palette.primary.light,
//         color: 'white',
//       },
//     },
//     // Conditional margin-top for 'Download Manager & Manage Access'
//     ...(item.title === 'Download Manager' && { marginTop: '210px' }),
//     ...(item.title === 'Manage Access' && { marginTop: '10px' }),
//   }));

//   return (
//     <List component="li" disablePadding key={item.id}>
//       <ListItemStyled
//         button
//         component={item.external ? 'a' : NavLink}
//         to={item.href}
//         href={item.external ? item.href : ''}
//         disabled={item.disabled}
//         selected={pathDirect === item.href}
//         target={item.external ? '_blank' : ''}
//         onClick={onClick}
//       >
//         <ListItemIcon sx={{ minWidth: '36px', p: '3px 0', color: 'inherit' }}>
//           {itemIcon}
//         </ListItemIcon>
//         <ListItemText>{item.title}</ListItemText>
//       </ListItemStyled>
//     </List>
//   );
// };

// NavItem.propTypes = {
//   item: PropTypes.object,
//   level: PropTypes.number,
//   pathDirect: PropTypes.any,
// };

// export default NavItem;










import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ListItemIcon, ListItem, List, styled, ListItemText, useTheme } from '@mui/material';

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  whiteSpace: 'nowrap',
  marginBottom: '2px',
  padding: '8px 10px',
  borderRadius: '8px',
  backgroundColor: 'inherit',
  color: theme.palette.text.white,
  paddingLeft: '10px',
  '&:hover': {
    backgroundColor: '#3f68a9',
    color: theme.palette.text.white,
  },
  '&.Mui-selected': {
    color: 'white',
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: 'white',
    },
  },
  // Conditional margin-top for 'Download Manager & Manage Access'
  '&[data-title="Download Manager"]': {
    marginTop: '10px',
  },
  '&[data-title="Manage Access"]': {
    marginTop: '10px',
  },
  // Styles for internal links
  '&[data-title="Internal Links"]': {
    marginTop: '200px',
    fontSize: '1.2rem',  // Example of resizing text if needed
  },
}));

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '36px',
  padding: '3px 0',
  color: 'inherit',
  // Default icon size
  svg: {
    fontSize: '1.3rem',
  },
  // Resizing icon for Internal Links
  '&[data-title="Internal Links"] svg': {
    fontSize: '2rem',  // Adjust this value to resize the icon for Internal Links
  },
}));

const NavItem = ({ item, level, pathDirect, onClick }) => {
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemStyled
        button
        component={item.external ? 'a' : NavLink}
        to={item.href}
        href={item.external ? item.href : ''}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        target={item.external ? '_blank' : ''}
        onClick={onClick}
        data-title={item.title}
      >
        <ListItemIconStyled data-title={item.title}>
          {itemIcon}
        </ListItemIconStyled>
        <ListItemText>{item.title}</ListItemText>
      </ListItemStyled>
    </List>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
};

export { ListItemStyled, ListItemIconStyled };
export default NavItem;
