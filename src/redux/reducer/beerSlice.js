import { createSlice } from "@reduxjs/toolkit";
import { getAllBeer, getOneBeer, searchReview, likeBeer, unLikeBeer, testResult } from "../async/beer";

const initialState = {
    beerList: [],
    beerOne: null,
    beerToday: [],
    searchList: [],
    isLoading: false,
    isDone: false,
    isError: false,
};

const beerSlice = createSlice({
  name: "beer",
  initialState,
  extraReducers: (builder) =>
    builder
        .addCase(getAllBeer.pending, (state, action) => {
            state.beerList = [];
        })
        .addCase(getAllBeer.fulfilled, (state, action) => {
            state.beerList = action.payload;
        })
        .addCase(getAllBeer.rejected, (state, action) => {
            console.log("beerList rejected: 맥주목록 불러오기에 실패했습니다");
        })
        .addCase(getOneBeer.pending, (state, action) => {
            state.beerOne = {};
        })
        .addCase(getOneBeer.fulfilled, (state, action) => {
            state.beerOne = action.payload.beer;
        })
        .addCase(getOneBeer.rejected, (state, action) => {
            console.log("getOneBeer rejected: 맥주항목 불러오기에 실패했습니다")
        })
        //검색기능
        .addCase(searchReview.pending, (state, action) => {
        })
        .addCase(searchReview.fulfilled, (state, action) => {
            //console.log(action.payload);
        })
        .addCase(searchReview.rejected, (state, action) => {
            console.log("searchReview rejected: 맥주 검색에 실패했습니다");
        })
        .addCase(likeBeer.pending, (state, action) => {
        })
        .addCase(likeBeer.fulfilled, (state, action) => {
        })
        .addCase(likeBeer.rejected, (state, action) => {
          console.log("error", action.payload);
          console.log("like failed");
        })
        .addCase(unLikeBeer.pending, (state, action) => {
        })
        .addCase(unLikeBeer.fulfilled, (state, action) => {
        })
        .addCase(unLikeBeer.rejected, (state, action) => {
          console.log("unlike failed");
        })
        .addCase(testResult.pending, (state, action) => {
          state.beerToday = [];
        })
        .addCase(testResult.fulfilled, (state, action) => {
          state.beerToday = action.payload;
        })
        .addCase(testResult.rejected, (state, action) => {
          console.log("맥주 불러오기에 실패했습니다!");
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
export default beerSlice;
