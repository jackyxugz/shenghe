<template>
      <el-aside width="200px" class="aside">
      <!-- 左侧导航 -->
      <el-menu
      :default-active="$route.path" exact
      router> 
      <sideItem v-for="v in get_routes[0].children" :key="v.path" :item="v" :path="v.path"/>
      </el-menu>
    </el-aside>
    
</template>

<script>
import {mapGetters} from 'vuex'
import sideItem from './sideItem'
export default {
  data(){
    return {

    }
  },
  computed:{
    ...mapGetters(['get_routes'])
  },
  components:{
    sideItem
  }
}
</script>



