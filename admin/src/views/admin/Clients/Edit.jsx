import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axiosClient from "../../../api/axiosClient";

const NewClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  const { id } = useParams();

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNo: "",
  };

  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    middleName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phoneNo: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
  });

  const handleFormSubmit = async (values) => {
    try {
      console.log("Okay");
      const res = await axiosClient.put(`/clients/${id}`, values);
      console.log(res);
      if (res.data.success) {
        toast.success("client updated successfully!");
        navigate("/clients");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getClient = async () => {
      const res = await axiosClient.get(`/clients/${id}`);

      setClient(res.data.payload);
      initialValues.firstName = res.data.payload.firstName;
      initialValues.middleName = res.data.payload.middleName;
      initialValues.lastName = res.data.payload.lastName;
      initialValues.email = res.data.payload.email;
      initialValues.phoneNo = res.data.payload.phoneNo;
    };

    getClient();
  }, []);

  console.log(client);
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
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Client
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default NewClient;
