import { legacy_createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import loginReducer from "./login/reducer";
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

const reducers = combineReducers({
    loginReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = legacy_createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;