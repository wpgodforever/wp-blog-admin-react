import { legacy_createStore, combineReducers } from "redux";
import loginReducer from "./login/reducer";
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

const reducers = combineReducers({
    loginReducer
});

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()用于浏览器redux插件

const store = legacy_createStore(reducers, devToolsEnhancer({}));

export default store;