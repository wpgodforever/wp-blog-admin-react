import React from 'react';
import sliderConfig from './sliderConfig';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Slider, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const { Header, Content, Sider } = Layout;

const menuItems: MenuProps['items'] = sliderConfig.map(
    (icon) => {

        return {
            key: `${icon.key}`,
            label: `${icon.label}`,

            children: icon.children.map((_, j) => {
                return {
                    key: _.key,
                    label: `${_.label}`,
                };
            }),
        };
    },
);

// 定义一个方法递归遍历sliderConfig，pathArr数组保存了每一层级对应的key, 拼接每一层级的path，然后跳转到对应的路由
const getSliderPath = (sliderConfig: any, pathArr: any) => {
    let path = ''
    let pathNameArr:Array<string> = []
    let children:any = []

    pathArr.forEach((item:string) => {
        const sliderConfigItem = children.length == 0 ? sliderConfig.find((_:any) => _.key == item) : children.find((_:any) => _.key == item)
        if (!children.length) {
            path += sliderConfigItem.path
            children = sliderConfigItem.children
            pathNameArr.push(sliderConfigItem.label)
        }
        else if (children.length && sliderConfigItem.children) {
            path += sliderConfigItem.path
            children = sliderConfigItem.children
            pathNameArr.push(sliderConfigItem.label)
        } else {
            path += sliderConfigItem.path
            pathNameArr.push(sliderConfigItem.label)
        }
    })

    return {
        path,
        pathNameArr
    }
}


const Home: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // 侧边栏点击事件
    const navigateTo = useNavigate();
    const SliderClick = (e: any) => {
        // 根据e.keypath获取path
        const pathArr = e.keyPath.reverse()
        let { path, pathNameArr } = getSliderPath(sliderConfig, pathArr)
        navigateTo(path)
        setPathNameArr(pathNameArr)
    }
    let { pathNameArr } = getSliderPath(sliderConfig, [1, 11])
    const [usePathNameArr, setPathNameArr] = useState(pathNameArr)
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['11']}
                        defaultOpenKeys={['1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={menuItems}
                        onSelect={SliderClick}
                    />
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