import { createSlice } from "@reduxjs/toolkit";

export const splashSlice = createSlice({
  name: "splash",
  initialState: {
    rogueSocial: true
  },
  reducers: {
    setRogueSocialSplash: (state, action) => {
      state.rogueSocial = false;
      console.log("123");
    }
  }
});

export const { setRogueSocialSplash } = splashSlice.actions;
export default splashSlice.reducer;
