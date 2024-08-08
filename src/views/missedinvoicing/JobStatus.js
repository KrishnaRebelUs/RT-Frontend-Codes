// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   styled,
//   Button,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import PageContainer from "../../components/container/PageContainer";
// import Breadcrumb from "../components/pages/Breadcrumb";
// import Header from "../components/pages/Header";
// import JobStatusTable from "./components/JobStatusTable";
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

// const JobStatus = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const [businessUnit, setBusinessUnit] = useState("");
//   const [organization, setOrganization] = useState("");
//   const [jobStatus, setJobStatus] = useState("");
//   const [jobPriority, setJobPriority] = useState("");
//   const debouncedSearchValue = useDebounce(searchValue, 500);
//   const navigate = useNavigate();

//   const handleSearchChange = (event) => {
//     setSearchValue(event.target.value);
//   };

//   const handleBusinessUnitChange = (event) => {
//     setBusinessUnit(event.target.value);
//   };

//   const handleOrganizationChange = (event) => {
//     setOrganization(event.target.value);
//   };

//   const handleJobStatusChange = (event) => {
//     setJobStatus(event.target.value);
//   };

//   const handleJobPriorityChange = (event) => {
//     setJobPriority(event.target.value);
//   };

//   const handleSearchSubmit = () => {
//     console.log("Search submitted with values:", {
//       debouncedSearchValue,
//       businessUnit,
//       organization,
//       jobStatus,
//       jobPriority,
//     });
//   };

//   const handleAddClick = () => {
//     navigate("/client-access");
//   };

//   return (
//     <PageContainer title="Job Status">
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Breadcrumb titles={["Missed Invoicing" , "Job Status"]} />
//         </Grid>
//         <Grid item xs={12}>
//           <Header title="Job Status" />
//         </Grid>
//         <Grid container item xs={12} alignItems="center" justifyContent="space-between">
//           <Grid item xs={6}>
//             <Typography variant="h3">Job Status</Typography>
//           </Grid>
//           <Grid item container xs={6} alignItems="center" justifyContent="flex-start" spacing={1}>
//             <Grid item>
//               <FormControl size="small" variant="outlined">
//                 <InputLabel>Business Unit</InputLabel>
//                 <Select
//                   value={businessUnit}
//                   onChange={handleBusinessUnitChange}
//                   label="Business Unit"
//                 >
//                   <MenuItem value="RT">RT</MenuItem>
//                   <MenuItem value="SamhCard">SamhCard</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item>
//               <FormControl size="small" variant="outlined">
//                 <InputLabel>Organization Name</InputLabel>
//                 <Select
//                   value={organization}
//                   onChange={handleOrganizationChange}
//                   label="Organization Name"
//                 >
//                   {/* Replace with actual options */}
//                   <MenuItem value="Org1">Org1</MenuItem>
//                   <MenuItem value="Org2">Org2</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item>
//               <FormControl size="small" variant="outlined">
//                 <InputLabel>Job Status</InputLabel>
//                 <Select
//                   value={jobStatus}
//                   onChange={handleJobStatusChange}
//                   label="Job Status"
//                 >
//                   <MenuItem value="Fetching POs">Fetching POs</MenuItem>
//                   <MenuItem value="Pending">Pending</MenuItem>
//                   <MenuItem value="Fetching Vendor Invoices">Fetching Vendor Invoices</MenuItem>
//                   <MenuItem value="QA Completed - To be Published">QA Completed - To be Published</MenuItem>
//                   <MenuItem value="Completed">Completed</MenuItem>
//                   <MenuItem value="Audit In Progress By Experts">Audit In Progress By Experts</MenuItem>
//                   <MenuItem value="No Findings">No Findings</MenuItem>
//                   <MenuItem value="Waiting for Invoicing Trigger">Waiting for Invoicing Trigger</MenuItem>
//                   <MenuItem value="Invoice Creation In Progress">Invoice Creation In Progress</MenuItem>
//                   <MenuItem value="Waiting for Batch Payment Due">Waiting for Batch Payment Due</MenuItem>
//                   <MenuItem value="Payment Matching in Progress">Payment Matching in Progress</MenuItem>
//                   <MenuItem value="Find Payment Matching">Find Payment Matching</MenuItem>
//                   <MenuItem value="No Recoupment">No Recoupment</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item>
//               <FormControl size="small" variant="outlined">
//                 <InputLabel>Job Priority</InputLabel>
//                 <Select
//                   value={jobPriority}
//                   onChange={handleJobPriorityChange}
//                   label="Job Priority"
//                 >
//                   <MenuItem value="High">High</MenuItem>
//                   <MenuItem value="Medium">Medium</MenuItem>
//                   <MenuItem value="Low">Low</MenuItem>
//                 </Select>
//               </FormControl>
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
//             <ButtonStyled onClick={() => console.log("Export clicked")}>
//               <BoxStyled>Export</BoxStyled>
//               <span className='btn-indicator'></span>
//               <BoxStyled>
//                 <IconFileArrowRight size="19" style={{ margin: 'auto', verticalAlign: 'middle' , marginLeft: "5px" }} />
//               </BoxStyled>
//             </ButtonStyled>
//           </Grid>
//           <Grid item container xs={6} justifyContent="flex-end" spacing={1}>
//             <Grid item>
//               <ButtonStyled onClick={handleAddClick}>
//                 Add Client
//               </ButtonStyled>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12}>
//           <JobStatusTable
//             searchValue={debouncedSearchValue}
//             businessUnit={businessUnit}
//             organization={organization}
//             jobStatus={jobStatus}
//             jobPriority={jobPriority}
//           />
//         </Grid>
//       </Grid>
//     </PageContainer>
//   );
// };

// export default JobStatus;










// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Checkbox,
//   ListItemText,
//   styled,
//   Button,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import PageContainer from "../../components/container/PageContainer";
// import Breadcrumb from "../components/pages/Breadcrumb";
// import Header from "../components/pages/Header";
// import JobStatusTable from "./components/JobStatusTable";
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

// const TruncatedText = styled(Typography)(({ theme }) => ({
//   whiteSpace: "nowrap",
//   overflow: "hidden",
//   textOverflow: "ellipsis",
//   maxWidth: "150px",
// }));

// const SearchBoxStyled = styled(TextField)(({ theme }) => ({
//   width: "200px",
// }));

// const CustomSelect = styled(Select)(({ theme }) => ({
//   width: "180px",
// }));

// const CustomSelectMenu = styled(MenuItem)(({ theme }) => ({
//   whiteSpace: "normal",
//   wordWrap: "break-word",
// }));

// const JobStatus = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const [businessUnit, setBusinessUnit] = useState([]);
//   const [organization, setOrganization] = useState([]);
//   const [jobStatus, setJobStatus] = useState([]);
//   const [jobPriority, setJobPriority] = useState([]);
//   const [selectAllBusinessUnit, setSelectAllBusinessUnit] = useState(false);
//   const [selectAllOrganization, setSelectAllOrganization] = useState(false);
//   const [selectAllJobStatus, setSelectAllJobStatus] = useState(false);
//   const [selectAllJobPriority, setSelectAllJobPriority] = useState(false);
//   const debouncedSearchValue = useDebounce(searchValue, 500);
//   const navigate = useNavigate();

//   const handleSearchChange = (event) => {
//     const value = event.target.value || "";
//     setSearchValue(value);
//   };

//   const handleSelectChange = (setter, items, setSelectAll) => (event) => {
//     const { value } = event.target;
//     if (Array.isArray(value)) {
//       if (value.includes("selectAll")) {
//         const newValue =
//           items.length === businessUnitOptions.length
//             ? []
//             : businessUnitOptions;
//         setter(newValue);
//         setSelectAll(newValue.length === businessUnitOptions.length);
//       } else {
//         setter(value);
//         setSelectAll(value.length === businessUnitOptions.length);
//       }
//     } else {
//       console.error("Expected an array, but got:", value);
//     }
//   };

//   const handleSearchSubmit = () => {
//     console.log("Search submitted with values:", {
//       debouncedSearchValue,
//       businessUnit,
//       organization,
//       jobStatus,
//       jobPriority,
//     });
//   };

//   const handleReset = () => {
//     setSearchValue("");
//     setBusinessUnit([]);
//     setOrganization([]);
//     setJobStatus([]);
//     setJobPriority([]);
//     setSelectAllBusinessUnit(false);
//     setSelectAllOrganization(false);
//     setSelectAllJobStatus(false);
//     setSelectAllJobPriority(false);
//   };

//   const handleExport = () => {
//     console.log("Export functionality triggered.");
//   };

//   const handleAddClick = () => {
//     navigate("/client-access");
//   };

//   const businessUnitOptions = ["RT", "SamhCard"];
//   const organizationOptions = ["Org1", "Org2"];
//   const jobStatusOptions = [
//     "Fetching POs",
//     "Pending",
//     "Fetching Vendor Invoices",
//     "QA Completed - To be Published",
//     "Completed",
//     "Audit In Progress By Experts",
//     "No Findings",
//     "Waiting for Invoicing Trigger",
//     "Invoice Creation In Progress",
//     "Waiting for Batch Payment Due",
//     "Payment Matching in Progress",
//     "Find Payment Matching",
//     "No Recoupment",
//   ];
//   const jobPriorityOptions = ["High", "Medium", "Low"];

//   const truncateSelectedItems = (items) => {
//     if (!Array.isArray(items) || items.length === 0) return "";
//     if (items.length <= 3) return items.join(", ");
//     return `${items.slice(0, 3).join(", ")}...`;
//   };

//   return (
//     <PageContainer title="Job Status">
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Breadcrumb titles={["Missed Invoicing", "Job Status"]} />
//         </Grid>
//         <Grid item xs={12}>
//           <Header title="Job Status" />
//         </Grid>
//         <Grid container item xs={12} spacing={2} alignItems="center">
//           <Grid item>
//             <Typography variant="h3">Job Status</Typography>
//           </Grid>
//           <Grid item>
//             <SearchBoxStyled
//               placeholder="Search..."
//               size="small"
//               value={searchValue}
//               onChange={handleSearchChange}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton edge="end" onClick={handleSearchSubmit}>
//                       <SearchIcon />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid item>
//             <FormControl size="small" variant="outlined">
//               <InputLabel>Business Unit</InputLabel>
//               <CustomSelect
//                 multiple
//                 value={businessUnit}
//                 onChange={handleSelectChange(
//                   setBusinessUnit,
//                   businessUnitOptions,
//                   setSelectAllBusinessUnit
//                 )}
//                 renderValue={(selected) => (
//                   <TruncatedText>
//                     {truncateSelectedItems(selected)}
//                   </TruncatedText>
//                 )}
//                 MenuProps={{
//                   PaperProps: {
//                     sx: {
//                       maxHeight: 300,
//                       width: 250, // Adjusted width
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="selectAll">
//                   <Checkbox
//                     checked={selectAllBusinessUnit}
//                     onChange={() => {
//                       const newValue = selectAllBusinessUnit
//                         ? []
//                         : businessUnitOptions;
//                       setBusinessUnit(newValue);
//                       setSelectAllBusinessUnit(!selectAllBusinessUnit);
//                     }}
//                   />
//                   <ListItemText primary="Select All" />
//                 </MenuItem>
//                 {businessUnitOptions.map((option) => (
//                   <CustomSelectMenu key={option} value={option}>
//                     <Checkbox checked={businessUnit.includes(option)} />
//                     <ListItemText primary={option} />
//                   </CustomSelectMenu>
//                 ))}
//               </CustomSelect>
//             </FormControl>
//           </Grid>
//           <Grid item>
//             <FormControl size="small" variant="outlined">
//               <InputLabel>Organization Name</InputLabel>
//               <CustomSelect
//                 multiple
//                 value={organization}
//                 onChange={handleSelectChange(
//                   setOrganization,
//                   organizationOptions,
//                   setSelectAllOrganization
//                 )}
//                 renderValue={(selected) => (
//                   <TruncatedText>
//                     {truncateSelectedItems(selected)}
//                   </TruncatedText>
//                 )}
//                 MenuProps={{
//                   PaperProps: {
//                     sx: {
//                       maxHeight: 300,
//                       width: 250, // Adjusted width
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="selectAll">
//                   <Checkbox
//                     checked={selectAllOrganization}
//                     onChange={() => {
//                       const newValue = selectAllOrganization
//                         ? []
//                         : organizationOptions;
//                       setOrganization(newValue);
//                       setSelectAllOrganization(!selectAllOrganization);
//                     }}
//                   />
//                   <ListItemText primary="Select All" />
//                 </MenuItem>
//                 {organizationOptions.map((option) => (
//                   <CustomSelectMenu key={option} value={option}>
//                     <Checkbox checked={organization.includes(option)} />
//                     <ListItemText primary={option} />
//                   </CustomSelectMenu>
//                 ))}
//               </CustomSelect>
//             </FormControl>
//           </Grid>
//           <Grid item>
//             <FormControl size="small" variant="outlined">
//               <InputLabel>Job Status</InputLabel>
//               <CustomSelect
//                 multiple
//                 value={jobStatus}
//                 onChange={handleSelectChange(
//                   setJobStatus,
//                   jobStatusOptions,
//                   setSelectAllJobStatus
//                 )}
//                 renderValue={(selected) => (
//                   <TruncatedText>
//                     {truncateSelectedItems(selected)}
//                   </TruncatedText>
//                 )}
//                 MenuProps={{
//                   PaperProps: {
//                     sx: {
//                       maxHeight: 300,
//                       width: 250, // Adjusted width
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="selectAll">
//                   <Checkbox
//                     checked={selectAllJobStatus}
//                     onChange={() => {
//                       const newValue = selectAllJobStatus
//                         ? []
//                         : jobStatusOptions;
//                       setJobStatus(newValue);
//                       setSelectAllJobStatus(!selectAllJobStatus);
//                     }}
//                   />
//                   <ListItemText primary="Select All" />
//                 </MenuItem>
//                 {jobStatusOptions.map((option) => (
//                   <CustomSelectMenu key={option} value={option}>
//                     <Checkbox checked={jobStatus.includes(option)} />
//                     <ListItemText primary={option} />
//                   </CustomSelectMenu>
//                 ))}
//               </CustomSelect>
//             </FormControl>
//           </Grid>
//           <Grid item>
//             <FormControl size="small" variant="outlined">
//               <InputLabel>Job Priority</InputLabel>
//               <CustomSelect
//                 multiple
//                 value={jobPriority}
//                 onChange={handleSelectChange(
//                   setJobPriority,
//                   jobPriorityOptions,
//                   setSelectAllJobPriority
//                 )}
//                 renderValue={(selected) => (
//                   <TruncatedText>
//                     {truncateSelectedItems(selected)}
//                   </TruncatedText>
//                 )}
//                 MenuProps={{
//                   PaperProps: {
//                     sx: {
//                       maxHeight: 300,
//                       width: 250, // Adjusted width
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem value="selectAll">
//                   <Checkbox
//                     checked={selectAllJobPriority}
//                     onChange={() => {
//                       const newValue = selectAllJobPriority
//                         ? []
//                         : jobPriorityOptions;
//                       setJobPriority(newValue);
//                       setSelectAllJobPriority(!selectAllJobPriority);
//                     }}
//                   />
//                   <ListItemText primary="Select All" />
//                 </MenuItem>
//                 {jobPriorityOptions.map((option) => (
//                   <CustomSelectMenu key={option} value={option}>
//                     <Checkbox checked={jobPriority.includes(option)} />
//                     <ListItemText primary={option} />
//                   </CustomSelectMenu>
//                 ))}
//               </CustomSelect>
//             </FormControl>
//           </Grid>
//         </Grid>
//         <Grid container item xs={12} spacing={2}>
//           <Grid item>
//             <ButtonStyled onClick={handleSearchSubmit}>
//               <IconFileArrowRight className="btn-indicator" />
//               Search
//             </ButtonStyled>
//           </Grid>
//           <Grid item>
//             <ButtonStyled onClick={handleReset}>
//               Reset
//             </ButtonStyled>
//           </Grid>
//           <Grid item>
//             <ButtonStyled onClick={handleExport}>
//               Export
//             </ButtonStyled>
//           </Grid>
//           <Grid item>
//             <ButtonStyled onClick={handleAddClick}>
//               Add
//             </ButtonStyled>
//           </Grid>
//         </Grid>
//         <Grid item xs={12}>
//           <JobStatusTable
//             searchValue={debouncedSearchValue}
//             businessUnit={businessUnit}
//             organization={organization}
//             jobStatus={jobStatus}
//             jobPriority={jobPriority}
//           />
//         </Grid>
//       </Grid>
//     </PageContainer>
//   );
// };

// export default JobStatus;













import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  styled,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../components/pages/Breadcrumb";
import Header from "../components/pages/Header";
import JobStatusTable from "./components/JobStatusTable";
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
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
}));

const TruncatedText = styled(Typography)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "150px",
}));

const SearchBoxStyled = styled(TextField)(({ theme }) => ({
  width: "200px",
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  width: "180px",
}));

const CustomSelectMenu = styled(MenuItem)(({ theme }) => ({
  whiteSpace: "normal",
  wordWrap: "break-word",
}));

const JobStatus = () => {
  const [searchValue, setSearchValue] = useState("");
  const [businessUnit, setBusinessUnit] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [jobStatus, setJobStatus] = useState([]);
  const [jobPriority, setJobPriority] = useState([]);
  const [selectAllBusinessUnit, setSelectAllBusinessUnit] = useState(false);
  const [selectAllOrganization, setSelectAllOrganization] = useState(false);
  const [selectAllJobStatus, setSelectAllJobStatus] = useState(false);
  const [selectAllJobPriority, setSelectAllJobPriority] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    const value = event.target.value || "";
    setSearchValue(value);
  };

  const handleSelectChange = (setter, items, setSelectAll) => (event) => {
    const { value } = event.target;
    if (Array.isArray(value)) {
      if (value.includes("selectAll")) {
        const newValue =
          items.length === businessUnitOptions.length
            ? []
            : items;
        setter(newValue);
        setSelectAll(newValue.length === items.length);
      } else {
        setter(value);
        setSelectAll(value.length === items.length);
      }
    } else {
      console.error("Expected an array, but got:", value);
    }
  };

  const handleSearchSubmit = () => {
    console.log("Search submitted with values:", {
      debouncedSearchValue,
      businessUnit,
      organization,
      jobStatus,
      jobPriority,
    });
  };

  const handleReset = () => {
    setSearchValue("");
    setBusinessUnit([]);
    setOrganization([]);
    setJobStatus([]);
    setJobPriority([]);
    setSelectAllBusinessUnit(false);
    setSelectAllOrganization(false);
    setSelectAllJobStatus(false);
    setSelectAllJobPriority(false);
  };

  const handleExport = () => {
    console.log("Export functionality triggered.");
  };

  const businessUnitOptions = ["RT", "SamhCard"];
  const organizationOptions = ["Org1", "Org2"];
  const jobStatusOptions = [
    "Fetching POs",
    "Pending",
    "Fetching Vendor Invoices",
    "QA Completed - To be Published",
    "Completed",
    "Audit In Progress By Experts",
    "No Findings",
    "Waiting for Invoicing Trigger",
    "Invoice Creation In Progress",
    "Waiting for Batch Payment Due",
    "Payment Matching in Progress",
    "Find Payment Matching",
    "No Recoupment",
  ];
  const jobPriorityOptions = ["High", "Medium", "Low"];

  const truncateSelectedItems = (items) => {
    if (!Array.isArray(items) || items.length === 0) return "";
    if (items.length <= 3) return items.join(", ");
    return `${items.slice(0, 3).join(", ")}...`;
  };

  return (
    <PageContainer title="Job Status">
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Missed Invoicing", "Job Status"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="Job Status" />
        </Grid>
        <Grid container item xs={12} spacing={2.5} alignItems="center">
          <Grid item>
            <Typography variant="h3">Job Status</Typography>
          </Grid>
          <Grid item>
            <SearchBoxStyled
              placeholder="Search..."
              size="small"
              value={searchValue}
              onChange={handleSearchChange}
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleSearchSubmit}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <FormControl size="small" variant="outlined">
              <InputLabel>Business Unit</InputLabel>
              <CustomSelect
                multiple
                value={businessUnit}
                onChange={handleSelectChange(
                  setBusinessUnit,
                  businessUnitOptions,
                  setSelectAllBusinessUnit
                )}
                renderValue={(selected) => (
                  <TruncatedText>
                    {truncateSelectedItems(selected)}
                  </TruncatedText>
                )}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      width: 250,
                    },
                  },
                }}
              >
                <MenuItem value="selectAll">
                  <Checkbox
                    checked={selectAllBusinessUnit}
                    onChange={() => {
                      const newValue = selectAllBusinessUnit
                        ? []
                        : businessUnitOptions;
                      setBusinessUnit(newValue);
                      setSelectAllBusinessUnit(!selectAllBusinessUnit);
                    }}
                  />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {businessUnitOptions.map((option) => (
                  <CustomSelectMenu key={option} value={option}>
                    <Checkbox checked={businessUnit.includes(option)} />
                    <ListItemText primary={option} />
                  </CustomSelectMenu>
                ))}
              </CustomSelect>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size="small" variant="outlined">
              <InputLabel>Organization Name</InputLabel>
              <CustomSelect
                multiple
                value={organization}
                onChange={handleSelectChange(
                  setOrganization,
                  organizationOptions,
                  setSelectAllOrganization
                )}
                renderValue={(selected) => (
                  <TruncatedText>
                    {truncateSelectedItems(selected)}
                  </TruncatedText>
                )}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      width: 250,
                    },
                  },
                }}
              >
                <MenuItem value="selectAll">
                  <Checkbox
                    checked={selectAllOrganization}
                    onChange={() => {
                      const newValue = selectAllOrganization
                        ? []
                        : organizationOptions;
                      setOrganization(newValue);
                      setSelectAllOrganization(!selectAllOrganization);
                    }}
                  />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {organizationOptions.map((option) => (
                  <CustomSelectMenu key={option} value={option}>
                    <Checkbox checked={organization.includes(option)} />
                    <ListItemText primary={option} />
                  </CustomSelectMenu>
                ))}
              </CustomSelect>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size="small" variant="outlined">
              <InputLabel>Job Status</InputLabel>
              <CustomSelect
                multiple
                value={jobStatus}
                onChange={handleSelectChange(
                  setJobStatus,
                  jobStatusOptions,
                  setSelectAllJobStatus
                )}
                renderValue={(selected) => (
                  <TruncatedText>
                    {truncateSelectedItems(selected)}
                  </TruncatedText>
                )}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      width: 250,
                    },
                  },
                }}
              >
                <MenuItem value="selectAll">
                  <Checkbox
                    checked={selectAllJobStatus}
                    onChange={() => {
                      const newValue = selectAllJobStatus
                        ? []
                        : jobStatusOptions;
                      setJobStatus(newValue);
                      setSelectAllJobStatus(!selectAllJobStatus);
                    }}
                  />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {jobStatusOptions.map((option) => (
                  <CustomSelectMenu key={option} value={option}>
                    <Checkbox checked={jobStatus.includes(option)} />
                    <ListItemText primary={option} />
                  </CustomSelectMenu>
                ))}
              </CustomSelect>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size="small" variant="outlined">
              <InputLabel>Job Priority</InputLabel>
              <CustomSelect
                multiple
                value={jobPriority}
                onChange={handleSelectChange(
                  setJobPriority,
                  jobPriorityOptions,
                  setSelectAllJobPriority
                )}
                renderValue={(selected) => (
                  <TruncatedText>
                    {truncateSelectedItems(selected)}
                  </TruncatedText>
                )}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      width: 250,
                    },
                  },
                }}
              >
                <MenuItem value="selectAll">
                  <Checkbox
                    checked={selectAllJobPriority}
                    onChange={() => {
                      const newValue = selectAllJobPriority
                        ? []
                        : jobPriorityOptions;
                      setJobPriority(newValue);
                      setSelectAllJobPriority(!selectAllJobPriority);
                    }}
                  />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {jobPriorityOptions.map((option) => (
                  <CustomSelectMenu key={option} value={option}>
                    <Checkbox checked={jobPriority.includes(option)} />
                    <ListItemText primary={option} />
                  </CustomSelectMenu>
                ))}
              </CustomSelect>
            </FormControl>
          </Grid>
          <Grid item>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ButtonStyled
                variant="outlined"
                onClick={handleSearchSubmit}
              >
                Search
              </ButtonStyled>
              <ButtonStyled
                variant="outlined"
                onClick={handleReset}
              >
                Reset
              </ButtonStyled>
              <ButtonStyled
                variant="contained"
                onClick={handleExport}
              >
                Export
                <Box
                  sx={{
                    borderLeft: "1px solid",
                    height: "20px",
                    marginLeft: "8px",
                    marginRight: "8px",
                  }}
                />
                <IconFileArrowRight />
              </ButtonStyled>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <JobStatusTable
            searchValue={debouncedSearchValue}
            businessUnit={businessUnit}
            organization={organization}
            jobStatus={jobStatus}
            jobPriority={jobPriority}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default JobStatus;
