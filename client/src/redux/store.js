import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { version } from "mongoose";
// import persistStore from "redux-persist";

const rootReducer = combineReducers({
  user:userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export {store,persistor};

// import { configureStore } from '@reduxjs/toolkit'
// import  userReducer  from './user/userSlice'

// export const store = configureStore({
//   reducer: {user:userReducer},
//   middleware:(getDefaultMiddleware)=>{
//     getDefaultMiddleware({

//       serializableCheck:false
//     })
//   }
// })
