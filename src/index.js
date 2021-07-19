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
    /*Context Tests only */

const inputOnly = false;
    /* Tests only */

const app = (
  <Provider store={store}>
    <PermissionsContext.Provider

      value={{
        inputOnly
      }}
    >

      <App />
    </PermissionsContext.Provider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
