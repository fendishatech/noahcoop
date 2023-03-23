import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axiosClient from "../../../api/axiosClient";

const NewSubCity = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    woredas: "",
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    woredas: yup.number().required("required"),
  });

  const handleFormSubmit = async (values) => {
    try {
      const res = await axiosClient.post("/sub_cities", values);
      if (res.data.success) {
        toast.success("SubCity Added successfully!");
        navigate("/sub_cities");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      // toast.error("Something went wrong!");
    }
  };

  return (
    <Box m="20px">
      <Header title="አዲስ ክ/ከተማ" subtitle="" />
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.woredas}
                name="woredas"
                error={!!touched.woredas && !!errors.woredas}
                helperText={touched.woredas && errors.woredas}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New City
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default NewSubCity;
