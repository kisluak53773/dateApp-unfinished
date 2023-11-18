import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signinUser, signupUser, logoutUser } from "@/api/userAPI";
import { refreshToken } from "@/constants";

const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  error: undefined,
};

export const signup = createAsyncThunk(
  "userSlice/signup",
  async ({
    email,
    password,
    firstname,
    lastname,
    gender,
    interestingGender,
    files,
  }) => {
    const user = await signupUser({
      email,
      password,
      firstname,
      lastname,
      gender,
      interestingGender,
      files,
    });
    return user;
  }
);

export const signin = createAsyncThunk(
  "userSlice/signin",
  async ({ email, password }) => {
    const user = await signinUser(email, password);
    return user;
  }
);

export const logout = createAsyncThunk("userSlice/logout", async () => {
  const data = await logoutUser();
  return data;
});

export const refresh = createAsyncThunk("userSlice/refresh", async () => {
  const data = await refreshToken();
  return data;
});

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuth = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      throw new Error({
        code: action.error.code,
        error: action.error.message,
      });
    });
    builder.addCase(signin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuth = true;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.isLoading = false;
      if (action.error.code !== 401)
        throw new Error({
          code: action.error.code,
          error: action.error.message,
        });
      state.error = action.error;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuth = false;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    });
  },
});

export default userSlice;

export const getUSer = (state) => state.userSlice.user;
export const getIsAuth = (state) => state.userSlice.isAuth;
export const getIsUserLoading = (state) => state.userSlice.isLoading;
export const getError = (state) => state.userSlice.error;
