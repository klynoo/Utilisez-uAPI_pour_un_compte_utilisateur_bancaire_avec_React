import {
  configureStore,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import axios from "axios";
import { useDispatch } from "react-redux";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;

  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,

  loading: false,
  error: null,
};

export const updateProfileThunk = createAsyncThunk<
  User,
  { token: string; userData: { firstName: string; lastName: string } },
  { rejectValue: string }
>("auth/updateProfile", async ({ token, userData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Renvoie uniquement le corps de la réponse contenant les données utilisateur
    const updatedUser = response.data.body;
    return updatedUser;
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message || "Erreur de mise à jour du profil";
    console.error("updateProfileThunk error:", errMsg);
    return rejectWithValue(errMsg);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        email: string;
        firstName: string;
        lastName: string;
        token: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = {
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },

    updateProfile: (
      state,
      action: PayloadAction<{ firstName: string; lastName: string }>
    ) => {
      if (state.user) {
        state.user.firstName = action.payload.firstName;
        state.user.lastName = action.payload.lastName;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(updateProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        console.log(
          "updateProfileThunk fulfilled with payload:",
          action.payload
        );
        state.loading = false;
        if (state.user) {
          state.user = {
            ...state.user,
            ...action.payload,
          };
          console.log("Updated user in state:", state.user);
        }
      })

      // Rejected
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erreur de mise à jour du profil";
      });
  },
});

export const { login, logout, updateProfile } = authSlice.actions;

const persistConfig = {
  key: "auth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les actions liées à redux-persist
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
