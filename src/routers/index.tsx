import Home from '../views/Home'
import Login from '../views/Login'

import { Navigate } from 'react-router-dom'

const routes = [
    {
        path: '/',
        element: <Navigate to='/home' />,
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