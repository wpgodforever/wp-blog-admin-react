import { loginFn } from '@/api/login'

interface loginVal {
    username:string,
    password:string
} 

export default {
    // login(val:loginVal){
    //     return {
    //         type:'LOGIN',
    //         val
    //     }
    // },
    login(val:loginVal,resolve:Function){
        return async(dispath:Function) => {
            loginFn(val).then(res => {
                dispath({
                    type:'LOGIN',
                    val: res.data.token
                })
                resolve(true)
            })
        }
    },
    logout(){
        return {
            type:'LOGOUT'
        }
    }
}