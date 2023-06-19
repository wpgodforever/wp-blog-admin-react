import React from 'react';
import { Menu, } from 'antd';
import { sliderConfig, getSliderPath, getLocationArr } from './sliderConfig';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
const menuItems: MenuProps['items'] = sliderConfig.map(
    (icon) => {

        return {
            key: `${icon.path}`,
            label: `${icon.label}`,

            children: icon.children.map((_, j) => {
                return {
                    key: _.path,
                    label: `${_.label}`,
                };
            }),
        };
    },
);



const MainMenu: React.FC = (props: any) => {
    // 侧边栏点击事件
    const navigateTo = useNavigate();
    const SliderClick = (e: any) => {
        // 根据e.keypath获取path
        const pathArr = e.keyPath.reverse()
        let { path, pathNameArr } = getSliderPath(sliderConfig, pathArr)
        navigateTo(path)
        props.pathMethod(pathNameArr)
    }
    const pathArr = getLocationArr()
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