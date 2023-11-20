let baseUrl= ""; //这里是一个默认的url，可以没有

switch (process.env.NODE_ENV) { 
    // case 'development': 
    //     baseUrl = "http://127.0.0.1:1244/"  //开发环境url  
    //     break 
    case 'development': 
        baseUrl = "http://47.95.203.205:1244/"  //开发环境url  
        break 
 
    case 'production': 
            baseUrl = "http://47.95.203.205:1244/"  //生产环境url 
        break 
}
 
export default  baseUrl 