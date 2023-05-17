<template>
  <div >
   <el-container>
     <!-- 左侧导航 -->
      <NavMenu />
    <!-- 右侧主体 -->
    <el-container>
      <!-- 上部分 -->
      <el-header>
        <Top />
      </el-header>
      <!-- 主体部分 -->
      <el-main>
        <Main />
    </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import {NavMenu,Top,Main} from './components'

export default {
  data(){
    return {
      
    }
  },
  components:{
    NavMenu,
    Top,
    Main
  },
  methods:{
    logout(){
      console.log(11222)
      this.$router.push('/login');
    }
  }
}
</script>

