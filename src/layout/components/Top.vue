<template>
  <div class="header">
    <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item v-for="v in list" :key="v.path">{{v.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
        <span class="el-dropdown-link">
        退出<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
            <span @click="goBack()">退出</span>
        </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    </div>
</template>

<script>

export default {
  data(){
    return {
      list:[]
    }
  },
  watch:{
    $route(to,from){
      this.list = to.matched.filter(item=>item.meta && item.meta.title);
    }
  },
  mounted(){
    this.list = this.$route.matched.filter(item=>item.meta && item.meta.title);
  },
  methods:{
    goBack(){
      this.$store.dispatch('logoutLoan').then(res=>{
        this.$router.push('/login');
      })
    }
  }
}
</script>

<style lang="scss">
  .header {
    line-height: 60px;
    .breadcrumb {
      display:inline-block;
    }
    .el-dropdown {
      float: right;
    }
  }
</style>