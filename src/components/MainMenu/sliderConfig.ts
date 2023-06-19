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