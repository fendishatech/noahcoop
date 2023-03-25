import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axiosClient from "../../../api/axiosClient";
import axios from "axios";

const NewMember = () => {
  const [loading, setLoading] = useState(true);
  const [eduStatuses, setEduStatuses] = useState(true);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    title: "",
    gender: "",
    dob: "",
    martialStatus: "",
    familyMembers_no: "",
    familyMembersGender: "",
    phoneNo: "",
    email: "",
    willList: "",
    memberType: "",
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    middleName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    gender: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phoneNo: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
  });

  const handleFormSubmit = async (values) => {
    console.log(values);
    return;
    try {
      const res = await axiosClient.post("/members", values);
      console.log(res);
      toast.success("member registered successfully!");
      navigate("/members");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getEduStatuses = async () => {
      const res = await axiosClient.get("/edu_statuses");
      setEduStatuses(res.data.payload);
    };

    getEduStatuses();
  }, []);

  return (
    <Box m="20px">
      <Header title="አዲስ ደምበኛ" subtitle="" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Middle Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.middleName}
                name="middleName"
                error={!!touched.middleName && !!errors.middleName}
                helperText={touched.middleName && errors.middleName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone no Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNo}
                name="phoneNo"
                error={!!touched.phoneNo && !!errors.phoneNo}
                helperText={touched.phoneNo && errors.phoneNo}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="gender-select-label"
                  fullWidth
                  variant="filled"
                  label="Gender"
                  value={values.gender}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                  helperText={touched.gender && errors.gender}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <Select
                  fullWidth
                  variant="filled"
                  label="Martial Status"
                  value={values.martialStatus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="martialStatus"
                  error={!!touched.martialStatus && !!errors.martialStatus}
                  helperText={touched.martialStatus && errors.martialStatus}
                >
                  <MenuItem value={"single"}>Single</MenuItem>
                  <MenuItem value={"married"}>Married</MenuItem>
                  <MenuItem value={"divorced"}>Divorced</MenuItem>
                  <MenuItem value={"widow"}>Widow</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  fullWidth
                  variant="filled"
                  label="Birth Day"
                  // value={values.dob}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="dob"
                  error={!!touched.dob && !!errors.dob}
                  helperText={touched.dob && errors.dob}
                  sx={{ gridColumn: "span 2" }}
                />
              </LocalizationProvider>

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="No of Family members"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.familyMembers_no}
                name="familyMembers_no"
                error={!!touched.familyMembers_no && !!errors.familyMembers_no}
                helperText={touched.familyMembers_no && errors.familyMembers_no}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Family Members in Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.familyMembersGender}
                name="familyMembersGender"
                error={
                  !!touched.familyMembersGender && !!errors.familyMembersGender
                }
                helperText={
                  touched.familyMembersGender && errors.familyMembersGender
                }
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="eduStatus-select-label">
                  Educational Status
                </InputLabel>
                <Select
                  labelId="eduStatus-select-label"
                  fullWidth
                  variant="filled"
                  label="Educational Status"
                  value={values.eduStatus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="eduStatus"
                  error={!!touched.eduStatus && !!errors.eduStatus}
                  helperText={touched.eduStatus && errors.eduStatus}
                  sx={{ gridColumn: "span 2" }}
                >
                  {eduStatuses.length > 0 &&
                    eduStatuses.map((status, index) => (
                      <>
                        <Option key={index} value={status.id}>
                          {status.name}
                        </Option>
                      </>
                    ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Will List"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.willList}
                name="willList"
                error={!!touched.willList && !!errors.willList}
                helperText={touched.willList && errors.willList}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="memberType-select-label">
                  Member Type
                </InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  labelId="memberType-select-label"
                  value={values.memberType}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="memberType"
                  error={!!touched.memberType && !!errors.memberType}
                  helperText={touched.memberType && errors.memberType}
                >
                  <MenuItem value={"regular"}>Regular</MenuItem>
                  <MenuItem value={"children"}>Children</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Member
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default NewMember;
