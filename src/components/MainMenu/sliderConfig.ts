import { useLocation } from 'react-router-dom';
export const sliderConfig = [
    {
        key: 1,
        label: '博客管理',
        path: '/home',
        children: [
            {
                key: 11,
                label: '文章管理',
                path: '/blogList'
            },
            {
                key: 12,
                label: '标签管理',
                path: '/tagList'
            },
        ]
    }
]

// 定义一个方法递归遍历sliderConfig，pathArr数组保存了每一层级对应的key, 拼接每一层级的path，然后跳转到对应的路由
export const getSliderPath = (sliderConfig: any, pathArr: any) => {
    let path = ''
    let pathNameArr:Array<string> = []
    let children:any = []
    pathArr.forEach((item:string) => {
        const sliderConfigItem = children.length == 0 ? sliderConfig.find((_:any) => _.path == item) : children.find((_:any) => _.path == item)
        path += sliderConfigItem.path
        pathNameArr.push(sliderConfigItem.label)
        if (!children.length || (children.length && sliderConfigItem.children)) {
            children = sliderConfigItem.children
        }
        
    })

    return {
        path,
        pathNameArr
    }
}

// 刷新页面时，侧边栏选中刷新的状态
export const getLocationArr = () => {
    const location = useLocation();
    const pathArr = location.pathname.split('/').filter(item => item).map(item => '/' + item)
    return pathArr
}