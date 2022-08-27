import { configureStore } from "@reduxjs/toolkit";

//recebe o reducer do slice:
import authReducer from "./slices/authSlice";

//cria e controla os contextos para cada entidade devolvidas pelo slice
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
