/*----------------------------------------------------------------- Prev Code  ---------------------------------------------------------------*/

// import React from 'react';
// import Menuitems from './MenuItems';
// import { useLocation } from 'react-router';
// import { Box, List } from '@mui/material';
// import NavItem from './NavItem';
// import NavGroup from './NavGroup/NavGroup';

// const SidebarItems = () => {
//   const { pathname } = useLocation();
//   const pathDirect = pathname;

//   return (
//     <Box sx={{ px: 2 }}>
//       <List sx={{ pt: 0 }} className="sidebarNav">
//         {Menuitems.map((item) => {
//           // {/********SubHeader**********/}
//           if (item.subheader) {
//             return <NavGroup item={item} key={item.subheader} />;

//             // {/********If Sub Menu**********/}
//             /* eslint no-else-return: "off" */
//           } else {
//             return (
//               <NavItem item={item} key={item.id} pathDirect={pathDirect} />
//             );
//           }
//         })}
//       </List>
//     </Box>
//   );
// };
// export default SidebarItems;






/*----------------------------------------------------------------- Main Code 1 ---------------------------------------------------------------*/


// import React from 'react';
// import Menuitems from './MenuItems';
// import { useLocation } from 'react-router';
// import { Box, List } from '@mui/material';
// import NavItem from './NavItem';
// import NavGroup from './NavGroup/NavGroup';

// const SidebarItems = () => {
//   const { pathname } = useLocation();
//   const pathDirect = pathname;

//   return (
//     <Box sx={{ px: 2 }}>
//       <List sx={{ pt: 0 }} className="sidebarNav">
//         {Menuitems.map((item) => (
//           <NavItem item={item} key={item.id} pathDirect={pathDirect} />
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default SidebarItems;



/*--------------------------------------------------------------- New Code ---------------------------------------------------------*/


import React from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavDropdown from './NavDropdown';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) =>
          item.children ? (
            <NavDropdown key={item.id} item={item} pathDirect={pathDirect} />
          ) : (
            <NavItem key={item.id} item={item} pathDirect={pathDirect} />
          )
        )}
      </List>
    </Box>
  );
};

export default SidebarItems;

