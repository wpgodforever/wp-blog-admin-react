import { legacy_createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import loginReducer from "./login/reducer";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'wpadmin',
    storage,
    whitelist: ['loginReducer']
}

const reducers = combineReducers({
    loginReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myPersistReducer = persistReducer(persistConfig, reducers)


const store = legacy_createStore(
    myPersistReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store)

export {
    store,
    persistor
};