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

//funções ----------------------------------------------------------------------------------
// Get user details, for edit data, pega os dados para por na tela
export const profile = createAsyncThunk("user/profile",
    async (user, thunkAPI) => {
        //obtem o token la do redux, pega do authSlice
        const token = thunkAPI.getState().auth.user.token;
        //dispara o get para a API
        const data = await userService.profile(user, token);

        console.log(data);

        return data;
    }
);

// Update user details
export const updateProfile = createAsyncThunk("user/update",
    async (user, thunkAPI) => {
        //obtem o token
        const token = thunkAPI.getState().auth.user.token;
        //manda a request para a API
        const data = await userService.updateProfile(user, token);

        // Check for errors, 
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        console.log(data);

        return data;
    }
);


// Get user details com base no ID -- ver sobre a validação do token
export const getUserDetails = createAsyncThunk("user/get",

    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        //api com validação
        const data = await userService.getUserDetails(id, token);

        console.log(data);

        return data;
    }
);


// -- REDUCER E CONTROLE DE ESTADOS ----------------------------------------------------- 
//reducer , com o construtor do reducer pelos estados
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(profile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
                state.message = "Usuário atualizado com sucesso!";
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            });
    }
});




//Exportar as funções:
export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;