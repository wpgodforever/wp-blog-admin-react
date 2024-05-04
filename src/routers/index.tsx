import { Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '../views/Layout'
import Home from '../views/Home'
import Login from '../views/Login'
const Blog = lazy(() => import('../views/Blog'))
const Tag = lazy(() => import('../views/Tag'))
const Test = lazy(() => import('../views/Test'))
const Test1 = lazy(() => import('../views/Test/test1.tsx'))
const UseRef = lazy(() => import('../views/Case/useRef.tsx'))
const UseEffect = lazy(() => import('../views/Case/useEffect.tsx'))
const UseContext = lazy(() => import('../views/Case/useContext.tsx'))
const Right = lazy(() => import('../views/Case/right.tsx'))
const UseState = lazy(() => import('../views/Case/useState.tsx'))

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
        ]
    },
    {
        path: '/blog',
        element: <Layout />,
        children: [
            {
                path: '/blog/blogList',
                element: defaultAuthLoad(lazyLoading(<Blog />), {
                    title: '博客列表',
                    role: ['admin']
                }),
            },
            {
                path: '/blog/tagList',
                element: defaultAuthLoad(lazyLoading(<Tag />), {
                    title: '标签列表',
                    role: ['tester']
                }),
            },
            {
                path: '/blog/test1',
                element: defaultAuthLoad(<Test1 />, {
                    title: '错误边界',
                    role: ['admin']
                }),
            },
        ]
    },
    {
        path: '/test',
        element: <Layout />,
        children: [
            {
                path: '/test/test1',
                element: defaultAuthLoad(<Test />, {
                    title: '测试',
                    role: ['tester']
                }),
            },
        ]
    },
    {
        path: '/case',
        element: <Layout />,
        children: [
            {
                path: '/case/useRef',
                element: defaultAuthLoad(lazyLoading(<UseRef />), {
                    title: 'hooks useRef',
                    role: ['admin']
                }),
            },
            {
                path: '/case/useEffect',
                element: defaultAuthLoad(lazyLoading(<UseEffect />), {
                    title: 'hooks useEffect',
                    role: ['admin']
                }),
            },
            {
                path: '/case/useContext',
                element: defaultAuthLoad(lazyLoading(<UseContext />), {
                    title: 'hooks useContext',
                    role: ['admin']
                }),
            },
            {
                path: '/case/right',
                element: defaultAuthLoad(lazyLoading(<Right />), {
                    title: '无权限展示',
                    role: ['tester']
                }),
            },
            {
                path: '/case/useState',
                element: defaultAuthLoad(lazyLoading(<UseState />), {
                    title: 'useState的使用',
                    role: ['admin']
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