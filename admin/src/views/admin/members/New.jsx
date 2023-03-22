import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axiosClient from "../../../api/axiosClient";

const NewMember = () => {
  const [loading, setLoading] = useState(true);
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
              <Select
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
