export default {
    state: {
        num: 1
    },
    actions: {
        increment(newState:{num:number}, action:{type:string,val:number}){
            newState.num += action.val;
        }
    },
    increment:'increment'
}