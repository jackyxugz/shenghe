import {login,userInfo,logout} from '@/api/api'
import {setToken,getToken,removeToken} from '@/utils/setToken'

const state = {
  token:getToken(),
  roles:[]
}
const getters = {
  roles:state=>state.roles, 
  token:state=>state.token, 
}

const actions = {
  loginLoan ({commit},d){
    return new Promise((resolve,reject)=>{
      login(d).then(res=>{
        let {code,data} = res.data;
        if(code == 20000){
          let {token} = data;
          commit('SETTOKEN',token);  
          setToken(token);  //保存token
        }
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  getInfo ({commit}){
    return new Promise((resolve,reject)=>{
      userInfo().then(res=>{
        let {code,data} = res.data;
        //if(code == 20000){
          commit('SETROLES',data.roles);  
        //}
        resolve(data)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  logoutLoan ({commit},d){
    return new Promise((resolve,reject)=>{
      logout().then(res=>{
        commit('SETROLES',[]);
        commit('SETTOKEN','');
        removeToken(); //删除token
        resolve()
      }).catch(err=>{
        reject(err)
      })
    })
  },
  
}

const mutations = {
  SETTOKEN(state,token){
    state.token = token;
  },
  SETROLES(state,roles){
    state.roles = roles;
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}