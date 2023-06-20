import loginState from "./index";

let reducer = (state = loginState.state, action:{type:string,val:number}) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case loginState.increment:
            loginState.actions.increment(newState, action);
            break;
        default:
            break;
    }
    return newState;
}

export default reducer;
