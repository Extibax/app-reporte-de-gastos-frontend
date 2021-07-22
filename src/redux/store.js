/* Modules */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";

/* Reducers */
import rootReducer from "./reducers";

/* Storage */
import storage from "redux-persist/lib/storage";

const initialState = {};

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
  initialState
);

const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

persistStore(store);

export default store;
