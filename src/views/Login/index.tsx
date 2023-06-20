import React from 'react';
import style from './style.module.scss';
import { UserOutlined, PropertySafetyOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

const login = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    return (
        <div className={'container' + ' ' + style.loginContainer}>
            <div className={style.loginBox + ' ' + 'flexCol'}>
                <div className={style.loginTitle}>
                    wp的博客后台管理系统
                </div>
                <form action="#">
                    <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined />} autoComplete='off'/>
                    <Input.Password size="large" placeholder="请输入密码" prefix={<PropertySafetyOutlined />} autoComplete='off'/>
                </form>
            </div>
        </div>
    );
}

export default login;