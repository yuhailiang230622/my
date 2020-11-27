import axios from 'axios';
import { Toast } from 'vant';
import router from '../../router'

const http = axios.create({
    baseURL: '/api/api'
});

http.interceptors.request.use(req => {
    let token = sessionStorage.getItem('userInfo') ?
        JSON.parse(sessionStorage.getItem('userInfo')).token : '';
        req.headers.authorization=token;
        return req
});

http .interceptors.response.use(res=>{
    if(res.code==500){
        Toast.fail(res.msg);
        router.push('/login');
        return res.data;
    }else if(res.code==403){
        Toast.fail(res.msg)
        router.push('/login')
        return res.data;
    }else{
        return res.data
    }
})

export default http;