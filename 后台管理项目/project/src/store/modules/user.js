import { getUserList, getUserCount } from "../../util/axios"

const state = {

    userList: [],
    size: 2,//每个组件渲染的条数
    page: 1,//页码
    total: 0//总条数

}

const getters = {
    // 导出用户列表
    getUserList() {
        return state.userList;
    },
    // 导出总条数
    getUserCount() {
        return state.total;
    },
    // 导出总条数
    getUserSize() {
        return state.size;
    }



}

const mutations = {
    // 修改state的userList
    REQ_USERLIST(state, payload) {
        state.userList = payload;
    },
    // 修改state中的total总条数
    REQ_USERCOUNT(state, payload) {
        state.total = payload;
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
}

const actions = {
    // 封装一个获取管理员列表的行动
    getUserAction(context) {
        //  console.log(context,'context');

        // 调取列表接口
        getUserList({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                console.log(res, '响应');
                context.commit('REQ_USERLIST', res.data.list)
            }
        })
    },
    // 封装一个获取总条数事件
    getCountAction({ commit }) {
        getUserCount().then(res => {
            if (res.data.code == 200) {
                commit('REQ_USERCOUNT', res.data.list[0].total)
            }
        })
    },
    // 修改一个修改page的action
    changePageAction(context, payload) {
        console.log('REQ_PAGE', 'HHHHHH');
        context.commit('REQ_PAGE', payload)
        // 重新调取列表
        context.dispatch('getUserAction')
    }




}

export default {
    state,
    getters,
    mutations,
    actions,

    namespaced: true

}