import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService"; 
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import cartReducer from "./reducers/cartReducer"; 
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import templateService from "./services/templateService";
import templateCategoryService from "./services/templateCategoryService";
import uploadService from "./services/uploadService";
import userService from "./services/userService";
import campaignService from "./services/campaignService";
import campaignHistoryService from "./services/campaignHistoryService";
import paymentService from "./services/paymentService";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const Store = configureStore({
  reducer: {
    
    [templateService.reducerPath]: templateService.reducer,
    [templateCategoryService.reducerPath]: templateCategoryService.reducer,
    [uploadService.reducerPath]: uploadService.reducer,
    [userService.reducerPath]: userService.reducer,
    [campaignService.reducerPath]: campaignService.reducer,
    [campaignHistoryService.reducerPath]: campaignHistoryService.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
     
    authReducer: persistedReducer,
    global: globalReducer,
    cart:cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      [ 
        
        paymentService.middleware,
        campaignHistoryService.middleware,
        campaignService.middleware,
        userService.middleware,
      uploadService.middleware,
      templateService.middleware,
      templateCategoryService.middleware
    ]
    
    ),
});

export default Store;

export let persistor = persistStore(Store);
