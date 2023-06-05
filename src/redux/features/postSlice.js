import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const limit = 20;

export const readPost = createAsyncThunk("post/read", async (offset) => {
  try {
    // const res = await axios.get("/api/post", {
    //   params: {
    //     offset,
    //     limit
    //   }
    // });
    const res = await fetch("/api/post");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
});

export const createPost = createAsyncThunk("post/create", async (data) => {
  try {
    const res = await axios.post("/api/post/create", {
      ...data
    });
    console.log("resdata", res.data);
    if (res.data.code === "failed") {
      console.error(res.data.message);
    }
  } catch (err) {
    console.error(err);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState: {
    status: "loading",
    posts: {},
    last: null
  },
  extraReducers(builder) {
    builder
      .addCase(readPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(readPost.fulfilled, (state, action) => {
        state.status = "read_succeed";
        console.log(action.payload);
        if (action.payload.code === "succeed") {
          state.posts = { ...state.posts, ...action.payload.data };
        } else {
          console.error(action.payload);
        }
      })
      .addCase(readPost.rejected, (state, action) => {
        state.status = "read_failed";
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "read_succeed";
        console.log(action.payload);
        state.posts = { ...state.posts, ...action.payload.data };
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "read_failed";
        state.error = action.error.message;
      });
  }
});

// export const { setPrescriptionData } = prescriptionSlice.actions;

export default postSlice.reducer;
