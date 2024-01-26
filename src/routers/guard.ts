import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'
import { Auth, authLoad, transformRoutes } from './auth'

// 路由登录守卫
const Guard = (props) => {
    const { token } = useSelector(state => state.loginReducer)
    const navigate = useNavigate()//useNavigate钩子返回一个函数，这个hooks能够让我可以编程式的导航。
    const location = useLocation();//这个钩子返回当前路由对象。如果您想在当前路由更改时执行一些副作用，我们就可以使用这个hooks。
    useEffect(() => {
        if (!token && location.pathname !== '/login') {
            navigate('/login')
        }else if(token && location.pathname === '/login'){
            navigate('/')
        }
    }, [location.pathname])

    // 添加用户权限守卫
    const outlet = useRoutes(
        transformRoutes(props.router)
    )
    return outlet
}

export default connect(
    state => {
        return {
            loginReducer: state.loginReducer
        }
    },
)(Guard)