import { useState, useRef, useEffect } from "react"; 
const useStateCase = () => {
    const [count, setCount] = useState(0);
    const countRef = useRef(count);
    const stateClick1 = () => {
        setCount(count + 1);
        console.log('count:', count);
    }
    const stateClick2 = () => {
        setCount(preCount => preCount + 1);
        setTimeout(() => {
            console.log('countRef:', countRef.current);
        }, 0);
    }
    useEffect(() =>{
        countRef.current = count;
        console.log('useEffect中的countRef：'+countRef.current)
        console.log('useEffect中的count：'+count)
    })
    return (
        <div>
            <h1>useState:{ count }</h1>
            <div><button onClick={() => setCount(count + 1)}>点击(基础使用)</button></div>
            <div><button onClick={ () => stateClick1() }>点击(无法实时获取更新后的count)</button></div>
            <div><button onClick={ () => stateClick2() }>点击(可以实时获取更新后的count的方法)</button></div>
        </div>
    )
}

export default useStateCase;