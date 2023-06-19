import Home from '../views/Home'
import Login from '../views/Login'
import Tag from '../views/Tag'
import Blog from '../views/Blog'

import { Navigate } from 'react-router-dom'

const routes = [
    {
        path: '/',
        element: <Navigate to='/home/blogList' />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: '/home/blogList',
                element: <Blog />,
            },
            {
                path: '/home/tagList',
                element: <Tag />,
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to='/home/blogList' />,
    }
]

export default routes