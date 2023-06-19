import React from 'react';
import {sliderConfig, getSliderPath} from '@/components/MainMenu/sliderConfig';
import { Breadcrumb, Layout, theme } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MainMenu from '@/components/MainMenu/MainMenu';

const { Header, Content, Sider } = Layout;

const Home: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    
    let { pathNameArr } = getSliderPath(sliderConfig, [1, 11])
    const [usePathNameArr, setPathNameArr] = useState(pathNameArr)
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <MainMenu pathMethod={setPathNameArr}/>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}
                    items={usePathNameArr.map(item => {
                        return {
                            title: item
                        }
                    })
                    }
                    >
                        
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Home;