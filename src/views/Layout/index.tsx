import React, { useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import {sliderConfig, getLocationArr, getLabelArr} from '@/components/MainMenu/sliderConfig';
import MainMenu from '@/components/MainMenu/MainMenu';
import { Outlet, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const LayOut: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  const pathNameArr = getLabelArr(sliderConfig, location.pathname)
  const [usePathNameArr, setPathNameArr] = useState(pathNameArr)
  const pathMethod = (pathNameArr: string[]) => {
    setPathNameArr(pathNameArr)
    }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <MainMenu pathMethod={pathMethod}/>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} 
            items={
                usePathNameArr.map((item, index) => {
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

export default LayOut;