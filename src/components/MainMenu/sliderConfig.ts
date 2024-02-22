export const sliderConfig = [
    {
        key: 0,
        label: '首页',
        path: '/',
    },
    {
        key: 1,
        label: '博客管理',
        path: '/blog',
        children: [
            {
                key: 11,
                label: '文章管理',
                path: '/blog/blogList'
            },
            {
                key: 12,
                label: '标签管理',
                path: '/blog/tagList'
            },
            {
                key: 13,
                label: '错误边界',
                path: '/blog/test1'
            },
        ]
    },
    {
        key: 2,
        label: '测试管理',
        path: '/test',
        children: [
            {
                key: 13,
                label: '测试1',
                path: '/test/blogList1'
            },
        ]
    },
    {
        key: 3,
        label: '案例管理',
        path: '/case',
        children: [
            {
                key: 31,
                label: 'hooks useRef',
                path: '/case/useRef'
            },
            {
                key: 32,
                label: 'hooks useEffect',
                path: '/case/useEffect'
            },
        ]
    }
]

// 刷新页面时，侧边栏选中刷新的状态
export const getLocationArr = ((arr: any, pathname: string) => {
    const location = pathname;
    const pathArr = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];

        if (item.children && item.children.length) {
            const childrenArr: any = getLocationArr(item.children, pathname)
            if (childrenArr.length) {
                pathArr.push(item.path)
                pathArr.push(childrenArr[0])

                break;
            }
        }
        else if (item.path === location) {

            pathArr.push(item.path)
            break;
        }
    }
    return pathArr
})

// 获取sliderConfig里对应的path的label数组
export const getLabelArr = ((arr: any, path: string) => {
    const labelArr = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item.children) {
            const childrenArr: any = getLabelArr(item.children, path)
            if (childrenArr.length) {
                labelArr.push(item.label)
                labelArr.push(childrenArr[0])

                break;
            }
        }
        else if (item.path === path) {
            labelArr.push(item.label)
            break;
        }
    }
    return labelArr
})
