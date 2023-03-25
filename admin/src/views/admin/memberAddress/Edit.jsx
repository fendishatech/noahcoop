import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axiosClient from "../../../api/axiosClient";

const EditCity = () => {
  const [city, setCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  const { id } = useParams();

  const initialValues = {
    name: ""
  };

  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
  });

  const handleFormSubmit = async (values) => {
    try {
      const res = await axiosClient.put(`/cities/${id}`, values);
      console.log(res);
      if (res.data.success) {
        toast.success("City updated successfully!");
        navigate("/cities");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getCity = async () => {
      const res = await axiosClient.get(`/cities/${id}`);

      setCity(res.data.payload);
      initialValues.firstName = res.data.payload.firstName;
      initialValues.middleName = res.data.payload.middleName;
      initialValues.lastName = res.data.payload.lastName;
      initialValues.email = res.data.payload.email;
      initialValues.phoneNo = res.data.payload.phoneNo;
    };

    getCity();
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
                label="City Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update City
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditCity;
