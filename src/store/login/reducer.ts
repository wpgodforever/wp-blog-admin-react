const initState = {
    token: '',
}

let reducer = (state = initState, action:{type:string,val:number}) => {
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'LOGIN':
            newState.token = action.val;
            break
        case 'LOGOUT':
            newState.token = '';
            break
        default://持久化的时候，如果没有匹配到任何的action.type，依旧返回newState的话会导致持久化失败
            return state
            
    }

    return newState;
}

export default reducer;
