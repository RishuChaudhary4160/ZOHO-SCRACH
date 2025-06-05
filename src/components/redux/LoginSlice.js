import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  businessName: "",
  userDetail: {
    email: "",
    code: "",
    isEmailValidate: "",
  },
  otp: {
    otp: "",
  },

  flag: {
    isLoginPage: true,
    isPasswordCreated: false,
    isEmailValid: false,
    isEmailVerifyed: false,
    isEmailPassVerifyed: false,
    isOtpIsValid: false,
    isForgetPassword: false,
    isResetPassword: false,
    isCallFromForgetPass: false,
  },
  roleType: "",
  isStatus: false,
};

const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    handleLoginPage: (state, action) => {
      state.flag.isLoginPage = false;
    },
    handleIsPasswordCreated: (state, action) => {
      state.flag.isPasswordCreated = true;
    },

    handleIsEmailValid: (state, action) => {
      state.flag.isEmailValid = true;
    },
    handleIsEmailVerifyed: (state, action) => {
      state.flag.isEmailVerifyed = true;
    },
    handleIsEmailPassVerifyed: (state, action) => {
      state.flag.isEmailPassVerifyed = true;
    },

    handleIsOtpIsValid: (state, action) => {
      state.flag.isOtpIsValid = true;
    },
    handleForgetPassword: (state, action) => {
      state.flag.isForgetPassword = true;
    },
    handleResetPassword: (state, action) => {
      state.flag.isResetPassword = true;
    },
    handleIsCallFromForgetPass: (state, action) => {
      state.flag.isCallFromForgetPass = true;
    },
    saveEmail: (state, action) => {
      state.userDetail.email = action.payload;
    },
    saveCode: (state, action) => {
      state.userDetail.code = action.payload;
    },
    saveEmailValidate: (state, action) => {
      state.userDetail.isEmailValidate = action.payload;
    },
    saveOtp: (state, action) => {
      state.otp = action.payload;
    },
    updateRole: (state, action) => {
      state.roleType = action.payload;
    },
    saveStatus: (state, action) => {
      state.isStatus = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  reset,
  handleIsPasswordCreated,
  saveEmail,
  saveCode,
  handleIsEmailValid,
  handleIsEmailPassVerifyed,
  handleLoginPage,
  handleIsOtpIsValid,
  handleIsEmailVerifyed,
  handleForgetPassword,
  handleResetPassword,
  handleIsCallFromForgetPass,
  saveOtp,
  saveEmailValidate,
  updateRole,
  saveStatus,
} = LoginSlice.actions;

export default LoginSlice.reducer;
