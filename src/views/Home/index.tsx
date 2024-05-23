import React from 'react';

const Home: React.FC = () => {
    // 发起一个fetch请求
    const fetchData = async () => {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();
        console.log(data);
    }

    return (
        <div onClick={() => fetchData()}>空白展示</div>
    );
};

export default Home;