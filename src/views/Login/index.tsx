import React, { useEffect } from 'react';
import style from './style.module.scss';
import { UserOutlined, PropertySafetyOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import actions from '@/store/actions.ts'
//引入store数据用useSelector
import { useSelector, useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const login = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const login = () => {
        dispatch(actions.loginAction.login({ username: username, password: password }, (isSuccess: boolean) => {
            if (isSuccess) {
                dispatch(actions.loginAction.asyncRouter())
                navigate('/')
            }
        })

        )
    }
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const submit = () => {
        form.validateFields().then((values) => {
            login()
        }).catch((err) => {
            console.log(err)
        })

    }

    const validateMessages = {
        required: "'${name}' 是必填字段",
    };
    return (
        <div className={'container' + ' ' + style.loginContainer}>
            <div className={style.loginBox + ' ' + 'flexCol'}>
                <div className={style.loginTitle}>
                    wp的博客后台管理系统
                </div>
                <Form
                    form={form}
                    name="dependencies"
                    autoComplete="off"
                    layout="vertical"
                    validateMessages={validateMessages}
                >
                    <Form.Item name="username" rules={[{ required: true }]} dependencies={['username']}>
                        <Input
                            prefix={<UserOutlined />}
                            value={username}
                            placeholder="请输入用户名"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true }]} dependencies={['password']}>
                        <Input.Password size="large" placeholder="请输入密码" prefix={<PropertySafetyOutlined />}
                            style={{ marginTop: '10px' }} value={password}
                            autoComplete='off'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                </Form>
                <Button type="primary" block onClick={submit}>
                    登录
                </Button>
            </div>
        </div>
    );
}

export default login;