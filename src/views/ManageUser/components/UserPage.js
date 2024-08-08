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
  Radio,
  RadioGroup,
  Button,
  FormHelperText,
  FormLabel,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import PageContainer from "../../../components/container/PageContainer";
import Breadcrumb from "../../components/pages/Breadcrumb";
import Header from "../../components/pages/Header";

// Validation schema
const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  userEmail: yup
    .string()
    .email("Enter a valid email")
    .required("User Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  userType: yup.string().required("User Type is required"),
  moduleAccess: yup.array().min(1, "At least one module access is required"),
});

const UserAccess = () => {
  const organizations = ["Org1", "Org2", "Org3"];
  const userTypes = ["Internal", "Customer", "Agency"];
  const moduleAccessOptions = [
    "Excess Coop Billing",
    "Shortage claim",
    "P&L Analysis",
    "Price Claim",
    "Missed Invoicing",
    "Ops Chargeback",
  ];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userEmail: "",
      password: "",
      confirmPassword: "",
      organization: [],
      userType: "", 
      moduleAccess: [],
      isSuperAdmin: "No",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <PageContainer title="User Access">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Manage Access", "User Access"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="User Access" />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: "white", padding: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                User Access Details
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="First Name"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                      required
                      inputProps={{ autoComplete: "off", autocorrect: "off" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Last Name"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                      required
                      inputProps={{ autoComplete: "off", autocorrect: "off" }}
                    />
                  </Grid>
                </Grid>

                
                <TextField
                  fullWidth
                  margin="normal"
                  label="User Email"
                  type="email"
                  name="userEmail"
                  value={formik.values.userEmail}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.userEmail && Boolean(formik.errors.userEmail)
                  }
                  helperText={
                    formik.touched.userEmail && formik.errors.userEmail
                  }
                  required
                  inputProps={{ autoComplete: "off", autocorrect: "off" }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  required
                  inputProps={{ autoComplete: "off", autocorrect: "off" }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  required
                  inputProps={{ autoComplete: "off", autocorrect: "off" }}
                />

                
                <FormControl
                  fullWidth
                  margin="normal"
                  error={
                    formik.touched.organization &&
                    Boolean(formik.errors.organization)
                  }
                >
                  <InputLabel>Organization</InputLabel>
                  <Select
                    name="organization"
                    multiple
                    value={formik.values.organization}
                    onChange={formik.handleChange}
                    label="Organization"
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {formik.values.organization.map((selectedOrg) => (
                      <MenuItem key={selectedOrg} value={selectedOrg}>
                        <Checkbox
                          checked={
                            formik.values.organization.indexOf(selectedOrg) > -1
                          }
                        />
                        {selectedOrg}
                      </MenuItem>
                    ))}
                    {organizations
                      .filter(
                        (org) => !formik.values.organization.includes(org)
                      )
                      .map((org) => (
                        <MenuItem key={org} value={org}>
                          <Checkbox
                            checked={
                              formik.values.organization.indexOf(org) > -1
                            }
                          />
                          {org}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>
                    {formik.touched.organization && formik.errors.organization}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  fullWidth
                  margin="normal"
                  component="fieldset"
                  error={
                    formik.touched.moduleAccess &&
                    Boolean(formik.errors.moduleAccess)
                  }
                >
                  <FormLabel component="legend">Module Access</FormLabel>
                  <Select
                    name="moduleAccess"
                    multiple
                    value={formik.values.moduleAccess}
                    onChange={formik.handleChange}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {formik.values.moduleAccess.map((selectedModule) => (
                      <MenuItem key={selectedModule} value={selectedModule}>
                        <Checkbox
                          checked={
                            formik.values.moduleAccess.indexOf(selectedModule) >
                            -1
                          }
                        />
                        {selectedModule}
                      </MenuItem>
                    ))}

                    {moduleAccessOptions
                      .filter(
                        (module) => !formik.values.moduleAccess.includes(module)
                      )
                      .map((module) => (
                        <MenuItem key={module} value={module}>
                          <Checkbox
                            checked={
                              formik.values.moduleAccess.indexOf(module) > -1
                            }
                          />
                          {module}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>
                    {formik.touched.moduleAccess && formik.errors.moduleAccess}
                  </FormHelperText>
                </FormControl>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      component="fieldset"
                      error={
                        formik.touched.userType &&
                        Boolean(formik.errors.userType)
                      }
                    >
                      <FormLabel component="legend">User Type</FormLabel>
                      <RadioGroup
                        name="userType"
                        value={formik.values.userType}
                        onChange={formik.handleChange}
                        row
                      >
                        {userTypes.map((type) => (
                          <FormControlLabel
                            key={type}
                            value={type}
                            control={<Radio />}
                            label={type}
                          />
                        ))}
                      </RadioGroup>
                      <FormHelperText>
                        {formik.touched.userType && formik.errors.userType}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl component="fieldset" margin="normal">
                      <FormLabel component="legend">Is Super Admin</FormLabel>
                      <RadioGroup
                        row
                        name="isSuperAdmin"
                        value={formik.values.isSuperAdmin}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

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

export default UserAccess;
