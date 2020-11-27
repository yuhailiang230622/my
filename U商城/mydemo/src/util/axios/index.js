
import http from './axios'

export function getBanner() {
    return http.get('/getbanner')
}
export function getIndexGoods() {
    return http.get('/getindexgoods')
}
export function getCartTree() {
    return http.get('/getcatetree')
}
export function getGoods(params) {
    return http.get('/getgoods', {
        params
    })
}
export function getGoodsInfo(params) {
    return http.get('/getgoodsinfo', {
        params
    })
}
export function getCartList(params) {
    return http.get('/cartlist', {
        params
    })
}
export function getCartAdd(data) {
    return http.post('/cartadd', data)
}
export function getCartDelete(data) {
    return http.post('/cartdelete', data)
}
export function getRegister(data) {
    return http.post('/register', data)
}
export function getLogin(data) {
    return http.post('/login', data)
}

