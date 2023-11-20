import { loginFn } from '@/api/login/'
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
    login(val:loginVal){
        return async(dispath) => {
            loginFn(val).then(res => {
                if(res.code === 200){
                    dispath({
                        type:'LOGIN',
                        val:res.data.token
                    })
                }
            })
        }
    }
}