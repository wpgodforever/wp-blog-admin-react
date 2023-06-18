import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// 初始化样式
import 'reset-css'
// 全局样式
import '@/assets/style/global.scss'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </React.StrictMode>,
)
