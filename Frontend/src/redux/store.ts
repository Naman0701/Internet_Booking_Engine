import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import testReducer from "./slice/backendHealthTestSlice";
import landingPageReducer from "./slice/landingPageSlice";
import currencyConverterReducer from "./slice/currencyConverterSlice";
import calendarReducer from "./slice/calendarSlice";
import commonAppReducer from "./slice/checkerSlice";
import roomResultPageReducer from "./slice/roomResultPageSlice";
import userReducer from "./slice/userSlice";
import defaultPromotionsReducer from "./slice/defaultPromotionsSlice";
import checkoutReducer from "./slice/checkoutSlice";
import priceBreakdownReducer from "./slice/priceBreakdownSlice";
import customPromotionReducer from "./slice/customPromotionSlice";
import ratingsReducer from "./slice/ratingsSlice";
import configurationReducer from "./slice/configurationsSlice";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchFormDetailsReducer from "./slice/searchFormDetailsSlice";
import bookingConfirmedReducer from "./slice/bookingConfirmedSlice";
import myBookingsReducer from "./slice/myBookingsSlice";

const checkoutConfig = {
  key: "checkout",
  storage,
};
const currencyConfig = {
  key: "currency",
  storage,
};
const priceBreakdownConfig = {
  key: "priceBreakdown",
  storage,
};
const searchFormConfig = {
  key: "searchForm",
  storage,
};
const roomResultPage={
  key:"roomResult",
  storage,
}
const userSlice={
  key:"userSlice",
  storage,
}
const landingPageSlice={
  key:"landingPageSlice",
  storage,
}

const reducers = combineReducers({
  tester: testReducer,
  landingPageState: persistReducer(landingPageSlice,landingPageReducer),
  roomResultPageState: persistReducer(roomResultPage,roomResultPageReducer),
  currencyConverter: persistReducer(currencyConfig, currencyConverterReducer),
  calendar: calendarReducer,
  commonAppDetails: commonAppReducer,
  user: persistReducer(userSlice, userReducer),
  defaultPromotion: defaultPromotionsReducer,
  checkout: persistReducer(checkoutConfig, checkoutReducer),
  priceBreakdown: persistReducer(priceBreakdownConfig, priceBreakdownReducer),
  customPromotion: customPromotionReducer,
  rating: ratingsReducer,
  searchForm: persistReducer(searchFormConfig, searchFormDetailsReducer),
  configurations:configurationReducer,
  bookingConfirmedState:bookingConfirmedReducer,
  myBookings:myBookingsReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
