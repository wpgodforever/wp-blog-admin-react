import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
// 初始化样式
import 'reset-css'
// 全局样式
import '@/assets/style/global.scss'
// 引入store
import { BrowserRouter } from 'react-router-dom'
import store from '@/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

)
