import React from 'react';
import { Menu, } from 'antd';
import { sliderConfig, getLocationArr, getLabelArr } from './sliderConfig';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation, } from 'react-router-dom';
const menuItems: MenuProps['items'] = sliderConfig.map(
    (icon) => {

        return {
            key: `${icon.path}`,
            label: `${icon.label}`,

            children: icon.children?icon.children?.map((_, j) => {
                return {
                    key: _.path,
                    label: `${_.label}`,
                };
            }):null,
        };
    },
);



const MainMenu: React.FC = (props: any) => {
    // 侧边栏点击事件
    const navigateTo = useNavigate();
    const SliderClick = (e: any) => {
        navigateTo(e.key)
        const pathNameArr = getLabelArr(sliderConfig, location.pathname)
        props.pathMethod(pathNameArr)
    }
    const location = useLocation();
    const pathArr = getLocationArr(sliderConfig, location.pathname)
    console.log(location, 'location')
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={pathArr}
            defaultOpenKeys={pathArr}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onSelect={SliderClick}
        />
    )
}

export default MainMenu;