import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { connect } from 'react-redux'
const Guard = (props) => {
    const { token } = props.loginReducer
    const navigate = useNavigate()//useNavigate钩子返回一个函数，这个hooks能够让我可以编程式的导航。
    const location = useLocation();//这个钩子返回当前路由对象。如果您想在当前路由更改时执行一些副作用，我们就可以使用这个hooks。
    useEffect(() => {
        if (!token && location.pathname !== '/login') {
            navigate('/login')
        }
    }, [location.pathname])
    const outlet = useRoutes(props.router)
    return outlet
}

export default connect(
    state => {
        return {
            loginReducer: state.loginReducer
        }
    },
)(Guard)