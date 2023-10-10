const test1 = (props) => {
    console.log(props,'props11')
    return (
        <div>
            <h1>test1</h1>
        </div>
    );
}

// function HOC(WrappedComponent) {
//     const newProps = { type: 'HOC' }
//     return function (props) {
//         return <WrappedComponent {...props} {...newProps} />
//     }
// }
function HOC(WrappedComponent) {
    const newProps = { type: 'HOC' }
    return (props) => {
        console.log(props,'props')
        return <WrappedComponent {...props} {...newProps} />
    }
}

export default HOC(test1);