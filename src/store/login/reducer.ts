import loginState from "./index";

let reducer = (state = loginState.state, action:{type:string,val:number}) => {
    let newState = JSON.parse(JSON.stringify(state));

    for(let key in loginState.actions){
        if(key === action.type){
            loginState.actions[key as keyof typeof loginState.actions](newState, action);
        }
    }

    return newState;
}

export default reducer;
