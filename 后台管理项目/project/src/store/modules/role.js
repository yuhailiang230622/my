import { getRoleList } from '../../util/axios'


const state = {
    roleList: []
}

const getters = {
    getRoleList() {
        return state.roleList
    }
}

const mutations = {
    REQ_ROLELIST(state, payload) {
        state.roleList = payload
    }
}

const actions = {
    getRoleAction({ commit }) {
        getRoleList()
            .then(res => {
                if (res.data.code == 200) {
                    // console.log(res,'你是谁');
                    commit('REQ_ROLELIST', res.data.list)
                }
            })
    }
}


export default {
    state,
    getters,
    mutations,
    actions,

    namespaced: true
}



