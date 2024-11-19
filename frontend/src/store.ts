import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Utilise localStorage
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// --- ÉTAT INITIAL ---
interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null; // Stocke uniquement l'email
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// --- SLICE AUTH ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null; // Réinitialise l'utilisateur
    },
  },
});

// Export des actions
export const { login, logout } = authSlice.actions;

// --- PERSIST CONFIG ---
const persistConfig = {
  key: "auth", // Clé pour localStorage
  storage, // Stockage localStorage
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

// --- STORE CONFIG ---
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

// Types pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
