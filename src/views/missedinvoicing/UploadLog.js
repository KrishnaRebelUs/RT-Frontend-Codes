// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
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
// import TabOneTable from "./components/TabOneTable";
// import useDebounce from "../ManageUser/components/Debounce";
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
//   const [searchValue, setSearchValue] = useState("");
//   const [businessUnitValue, setBusinessUnitValue] = useState("");
//   const [organizationValue, setOrganizationValue] = useState("");
//   const [marketPlaceValue, setMarketPlaceValue] = useState("");
//   const debouncedSearchValue = useDebounce(searchValue, 500);
//   const debouncedBusinessUnitValue = useDebounce(businessUnitValue, 500);
//   const debouncedOrganizationValue = useDebounce(organizationValue, 500);
//   const debouncedMarketPlaceValue = useDebounce(marketPlaceValue, 500);
//   const navigate = useNavigate();

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
//     navigate("/client-access");
//   };

//   return (
//     <PageContainer title="Upload Log">
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Breadcrumb titles={["Missed Invoicing" , "Upload-Log"]} />
//         </Grid>
//         <Grid item xs={12}>
//           <Header title="Upload Log" />
//         </Grid>
//         <Grid container item xs={12} alignItems="center" justifyContent="space-between">
//           <Grid item xs={6}>
//             <Typography variant="h3">Upload log</Typography>
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
//           <Grid item container xs={12} justifyContent="flex-end" spacing={1}>
//             <Grid item>
//               <ButtonStyled onClick={handleAddClick}>
//                 Reset
//               </ButtonStyled>
//             </Grid>
//             <Grid item>
//               <ButtonStyled onClick={() => console.log("Export clicked")}>
//                 <BoxStyled>Export</BoxStyled>
//                 <span className='btn-indicator'></span>
//                 <BoxStyled>
//                   <IconFileArrowRight size="19" style={{ margin: 'auto', verticalAlign: 'middle' , marginLeft: "5px" }} />
//                 </BoxStyled>
//               </ButtonStyled>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12}>
//           <TabOneTable
//             searchValue={debouncedSearchValue}
//             businessUnit={debouncedBusinessUnitValue}
//             organization={debouncedOrganizationValue}
//             marketPlace={debouncedMarketPlaceValue}
//           />
//         </Grid>
//       </Grid>
//     </PageContainer>
//   );
// };

// export default ManageAccess;



/*----------------------------------------------------------- Code With Status Color ---------------------------------------------------------*/


import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  styled,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../components/pages/Breadcrumb";
import Header from "../components/pages/Header";
import TabOneTable from "./components/TabOneTable";
import useDebounce from "../ManageUser/components/Debounce";
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
    marginLeft: "20px",
  },
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
  height: "22px",
  width: "25px",
}));

const UploadLog = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const debouncedStatusValue = useDebounce(statusValue, 500);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search submitted with values:", {
      debouncedSearchValue,
      debouncedStatusValue,
    });
  };

  const handleAddClick = () => {
    navigate("/client-access");
  };

  return (
    <PageContainer title="Upload Log">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Missed Invoicing", "Upload-Log"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="Upload Log" />
        </Grid>
        <Grid container item xs={12} alignItems="center" spacing={2}>
          <Grid item xs={12} container alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h3">Upload log</Typography>
            </Grid>
            <Grid item container spacing={2} alignItems="center" justifyContent="flex-start">
              <Grid item>
                <TextField
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  variant="outlined"
                  size="small"
                  sx={{ backgroundColor: "#ECF2FF" }}
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
              <Grid item>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 200, backgroundColor: "#ECF2FF" }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusValue}
                    onChange={handleStatusChange}
                    label="Status"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Completed"}>Completed</MenuItem>
                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Error"}>Error</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <ButtonStyled onClick={handleAddClick} style={{ height: "40px" }}>
                  Reset
                </ButtonStyled>
              </Grid>
              <Grid item>
                <ButtonStyled onClick={() => console.log("Export clicked")} style={{ marginLeft: "-5px" }}>
                  <BoxStyled>Export</BoxStyled>
                  <span className="btn-indicator"></span>
                  <BoxStyled>
                    <IconFileArrowRight size="19" style={{ margin: 'auto', verticalAlign: 'middle', marginLeft: "5px" }} />
                  </BoxStyled>
                </ButtonStyled>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TabOneTable
            searchValue={debouncedSearchValue}
            statusValue={debouncedStatusValue}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UploadLog;




