import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import App from "@containers/App";
import rootReducer from "./rootReducer";
import "./global.scss";

const root = document.getElementById("root");

const userAgent = navigator.userAgent.toLowerCase();
window.isElectron = userAgent.indexOf("electron") > -1;

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);