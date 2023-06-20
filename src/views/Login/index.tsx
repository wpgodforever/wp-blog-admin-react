import React from 'react';
import style from './style.module.scss';
import { UserOutlined, PropertySafetyOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

const login = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const submit = () => {
        console.log(username,password)
    }
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