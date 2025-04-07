import { configureStore } from "@reduxjs/toolkit";
import { registerApi } from "./services/register";

export const store = configureStore({
  reducer: {
    [registerApi.reducerPath]: registerApi.reducer,
  },
  
  middleware : (getDefaulMiddleware) => 
    getDefaulMiddleware().concat(registerApi.middleware)
});
