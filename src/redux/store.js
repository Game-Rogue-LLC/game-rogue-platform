import { configureStore } from "@reduxjs/toolkit";
import postReducer from "@/src/redux/features/postSlice";
import splashReducer from "@/src/redux/features/splashSlice";

export default configureStore({
  reducer: {
    post: postReducer,
    splash: splashReducer
  }
});
