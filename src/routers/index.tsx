import { lazy } from 'react'
// 懒加载引入
import Layout from '../views/Layout'
const Home = lazy(() => import('../views/Home'))
const Login = lazy(() => import('../views/Login'))
const Tag = lazy(() => import('../views/Tag'))
const Blog = lazy(() => import('../views/Blog'))
const Test = lazy(() => import('../views/Test'))

import { Navigate } from 'react-router-dom'

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                path: '/',
                element: <Home />,
            },
            {
                path: '/blogList',
                element: <Blog />,
            },
            {
                path: '/tagList',
                element: <Tag />,
            },
            {
                path: '/blogList1',
                element: <Test />,
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <Navigate to='/login' />,
    }
]

export default routes