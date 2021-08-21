import { createSelector, createSlice } from "@reduxjs/toolkit";
import { setCookie, removeCookie, setCookieRefresh } from "../../share/Cookie";
import { 
  signUp, 
  logIn, 
  userInfo, 
  checkEmail,
  checkNickname,
  logOut,
  withDrawl,
} from "../async/user";

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
  extraReducers: (builder) =>
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.is_signup = action.payload.message;
      })
      .addCase(signUp.rejected, (state, action) => {
        alert("회원가입에 실패했습니다!");
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.checkEmail = action.payload.existed;
      })
      .addCase(checkNickname.fulfilled, (state, action) => {
        state.checkNickname = action.payload.existed;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        setCookie("_osid", action.payload.accessToken);
        setCookieRefresh("_osidRe", action.payload.refreshToken);
        state.is_login = action.payload.message;
      })
      .addCase(logIn.rejected, (state, action) => {
        window.alert("아이디나 비밀번호가 틀립니다!")
      })
      .addCase(logOut.fulfilled, (state, action) => {
        removeCookie("_osid");
        removeCookie("_osidRe");
        window.location.href = "/";
      })
      .addCase(withDrawl.fulfilled, (state, action) => {
        removeCookie("_osid");
        removeCookie("_osidRe");
        window.location.href = "/";
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.currentUser = action.payload;
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

export default userSlice;

const current_User = (state) => state.user.currentUser.userId;

const is_login = (state) => state.user.is_login;

const is_signup = (state) => state.user.is_signup;

const check_Email = (state) => state.user.checkEmail;

const check_Nickname = (state) => state.user.checkNickname;

export const is_Nickname = createSelector(check_Nickname, check_Nickname => {
  return check_Nickname;
});

export const is_Email = createSelector(check_Email, check_Email => {
  return check_Email;
});

export const User = createSelector(current_User, current_User => {
  return current_User;
});

export const is_Login = createSelector(is_login, is_login => {
  return is_login
});

export const is_Signup = createSelector(is_signup, is_signup => {
  return is_signup
});