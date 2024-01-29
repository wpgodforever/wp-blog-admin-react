import { Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '../views/Layout'
import Home from '../views/Home'
import Login from '../views/Login'
const Blog = lazy(() => import('../views/Blog'))
const Tag = lazy(() => import('../views/Tag'))
const Test = lazy(() => import('../views/Test'))

import { defaultAuthLoad } from './auth'

// 懒加载高阶组件
const lazyLoading = (props: any) => {
    return (
        <Suspense fallback={<>loading...</>}>
            {props}
        </Suspense>
    )
}

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: defaultAuthLoad(<Home />),
            },
            {
                path: '/blogList',
                element: defaultAuthLoad(<Blog />, {
                    title: '博客列表',
                    role: ['admin']

                }),
            },
            {
                path: '/tagList',
                element: defaultAuthLoad(<Tag />, {
                    title: '标签列表',
                    role: ['tester']
                }),
            },
            {
                path: '/test',
                element: defaultAuthLoad(<Test />, {
                    title: '测试',
                    role: ['tester']
                }),
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    }
]



export default routes