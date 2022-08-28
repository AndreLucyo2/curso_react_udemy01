
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Services: API
import authService from "../services/authService";

//tenta pegar o user lá do local storge:
const user = JSON.parse(localStorage.getItem("user"));

//Estado inicial do objeto
const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
};

// Register a user and sign in : estar autenticado
/* Argumentos da createAsyncThunk
    arg1 - Da um nome para ela com a ação atual
    arg2 - função asyncrona usando a  thunkAPI
        thunkAPI permite parar a execução e identificar erros da api */
export const register = createAsyncThunk("auth/register",
    async (user, thunkAPI) => {
        //tenta registrar o user e aguarda a resposta
        const data = await authService.register(user);

        // Check for errors: recebe a lista de erros da API
        if (data.errors) {
            //rejeita a requisição em caso de erro
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// Logout a user
export const logout = createAsyncThunk("auth/logout", async () => {
    //chama a função de logou la nos services
    await authService.logout();
});


//trata cada estado e ação em separado
/* Register: casos tratados inicialmente no extraReducers : (builder) parte das execuções da api::
    register.pending = a requisição foi enviada porem ainda nao teve resposta, seta o stado pada refletir isso.
    register.fulfilled = tem o estado e a ação em si, executou e respondeu, pega o payload retornado, consegue trafegar dados
    register.rejected = se der erro rejeita e pega os dados do erro epo exibir na tela, anula o user pos nao tem dados cadastrados
    logout.fulfilled = o que acontece quando feito o logout? limpar tudo
    */
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
                state.success = true;
                state.error = null;
            })
    },
});

//exporta as actions
export const { reset } = authSlice.actions;
//exporta o reducer:
export default authSlice.reducer;