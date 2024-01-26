import { lazy, Suspense } from 'react'
// 懒加载引入
import Layout from '../views/Layout'
import Home from '../views/Home'
import Login from '../views/Login'
const Tag = lazy(() => import('../views/Tag'))
const Blog = lazy(() => import('../views/Blog'))
const Test = lazy(() => import('../views/Test'))

// 懒加载高阶组件
const lazyLoading = (props: any) => {
    return (
        <Suspense fallback={<>loading...</>}>
            {props}
        </Suspense>
    )
}

import { Navigate } from 'react-router-dom'

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/blogList',
                element: lazyLoading(<Blog />),
                meta:{
                    title: '博客列表',
                    role:['admin']
                }
            },
            {
                path: '/tagList',
                element: lazyLoading(<Tag />),
                meta:{
                    title: '标签列表'
                }
            },
            {
                path: '/test',
                element: lazyLoading(<Test />),
                meta:{
                    title: '测试',
                    role:['tester']
                }
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