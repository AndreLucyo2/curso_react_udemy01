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
//--- PUBLICAR FOTO --------------------------------------------------------------------------
// Publish an user's photo
export const publishPhoto = createAsyncThunk("photo/publish",
    async (photo, thunkAPI) => {
        //obtem o token
        const token = thunkAPI.getState().auth.user.token;

        //pega os dados da requisição
        const data = await photoService.publishPhoto(photo, token);

        console.log(data.errors);

        // Check for errors, retorna o erro para o form
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

//--- OBTER A LISTA DAS FOTOS DO USER -------------------------------------------------------
// Get user photos
export const getUserPhotos = createAsyncThunk("photo/userphotos",
    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        //como é uma rota privada precisa passar o token
        const data = await photoService.getUserPhotos(id, token);

        console.log(data);
        console.log(data.errors);

        return data;
    }
);

//--- DELETAR FOTOS DO POSTADA PELO USER -------------------------------------------------------
// Delete a photo
export const deletePhoto = createAsyncThunk("photo/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.deletePhoto(id, token);

        console.log(data.errors);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

//--- ALTERAR A FOTOS DO POSTADA PELO USER ----------------------------------------------------
// Update a photo
export const updatePhoto = createAsyncThunk("photo/update",
    async (photoData, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.updatePhoto(
            { title: photoData.title },
            photoData.id,
            token
        );

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);


export const photoSlice = createSlice({
    name: "publish",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(publishPhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(publishPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photo = action.payload;//manipula arraim adicionanro no primeiro item do array
                state.photos.unshift(state.photo);
                state.message = "Foto publicada com sucesso!";
            })
            .addCase(publishPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = {};
            })
            .addCase(getUserPhotos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.photos = action.payload;
            })
            .addCase(deletePhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                /*deletado com sucesso, atualiza o array removendo a foto */
                state.photos = state.photos.filter((photo) => {
                    //checa cada foto, se nao é o id deletado add no array
                    return photo._id !== action.payload.id;
                });
                //mostra mensagem que vem da api
                state.message = action.payload.message;
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = null;
            })
            .addCase(updatePhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                //itera no array:
                state.photos.map((photo) => {
                    //Valida o id da foto atualizada
                    if (photo._id === action.payload.photo._id) {
                        //atualiza o front com a resposta sem precisar fazer nova request
                        return (photo.title = action.payload.photo.title);
                    }
                    return photo;
                });
                state.message = action.payload.message;
            })
            .addCase(updatePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = null;
            })
    }
});


export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
