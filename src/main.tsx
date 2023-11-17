import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
// redux持久化
import { store, persistor } from './store/index.ts'
import { PersistGate } from 'redux-persist/integration/react'
// 初始化样式
import 'reset-css'
// 全局样式
import '@/assets/style/global.scss'
// 引入store
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>

  </Provider>

)
