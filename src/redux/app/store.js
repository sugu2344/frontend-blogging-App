import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/auth/registerSlice";

const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});

export default store;
