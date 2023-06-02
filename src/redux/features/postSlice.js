import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: true,
    posts: {}
  },
  reducers: {
    setPosts: (state, action) => {
      state = {...state, ...action.payload};
      return state;
    }
  }
})

export const { setPrescriptionData } = prescriptionSlice.actions;

export default prescriptionSlice.reducer;