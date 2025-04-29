import { configureStore } from "@reduxjs/toolkit";
import { registerApi } from "./services/register";
import { areaApi } from "./services/areaApi";
import { guardiansApi } from "./services/guardiansApi";
import guardianReducer from "./slice/guardianSlice";
import { schoolApi } from "./services/schoolApi";
import { olympicsApi } from "./services/olympicsApi";

export const store = configureStore({
  reducer: {
    [registerApi.reducerPath]: registerApi.reducer,
    [areaApi.reducerPath]: areaApi.reducer,
    [guardiansApi.reducerPath]: guardiansApi.reducer,
    [schoolApi.reducerPath]: schoolApi.reducer,
    [olympicsApi.reducerPath]: olympicsApi.reducer,
    guardian: guardianReducer,
  },
  
  middleware : (getDefaulMiddleware) => 
    getDefaulMiddleware().concat(
      registerApi.middleware, 
      areaApi.middleware, 
      guardiansApi.middleware,
      schoolApi.middleware,
      olympicsApi.middleware,
    ),
});


