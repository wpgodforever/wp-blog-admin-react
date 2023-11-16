import * as TYPES from '../action-types.ts';

const initState = {
    token: '',
}

let reducer = (state = initState, action:{type:string,val:number}) => {
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case TYPES.LOGIN_TEST:
            newState.token = action.val;
            break
    }

    return newState;
}

export default reducer;
