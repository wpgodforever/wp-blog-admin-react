import * as TYPES from '../action-types.ts';

export default {
    login(val){
        return {
            type:TYPES.LOGIN_TEST,
            val
        }
    },
}