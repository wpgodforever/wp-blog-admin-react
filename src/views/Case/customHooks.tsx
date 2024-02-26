import { useEffect, useState } from 'react';

const customHooks = (props: any) => {
    useTitle('自定义hooks');
    console.log('重新render了');
    return (
        <div>
            <div>自定义hooks修改网页标签</div>
            <button onClick={useUpdate()}>强制更新</button>
        </div>
    )
}

// 修改标题的自定义hooks
const useTitle = (title: string) => {
    useEffect(() => {
        document.title = title;
    }, []);
}

// 强制更新的自定义hooks
const useUpdate = () => {
    const [, forceUpdate] = useState(0);
    return () => {
        forceUpdate(prev => prev + 1);
    }
}

export default customHooks;