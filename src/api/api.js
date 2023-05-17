import axios from '.'  //import axios from './index'

export function login(data){  //登录
    return axios({
        method:'post',
        url:`/user/login`,
        data
    })
}

export function userInfo(){  //详情
  return axios({
      method:'get',
      url:`/user/info`,
  })
}

export function logout(){  //退出
    return axios({
        method:'post',
        url:`/user/logout`
    })
}


  
export function loanCreate(data){  //贷款申请
    return axios({
        method:'post',
        url:`/loan/create`,
        data
    })
}

export function loanList(data){  //申请管理
    return axios({
        method:'get',
        url:`/loan/list`,
        params:data
    })
}

export function submitToApprove(data){  //申请管理 -- 提交
    return axios({
        method:'post',
        url:`/loan/submitToApprove`,
        data
    })
}

//标的管理
export function contractList(data) {  //标的管理-列表数据
    return axios({
      url: 'contract/list',
      method: 'get',
      params: data
    })
  }
  export function contractCreateFile(data) {  //标的管理-生成合同
    return axios({
      url: 'contract/createFile',
      method: 'post',
      data
    })
  }
  export function contractDownload(data) {  //标的管理-下载合同
    return axios({
      url: 'contract/download',
      //responseType: "blob", //必须要填写
      method: 'get',
      params: data
    })
  }

  export function permissionUserlist(data) {  //权限管理-列表展示
    return axios({
      url: 'user/list',
      method: 'get',
      params: data
    })
  }