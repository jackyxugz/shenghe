import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入user 模块
import user from "./modules/user"
import permission from "./modules/permission"

const store = new Vuex.Store({
    modules: {
      user,
      permission
    }
})

export default store






