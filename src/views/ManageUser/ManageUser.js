// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Tab,
//   Tabs,
//   IconButton,
//   InputAdornment,
//   TextField,
//   styled,
//   Button,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import PageContainer from "../../components/container/PageContainer";
// import Breadcrumb from "../components/pages/Breadcrumb";
// import Header from "../components/pages/Header";
// import TabOneTable from "./components/Client";
// import TabTwoTable from "./components/User";
// import TabThreeTable from "./components/Group";
// import useDebounce from "./components/Debounce";
// import { IconFileArrowRight } from "@tabler/icons-react";
// import { useNavigate } from "react-router-dom";

// const ButtonStyled = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.contrast,
//   border: "1px solid",
//   borderColor: theme.palette.primary.contrast,
//   color: theme.palette.primary.contrastText,
//   fontSize: "15px",
//   padding: "8px 16px",
//   fontWeight: "600",
//   transition: "all ease 0.3s",
//   margin: "0 8px", 
//   display: "flex",
//   alignItems: "center",
//   "&:hover": {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     borderColor: theme.palette.primary.main,
//   },
//   "& .btn-indicator": {
//     width: "1px",
//     backgroundColor: theme.palette.primary.main,
//     alignSelf: "stretch",
//     marginLeft: "4px",
//   },
// }));

// const BoxStyled = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   marginRight: "8px",
// }));

// const ManageAccess = () => {
//   const [tabValue, setTabValue] = useState(0);
//   const [searchValue, setSearchValue] = useState("");
//   const [businessUnitValue, setBusinessUnitValue] = useState("");
//   const [organizationValue, setOrganizationValue] = useState("");
//   const [marketPlaceValue, setMarketPlaceValue] = useState("");
//   const debouncedSearchValue = useDebounce(searchValue, 500);
//   const debouncedBusinessUnitValue = useDebounce(businessUnitValue, 500);
//   const debouncedOrganizationValue = useDebounce(organizationValue, 500);
//   const debouncedMarketPlaceValue = useDebounce(marketPlaceValue, 500);
//   const navigate = useNavigate();

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleSearchChange = (event) => {
//     setSearchValue(event.target.value);
//   };

//   const handleBusinessUnitChange = (event) => {
//     setBusinessUnitValue(event.target.value);
//   };

//   const handleOrganizationChange = (event) => {
//     setOrganizationValue(event.target.value);
//   };

//   const handleMarketPlaceChange = (event) => {
//     setMarketPlaceValue(event.target.value);
//   };

//   const handleSearchSubmit = () => {
//     console.log("Search submitted with values:", {
//       debouncedSearchValue,
//       debouncedBusinessUnitValue,
//       debouncedOrganizationValue,
//       debouncedMarketPlaceValue,
//     });
//   };

//   const handleAddClick = () => {
//     let link = "";
//     switch (tabValue) {
//       case 0:
//         link = "/client-access";
//         break;
//       case 1:
//         link = "/user-access";
//         break;
//       case 2:
//         link = "/group-access";
//         break;
//       default:
//         link = "/";
//         break;
//     }
//     navigate(link); 
//   };

//   const TabPanel = (props) => {
//     const { children, value, index, ...other } = props;
//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
//       </div>
//     );
//   };

//   const getTitle = () => {
//     switch (tabValue) {
//       case 0:
//         return "Manage Clients";
//       case 1:
//         return "Manage Users";
//       case 2:
//         return "Manage Groups";
//       default:
//         return "Manage";
//     }
//   };

//   return (
//     <PageContainer title="Manage Access">
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Breadcrumb titles={["Manage Access"]} />
//         </Grid>
//         <Grid item xs={12}>
//           <Header title="Manage Access" />
//         </Grid>
//         <Grid container item xs={12} alignItems="center" justifyContent="space-between">
//           <Grid item xs={6}>
//             <Typography variant="h3">{getTitle()}</Typography>
//           </Grid>
//           <Grid item container xs={6} alignItems="center" justifyContent="flex-start" spacing={1}>
//             <Grid item>
//               <TextField
//                 placeholder="Search Business Unit"
//                 value={businessUnitValue}
//                 onChange={handleBusinessUnitChange}
//                 variant="outlined"
//                 size="small"
//                 sx={{backgroundColor: "#ECF2FF"}}
//               />
//             </Grid>
//             <Grid item>
//               <TextField
//                 placeholder="Search Org Name"
//                 value={organizationValue}
//                 onChange={handleOrganizationChange}
//                 variant="outlined"
//                 size="small"
//                 sx={{backgroundColor: "#ECF2FF"}}
//               />
//             </Grid>
//             <Grid item>
//               <TextField
//                 placeholder="Search Market Place"
//                 value={marketPlaceValue}
//                 onChange={handleMarketPlaceChange}
//                 variant="outlined"
//                 size="small"
//                 sx={{backgroundColor: "#ECF2FF"}}
//               />
//             </Grid>
//             <Grid item ml={-100} mt={-2.5}>
//               <TextField
//                 placeholder="Search..."
//                 value={searchValue}
//                 onChange={handleSearchChange}
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   width: "200px",
//                   mt: 2.5,
//                   backgroundColor: "#ECF2FF",
//                 }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={handleSearchSubmit} edge="end">
//                         <SearchIcon />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid container item xs={12} justifyContent="space-between" alignItems="center" spacing={1} sx={{ mt: 2 }}>
//           <Grid item xs={6}>
//             <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example">
//               <Tab label="Clients" />
//               <Tab label="Users" />
//               <Tab label="Groups" />
//             </Tabs>
//           </Grid>
//           <Grid item container xs={6} justifyContent="flex-end" spacing={1}>
//             <Grid item>
//               <ButtonStyled onClick={() => console.log("Export clicked")}>
//                 <BoxStyled>Export</BoxStyled>
//                 <span className='btn-indicator'></span>
//                 <BoxStyled>
//                   <IconFileArrowRight size="19" style={{ margin: 'auto', verticalAlign: 'middle' , marginLeft: "5px" }} />
//                 </BoxStyled>
//               </ButtonStyled>
//             </Grid>
//             <Grid item>
//               <ButtonStyled onClick={handleAddClick}>
//                 Add {getTitle().split(" ")[1]}
//               </ButtonStyled>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12}>
//           <TabPanel value={tabValue} index={0}>
//             <TabOneTable
//               searchValue={debouncedSearchValue}
//               businessUnit={debouncedBusinessUnitValue}
//               organization={debouncedOrganizationValue}
//               marketPlace={debouncedMarketPlaceValue}
//             />
//           </TabPanel>
//           <TabPanel value={tabValue} index={1}>
//             <TabTwoTable
//               searchValue={debouncedSearchValue}
//               businessUnit={debouncedBusinessUnitValue}
//               organization={debouncedOrganizationValue}
//               marketPlace={debouncedMarketPlaceValue}
//             />
//           </TabPanel>
//           <TabPanel value={tabValue} index={2}>
//             <TabThreeTable
//               searchValue={debouncedSearchValue}
//               businessUnit={debouncedBusinessUnitValue}
//               organization={debouncedOrganizationValue}
//               marketPlace={debouncedMarketPlaceValue}
//             />
//           </TabPanel>
//         </Grid>
//       </Grid>
//     </PageContainer>
//   );
// };

// export default ManageAccess;


/*----------------------------------------------------------------- New Code -----------------------------------------------------------------*/


import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Tab,
  Tabs,
  IconButton,
  InputAdornment,
  TextField,
  styled,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../components/pages/Breadcrumb";
import Header from "../components/pages/Header";
import TabOneTable from "./components/Client";
import TabTwoTable from "./components/User";
import TabThreeTable from "./components/Group";
import useDebounce from "./components/Debounce";
import { IconFileArrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrast,
  border: "1px solid",
  borderColor: theme.palette.primary.contrast,
  color: theme.palette.primary.contrastText,
  fontSize: "15px",
  padding: "8px 16px",
  fontWeight: "600",
  transition: "all ease 0.3s",
  margin: "0 8px",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.main,
  },
  "& .btn-indicator": {
    width: "1px",
    backgroundColor: theme.palette.primary.main,
    alignSelf: "stretch",
    marginLeft: "4px",
  },
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
}));

const TabPanel = React.memo(({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
});

const ManageAccess = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [businessUnitValue, setBusinessUnitValue] = useState("");
  const [organizationValue, setOrganizationValue] = useState("");
  const [marketPlaceValue, setMarketPlaceValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const debouncedBusinessUnitValue = useDebounce(businessUnitValue, 500);
  const debouncedOrganizationValue = useDebounce(organizationValue, 500);
  const debouncedMarketPlaceValue = useDebounce(marketPlaceValue, 500);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleBusinessUnitChange = (event) => {
    setBusinessUnitValue(event.target.value);
  };

  const handleOrganizationChange = (event) => {
    setOrganizationValue(event.target.value);
  };

  const handleMarketPlaceChange = (event) => {
    setMarketPlaceValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search submitted with values:", {
      debouncedSearchValue,
      debouncedBusinessUnitValue,
      debouncedOrganizationValue,
      debouncedMarketPlaceValue,
    });
  };

  const handleAddClick = () => {
    let link = "";
    switch (tabValue) {
      case 0:
        link = "/client-access";
        break;
      case 1:
        link = "/user-access";
        break;
      case 2:
        link = "/group-access";
        break;
      default:
        link = "/";
        break;
    }
    navigate(link);
  };

  const getTitle = () => {
    switch (tabValue) {
      case 0:
        return "Manage Clients";
      case 1:
        return "Manage Users";
      case 2:
        return "Manage Groups";
      default:
        return "Manage";
    }
  };

  return (
    <PageContainer title="Manage Access">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Manage Access"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="Manage Access" />
        </Grid>
        <Grid container item xs={12} alignItems="center" justifyContent="space-between">
          <Grid item xs={6}>
            <Typography variant="h3">{getTitle()}</Typography>
          </Grid>
          <Grid item container xs={6} alignItems="center" justifyContent="flex-start" spacing={1}>
            <Grid item>
              <TextField
                placeholder="Search Business Unit"
                value={businessUnitValue}
                onChange={handleBusinessUnitChange}
                variant="outlined"
                size="small"
                sx={{backgroundColor: "#ECF2FF"}}
              />
            </Grid>
            <Grid item>
              <TextField
                placeholder="Search Org Name"
                value={organizationValue}
                onChange={handleOrganizationChange}
                variant="outlined"
                size="small"
                sx={{backgroundColor: "#ECF2FF"}}
              />
            </Grid>
            <Grid item>
              <TextField
                placeholder="Search Market Place"
                value={marketPlaceValue}
                onChange={handleMarketPlaceChange}
                variant="outlined"
                size="small"
                sx={{backgroundColor: "#ECF2FF"}}
              />
            </Grid>
            <Grid item ml={-100} mt={-2.5}>
              <TextField
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
                variant="outlined"
                size="small"
                sx={{
                  width: "200px",
                  mt: 2.5,
                  backgroundColor: "#ECF2FF",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearchSubmit} edge="end">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} justifyContent="space-between" alignItems="center" spacing={1} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example">
              <Tab label="Clients" />
              <Tab label="Users" />
              <Tab label="Groups" />
            </Tabs>
          </Grid>
          <Grid item container xs={6} justifyContent="flex-end" spacing={1}>
            <Grid item>
              <ButtonStyled onClick={() => console.log("Export clicked")}>
                <BoxStyled>Export</BoxStyled>
                <span className='btn-indicator'></span>
                <BoxStyled>
                  <IconFileArrowRight size="19" style={{ margin: 'auto', verticalAlign: 'middle' , marginLeft: "5px" }} />
                </BoxStyled>
              </ButtonStyled>
            </Grid>
            <Grid item>
              <ButtonStyled onClick={handleAddClick}>
                Add {getTitle().split(" ")[1]}
              </ButtonStyled>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={tabValue} index={0}>
            <TabOneTable
              searchValue={debouncedSearchValue}
              businessUnit={debouncedBusinessUnitValue}
              organization={debouncedOrganizationValue}
              marketPlace={debouncedMarketPlaceValue}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <TabTwoTable
              searchValue={debouncedSearchValue}
              businessUnit={debouncedBusinessUnitValue}
              organization={debouncedOrganizationValue}
              marketPlace={debouncedMarketPlaceValue}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <TabThreeTable
              searchValue={debouncedSearchValue}
              businessUnit={debouncedBusinessUnitValue}
              organization={debouncedOrganizationValue}
              marketPlace={debouncedMarketPlaceValue}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ManageAccess;
