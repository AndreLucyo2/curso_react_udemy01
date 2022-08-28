import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

//Objeto de estado inicial
const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

//Funções


export const photoSlice = createSlice({
    name: "publish",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
});


export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
