import { useEffect, useState } from "react"; 

const useEffectCase = () => {
    const [count, setCount] = useState(0);

    //用处：每次渲染都会执行
    useEffect(() => {
        console.log('@1', count);
    });

    //用处：第一次渲染执行
    useEffect(() => {
        console.log('@2', count);
    }, []);

    //用处：第一次渲染执行，依赖变化时执行
    useEffect(() => {
        console.log('@3', count);
    }, [count]);


    //用处：清除副作用 | 第一次渲染不执行，依赖变化时执行
    useEffect(() => {
        return () => {
            console.log('@', count);
        }
    }, [count]);

    return (
        <div>
            <h1>useEffect</h1>
            <button onClick={() => setCount(count + 1)}>点击</button>
        </div>
    )
}

export default useEffectCase;