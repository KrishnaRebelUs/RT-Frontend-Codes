import React, { useState } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
  styled,
} from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../components/pages/Breadcrumb";
import Header from "../components/pages/Header";
import MachineLogTable from "./components/MachineLogTable";
import { IconFileArrowRight } from "@tabler/icons-react";


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

const MachineLog = () => {
  const [selectedMachineName, setSelectedMachineName] = useState("");
  const [selectedJobPriority, setSelectedJobPriority] = useState("");

  const handleMachineNameChange = (event) => {
    setSelectedMachineName(event.target.value);
  };

  const handleJobPriorityChange = (event) => {
    setSelectedJobPriority(event.target.value);
  };

  const handleExport = () => {
    
    console.log("Export button clicked");
  };

  return (
    <PageContainer title="Machine Log">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Machine Log"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="Machine Logs" />
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={6}>
            <Typography variant="h3">Manage Machine Logs</Typography>
          </Grid>
          <Grid item container xs={6} alignItems="center" justifyContent="flex-end" spacing={1}>
            <Grid item>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 160, mr: 1 }}>
                <InputLabel id="machine-name-label">Machine Name</InputLabel>
                <Select
                  labelId="machine-name-label"
                  value={selectedMachineName}
                  onChange={handleMachineNameChange}
                  label="Machine Name"
                  sx={{backgroundColor: "#ECF2FF"}}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="machine1">Machine 1</MenuItem>
                  <MenuItem value="machine2">Machine 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 140, mr: 1 }}>
                <InputLabel id="job-priority-label">Job Priority</InputLabel>
                <Select
                  labelId="job-priority-label"
                  value={selectedJobPriority}
                  onChange={handleJobPriorityChange}
                  label="Job Priority"
                  sx={{backgroundColor: "#ECF2FF"}}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <ButtonStyled onClick={handleExport}>
                <BoxStyled>Export</BoxStyled>
                <span className='btn-indicator'></span>
                <BoxStyled>
                  <IconFileArrowRight size="19" style={{ margin: 'auto', verticalAlign: 'middle', marginLeft: "5px" }} />
                </BoxStyled>
              </ButtonStyled>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MachineLogTable />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default MachineLog;
