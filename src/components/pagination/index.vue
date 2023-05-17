<template>
  <div class="pagination">
    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      :layout="layout"
      :total="total">
    </el-pagination>

    <!-- :page-sizes="[100, 200, 300, 400]" 条数选择 
    :page-size="10" 每一页条数
    total 总条目数
    current-page 页码
    -->
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type:Number
    },
    pageSizes: {  //[10, 20, 30, 40]
      type:Array,
      default(){
        return [10, 20, 30, 40]
      }
    },
    pageNo: {  //页码
      type:Number,
      default: 1
    },
    curSizes: {  //每页条数
      type:Number,
      default: 10
    },
    layout: {
      type:String,
      default:"total, sizes, prev, pager, next, jumper"
    }
  },
  computed:{
    currentPage:{
      get(){
        return this.pageNo
      },
      set(val){
        this.$emit('update:pageNo',val);
      }
    },
    pageSize:{
      get(){
        return this.curSizes
      },
      set(val){
        this.$emit('update:curSizes',val);
      }
    }
  },
  methods:{
    handleSizeChange(val) {   //页数改变触发
      console.log(`每页 ${val} 条`);
      this.$emit('getList')
    },
    handleCurrentChange(val) {  //页码改变触发
      console.log(`当前页: ${val}`);
      this.$emit('getList')
    }
  }
}
</script>

