import { lazy } from 'react'
// 懒加载引入
const Home = lazy(() => import('../views/Home'))
const Login = lazy(() => import('../views/Login'))

import { Navigate } from 'react-router-dom'

const routes = [
    {
        path: '/',
        element: <Navigate to='/login' />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/home',
        element: <Home />,
    },
    
]

export default routes