import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

//estado incial do user
const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

//funções

//reducer 
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
});

//Exportar as funções:
export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;