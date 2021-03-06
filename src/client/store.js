import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import { createBrowserHistory } from "history";
import rootReducer from "./reducers";
// import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: "root",
  storage
};

//export const history = createBrowserHistory();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};
const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export const store = createStore(
  persistedReducer,
  initialState,
  composedEnhancers
);

export const persistor = persistStore(store);
