export { global }
/**
 *  解决redux开发工具报错
 */
declare global {
  interface Window {
    // 属性为redux开发工具对应属性
    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // const store = createStore(persistedReducer, composeEnhancers());
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
  }
}
