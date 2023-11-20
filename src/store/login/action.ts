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
            dispath({
                type:'LOGIN',
                val
            })
        }
    }
}