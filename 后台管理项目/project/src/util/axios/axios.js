
//引入axios核心库
import axios from 'axios'
// import router from '../../../../../shop-api/routes/login';
import router from '../../router'
// 重新建立一个实例
const http = axios.create(
    {
        baseURL: '/api'
    }
)

http.interceptors.request.use(req=>{
    let userInfo=sessionStorage.getItem('userInfo')?
    JSON.parse(sessionStorage.getItem('userInfo')):{}
    req.headers.authorization=userInfo.token;
    return req
})

http.interceptors.response.use(res=>{
    if(res.data.code==403){
        alert(res.data.msg)
        router.push('/login')
        return res;
    }else if(res.data.code==500){
        alert(res.data.msg);
        router.push('/login')
        return res;
    }else{
        return res
    }
})


// 导出http
export default http


