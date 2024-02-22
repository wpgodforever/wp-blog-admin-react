import { useRef, useEffect, useState } from "react"; 

const useRefCase = () => {
    const elRef = useRef<HTMLHeadingElement | null>(null);
    const [pageInfo, setPageInfo] = useState({
        pageNo: 1,
        pageSize: 10
    })
    const pageInfoRef = useRef({
        pageNo: 1,
        pageSize: 10
    })
    const handleAdd = () => {
        setPageInfo((pre) => {
            console.log('pre---', pre)
            return {
                ...pre,
                pageNo: pre.pageNo + 1
            }
        })
       
    }

    const handleAlert = () => {
        setTimeout(() => {
            alert('pageInfo---' + pageInfo.pageNo)
        
        },2000)
    }

    const handleAddRef = () => {
        pageInfoRef.current.pageNo += 1
    }

    const handleAlertRef = () => {
        setTimeout(() => {
            alert('pageInfoRef---' + pageInfoRef.current.pageNo)
        
        },2000)
    }

    console.log('刚刚进入')
    useEffect(() => {
        console.log('useEffect', elRef)
        //可以获取dom对象
        setTimeout(() => {
            elRef.current!.innerHTML = 'useRef111'
        },2000)
    }, [])
    return (
        <div>
            <h1 ref={elRef}>useRef</h1>
            <button onClick={handleAdd}>点击页码+1</button>
            <button onClick={handleAlert}>alert pageInfo</button>
            <button onClick={handleAddRef}>点击页码+1 useRef</button>
            <button onClick={handleAlertRef}>alert pageInfoRef</button>
        </div>
    )
}

export default useRefCase;