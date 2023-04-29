import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
      token: "",
      isLogin: false,
      fullName: "",
      verify: false,
      totalAmount:0,
    },
    reducers: {
      login: (state, action) => {
        state.token = action.payload.token;
        state.isLogin = true;
        state.fullName = action.payload.fullName;
      },
      logout: (state) => {
        state.token = "";
        state.isLogin = false;
        state.fullName = "";
        localStorage.removeItem('persist:auth');
      },
      switchMode: (state) => {
        state.isLogin = !state.isLogin;
      },
      signup: (state, action) => {
        state.token = action.payload.token;
        state.isLogin = true;
        state.fullName = action.payload.fullName;
      },
    },
  });
  
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
export const { login, logout, switchMode ,signup} = authSlice.actions;
