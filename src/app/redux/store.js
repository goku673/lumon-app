import { configureStore } from "@reduxjs/toolkit";
import { registerApi } from "./services/register";
import { areaApi } from "./services/areaApi";
import guardianReducer from "./slice/guardianSlice";

export const store = configureStore({
  reducer: {
    [registerApi.reducerPath]: registerApi.reducer,
    [areaApi.reducerPath]: areaApi.reducer,
    guardian: guardianReducer,
  },
  
  middleware : (getDefaulMiddleware) => 
    getDefaulMiddleware().concat(registerApi.middleware, areaApi.middleware),
});
