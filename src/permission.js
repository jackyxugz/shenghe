import router from './router'
import store from './store'

router.beforeEach(async(to,from,next)=>{
    if(to.path=='/login'){
        next();
    }else {
        //有没有角色
        //如果有角色
        var getRoles = store && store.getters.roles && store.getters.roles.length>0;
        if(getRoles) {
            next();
        }else {
            //获取详情信息,发送请求
            var  {roles} = await store.dispatch('getInfo');
            //取出角色
            var rolesName= roles.map(v=>v.name);
            //过滤角色
            var filterRoutes = await store.dispatch('GENERATEROUTES',rolesName);
            //动态添加
            router.addRoutes(filterRoutes);
            if(roles) {
                next({path:to.path})
            }else {
                next({path:'/login'})
            }
        }
    }
})