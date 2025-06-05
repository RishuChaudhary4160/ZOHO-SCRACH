import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import loginImage from "/src/assets/login/images/crm.jpg";
import { useState } from "react";
import { getApi, postApi } from "../../axios/function";
import { useNavigate } from "react-router-dom";
import { onError, onSuccess } from "../helper";
// import crmLogo from ".../assets/login/images/crm.jpg";
import crmLogo from "/src/assets/login/images/crm.jpg";

import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { saveCode, saveEmail, saveStatus } from "./redux/LoginSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const LoginCard = () => {
  const navigate = useNavigate();

  let baseUrl = import.meta.env.VITE_BASE_URL;
  let apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const loginInfo = useSelector((state) => {
    return state.LoginReducer;
  });

  console.log("loginInfo==========", loginInfo);

  const validationSchema = yup.object({
    emailOrCode: yup
      .string()
      .required("Code or Email is required")
      .test(
        "email-or-code",
        "Must be a valid email or code",
        (value) => value.includes("@") || /^[a-zA-Z0-9]+$/.test(value)
      ),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      emailOrCode: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const req = {
        email: values.emailOrCode.includes("@")
          ? values.emailOrCode
          : undefined,
        code: !values.emailOrCode.includes("@")
          ? values.emailOrCode
          : undefined,
        password: values.password,
      };
      let rolesDataList = null;
      setLoading(true);
      try {
        const result = await postApi(`${apiUrl}/users/signIn`, req);
        if (result.data.isSuccess) {
          localStorage.setItem("user", JSON.stringify(result.data));
          Object.values(result.data || {}).forEach((item) => {
            if (item) {
              localStorage.setItem("code", item.code);
              localStorage.setItem(
                "name",
                `${item.profile?.firstName || ""} ${item.profile?.lastName || ""}`
              );
              localStorage.setItem("status", item.status);
              dispatch(saveStatus(item.status));
              localStorage.setItem("id", item.id);
              rolesDataList = result?.data?.data?.roles?.[1]?.key;
              localStorage.setItem("role-key", rolesDataList);
              localStorage.setItem(
                "permission",
                btoa(result?.data?.data?.roles?.[1]?.employee?.type)
              );
            }
          });
          setLoading(false);
          userLoginMy(rolesDataList);
          console.log("result.data.data.email", result.data.data.email);
          dispatch(saveEmail(result.data.data.email));
          dispatch(saveCode(result.data.data.code));
          onSuccess("Logged In");
        } else {
          onError(result.data.message);
          setLoading(false);
        }
      } catch (error) {
        onError(error.message);
        setLoading(false);
      }
    },
  });

  const userLoginMy = async (rolesDataList) => {
    try {
      const request = {
        email: formik.values.emailOrCode.includes("@")
          ? formik.values.emailOrCode
          : undefined,
        password: formik.values.password,
      };
      const result = await getApi(`${baseUrl}/employees/my`, {
        request,
        headers: {
          "x-tenant-code": "aqua",
          "Content-Type": "application/json",
          "x-role-key": `${rolesDataList}`,
        },
      });
      if (result.data.isSuccess) {
        localStorage.setItem("user-id", result.data?.data?.id);
        navigate("/home/my");
      }
    } catch (error) {
      onError(error.message);
      console.log("error.message", error.message);
    }
  };
  return (
    <>
      <Card
        sx={{
          width: 900,
          height: 700,
          textAlign: "center",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
          position: "relative",
          marginTop: "50px",
          display: "grid",
          placeSelf: "anchor-center",
          mr: "auto",
          ml: "auto",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#3f4662",
            padding: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={loginImage}
            alt="Logo"
            style={{ padding: "3%", height: "235px", width: "100%" }}
          />
        </Box>

        <CardContent sx={{ padding: "3% 20%" }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{
                marginTop: 5,
                marginBottom: 5,
                display: "flex",
                width: "500px",
                backgroundColor: "white",
                color: "black",
                placeSelf: "center",
              }}
              id="emailOrCode"
              variant="standard"
              label="Code or E-mail"
              size="small"
              name="emailOrCode"
              value={formik.values.emailOrCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.emailOrCode && Boolean(formik.errors.emailOrCode)
              }
              helperText={
                formik.touched.emailOrCode && formik.errors.emailOrCode
              }
            />
            <TextField
              sx={{
                marginTop: 5,
                marginBottom: 5,
                display: "flex",
                width: "500px",
                backgroundColor: "white",
                color: "black",
                placeSelf: "center",
              }}
              id="password"
              variant="standard"
              size="small"
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: 3,
                backgroundColor: "#3f4662",
                display: "flex",
                width: "500px",
                color: "white",
                placeSelf: "center",
                "&:hover": { backgroundColor: "#2f354b" },
              }}
              disabled={loading}
            >
              SIGN IN
            </Button>
          </form>
        </CardContent>
      </Card>

      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          right: 10,
          display: "flex",
          alignItems: "center",
          gap: 1, // Space between image & text
          color: "gray",
        }}
      >
        {/* Text */}
        <Typography variant="body2" sx={{ fontSize: "18px" }}>
          Powered By OpenAge
        </Typography>
        {/* Small Logo */}
        <Box
          component="img"
          src={crmLogo}
          alt="OpenAge Logo"
          sx={{ width: 24, height: 24 }}
        />
      </Box>
    </>
  );
};

export default LoginCard;
