import React, { useEffect } from 'react';
import style from './style.module.scss';
import { UserOutlined, PropertySafetyOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
//引入store数据用useSelector
import { useSelector, useDispatch } from 'react-redux';

const login = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const submit = () => {
        console.log(username,password)
    }

    // 获取store数据
    // const num = useSelector((state: any) => ({
    //     num:state.loginReducer.num
    // }))
    // const dispatch = useDispatch()
    // const changeNum = () => {
    //     dispatch({
    //         type: 'increment',
    //         val: 100
    //     })
    // }
    // useEffect(() => {
    //     changeNum()
    //     console.log(num)
    // }, [])
    return (
        <div className={'container' + ' ' + style.loginContainer}>
            <div className={style.loginBox + ' ' + 'flexCol'}>
                <div className={style.loginTitle}>
                    wp的博客后台管理系统
                </div>
                <form action="#">
                    <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined />} autoComplete='off'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input.Password size="large" placeholder="请输入密码" prefix={<PropertySafetyOutlined />} 
                    style={{marginTop: '10px'}} value={password} 
                    autoComplete='off' 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </form>
                <Button type="primary" block onClick={submit}>登录</Button>
            </div>
        </div>
    );
}

export default login;