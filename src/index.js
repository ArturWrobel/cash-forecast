import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import PermissionsContext from "./context/PermissionsContext";
import thunk from "redux-thunk";

import authReducer from "./store/reducers/auth";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));
const inputOnly = false;

const app = (
  <Provider store={store}>
    <PermissionsContext.Provider
    /* Tests only */
      value={{
        inputOnly
      }}
    >
    /* Tests only */
      <App />
    </PermissionsContext.Provider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
