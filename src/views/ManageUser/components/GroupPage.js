import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Card,
  CardContent,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText,
  FormLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import PageContainer from "../../../components/container/PageContainer";
import Breadcrumb from "../../components/pages/Breadcrumb";
import Header from "../../components/pages/Header";

// Validation schema
const validationSchema = yup.object({
  groupName: yup.string().required("Group Name is required"),
  organizationName: yup.string().required("Organization Name is required"),
  moduleAccess: yup.array().min(1, "At least one module access is required").required("Module Access is required"),
  groupType: yup.string().required("Group Type is required"),
  userList: yup.array().min(1, "At least one user is required"),
});

const GroupAccess = () => {
  const organizations = ["Org1", "Org2", "Org3"];
  const moduleAccessOptions = [
    "Excess Coop Billing",
    "Shortage claim",
    "P&L Analysis",
    "Price Claim",
    "Missed Invoicing",
    "Ops Chargeback",
  ];
  const groupTypes = ["Internal", "Customer", "Agency"];
  const users = ["User1", "User2", "User3"];

  const formik = useFormik({
    initialValues: {
      groupName: "",
      organizationName: "",
      moduleAccess: [],
      groupType: "",
      userList: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <PageContainer title="Group Access">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Manage Access", "Group Access"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="Group Access" />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: "white", padding: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Group Access Details
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                {/* Mandatory fields */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Group Name"
                  name="groupName"
                  value={formik.values.groupName}
                  onChange={formik.handleChange}
                  error={formik.touched.groupName && Boolean(formik.errors.groupName)}
                  helperText={formik.touched.groupName && formik.errors.groupName}
                  required
                />

                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.organizationName && Boolean(formik.errors.organizationName)}
                >
                  <InputLabel>Organization Name</InputLabel>
                  <Select
                    name="organizationName"
                    value={formik.values.organizationName}
                    onChange={formik.handleChange}
                    label="Organization Name"
                    required
                  >
                    {formik.values.organizationName && (
                      <MenuItem value={formik.values.organizationName}>
                        {formik.values.organizationName}
                      </MenuItem>
                    )}
                    {organizations
                      .filter((org) => org !== formik.values.organizationName)
                      .map((org) => (
                        <MenuItem key={org} value={org}>
                          {org}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>
                    {formik.touched.organizationName && formik.errors.organizationName}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.moduleAccess && Boolean(formik.errors.moduleAccess)}
                >
                  <InputLabel>Module Access</InputLabel>
                  <Select
                    name="moduleAccess"
                    multiple
                    value={formik.values.moduleAccess}
                    onChange={formik.handleChange}
                    renderValue={(selected) => selected.join(", ")}
                    required
                  >
                    {formik.values.moduleAccess.map((selectedModule) => (
                      <MenuItem key={selectedModule} value={selectedModule}>
                        <Checkbox checked />
                        <ListItemText primary={selectedModule} />
                      </MenuItem>
                    ))}
                    {moduleAccessOptions
                      .filter((module) => !formik.values.moduleAccess.includes(module))
                      .map((module) => (
                        <MenuItem key={module} value={module}>
                          <Checkbox checked={formik.values.moduleAccess.indexOf(module) > -1} />
                          <ListItemText primary={module} />
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>{formik.touched.moduleAccess && formik.errors.moduleAccess}</FormHelperText>
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.groupType && Boolean(formik.errors.groupType)}
                >
                  <InputLabel>Group Type</InputLabel>
                  <Select
                    name="groupType"
                    value={formik.values.groupType}
                    onChange={formik.handleChange}
                    label="Group Type"
                    required
                  >
                    {formik.values.groupType && (
                      <MenuItem value={formik.values.groupType}>
                        {formik.values.groupType}
                      </MenuItem>
                    )}
                    {groupTypes
                      .filter((type) => type !== formik.values.groupType)
                      .map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>{formik.touched.groupType && formik.errors.groupType}</FormHelperText>
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.userList && Boolean(formik.errors.userList)}
                >
                  <FormLabel component="legend">User List</FormLabel>
                  <Select
                    name="userList"
                    multiple
                    value={formik.values.userList}
                    onChange={formik.handleChange}
                    renderValue={(selected) => selected.join(", ")}
                    required
                  >
                    {formik.values.userList.map((selectedUser) => (
                      <MenuItem key={selectedUser} value={selectedUser}>
                        <Checkbox checked />
                        <ListItemText primary={selectedUser} />
                      </MenuItem>
                    ))}
                    {users
                      .filter((user) => !formik.values.userList.includes(user))
                      .map((user) => (
                        <MenuItem key={user} value={user}>
                          <Checkbox checked={formik.values.userList.indexOf(user) > -1} />
                          <ListItemText primary={user} />
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>{formik.touched.userList && formik.errors.userList}</FormHelperText>
                </FormControl>

                <Box mt={2} textAlign="center">
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default GroupAccess;
