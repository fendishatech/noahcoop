import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axiosClient from "../../../api/axiosClient";

const NewClient = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone_no: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
  });

  const handleFormSubmit = async (values) => {
    try {
      const res = await axiosClient.post("/clients", values);
      console.log(res);
      toast.success("client registered successfully!");
      navigate("/clients");
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
                value={values.first_name}
                name="first_name"
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
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
                value={values.phone_no}
                name="phone_no"
                error={!!touched.phone_no && !!errors.phone_no}
                helperText={touched.phone_no && errors.phone_no}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Client
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default NewClient;
