<template>
  <div>
      <!-- 没有子级 -->
      <el-menu-item :index="path" v-if="!item.children">
        <i class="el-icon-setting"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>


      <!-- 有子级 -->
      <el-submenu :index="path" v-else>
        <template slot="title">{{item.meta.title}}</template>
        <sideItem v-for="child in item.children" :key="child.path" :item="child" :path="getPath(child.path)"/>
      </el-submenu>

  </div>
</template>

<script>
import _path from 'path'
export default {
  name:'sideItem',
  data(){
    return {

    }
  },
  props:["item","path"],
  methods:{
    //_path.resolve('a/b','./c')    '/a/b/c'
    getPath(url){
      return _path.resolve(this.path,url);
    }
  }
}
</script>



