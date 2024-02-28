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
    },
    asyncRouter(){
        return async(dispath:Function) => {
            setTimeout(() =>{
                dispath({
                    type:'ADDROUTER',
                    val: [
                        {
                            path: '/test',
                            element: '../views/Layout/index.tsx',
                            children: [
                                {
                                    path: '/test/roleTest',
                                    element: '../views/test1/index.tsx',
                                    meta: {
                                        title: '测试',
                                        role: ['test']
                                    }
                                },
                            ]
                        },
                    ]
                })
            },1000)
        }
    },
}