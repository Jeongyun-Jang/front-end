import { createSelector, createSlice } from "@reduxjs/toolkit";
import { setCookie, removeCookie } from "../../share/Cookie";
import { 
  signUp, 
  logIn, 
  userInfo, 
  checkEmail,
  checkNickname,
} from "../async/user";
import {history} from "../configureStore"

const initialState = {
  userList: null,
  is_login: null,
  is_signup: null,
  currentUser: [],
  checkEmail: null,
  checkNickname: null,
  isLoading: false,
  isDone: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action) => {
      removeCookie("_osid");
      window.location.href = "/";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.is_signup = action.payload.message;
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.checkEmail = action.payload.existed;
      })
      .addCase(checkEmail.rejected, (state, action) => {
      })
      .addCase(checkNickname.fulfilled, (state, action) => {
        state.checkNickname = action.payload.existed;
      })
      .addCase(checkNickname.rejected, (state, action) => {
      })
      .addCase(logIn.pending, (state, action) => {
      })
      .addCase(logIn.fulfilled, (state, action) => {
        setCookie("_osid", action.payload.token);
        //setCookie("Re_osid", action.payload.refreshToken)
        state.is_login = action.payload.message;
      })
      .addCase(logIn.rejected, (state, action) => {
        window.alert("아이디나 비밀번호가 틀립니다!")
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(userInfo.rejected, (state, action) => {
      })
      // 공통
      .addMatcher(
        (action) => {
          return action.type.includes("/pending");
        },
        (state, action) => {
          state.isLoading = true;
          state.isDone = false;
          state.isError = null;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.includes("/fulfilled");
        },
        (state, action) => {
          state.isLoading = false;
          state.isDone = true;
        }
      )
      .addMatcher(
        (action) => {
          return action.type.includes("/rejected");
        },
        (state, action) => {
          state.isLoading = false;
          state.isError = action.error;
        }
      ),
});

export const { logOut } = userSlice.actions;

export default userSlice;

const current_User = (state) => state.user.currentUser.userId;

const is_login = (state) => state.user.is_login;

const is_signup = (state) => state.user.is_signup;

export const User = createSelector(current_User, current_User => {
  return current_User;
});

export const is_Login = createSelector(is_login, is_login => {
  return is_login
});

export const is_Signup = createSelector(is_signup, is_signup => {
  return is_signup
});