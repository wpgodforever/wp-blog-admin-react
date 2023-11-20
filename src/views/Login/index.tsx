import React, { useEffect } from 'react';
import style from './style.module.scss';
import { UserOutlined, PropertySafetyOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import actions from '@/store/actions.ts'
//引入store数据用useSelector
import { useSelector, useDispatch, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFn } from '@/api/login'

const login = (props) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const login = () => {
        loginFn({ username: username, password: password }).then(res => {
            if (res.code === 200) {
                dispatch(actions.loginAction.login(res.data.token))
                return res
            }

        })
            .then((res) => {
                if (res.code === 200) {
                    navigate('/')
                }
            })
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
    const validateMessages = {
        required: "'${name}' 是必填字段",
        // ...
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