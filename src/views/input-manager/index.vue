<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入姓名" style="width: 200px;" 
      class="filter-item" 
      @input="getList()"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" >
        搜索
      </el-button>
    </div>

    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      fixed
      prop="name"
      label="姓名"
      width="100"
      column-key="name"
      >
    </el-table-column>
    <el-table-column
      prop="birthday"
      label="出生日期"
      width="120"
      sortable>
      <template slot-scope="{row}">
        <span>{{ row.birthday }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="80">
      <template slot-scope="{row}">
        <span>{{ row.sex | getSex}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="education"
      label="教育程度"
      width="100"
      >
      <template slot-scope="scope">
        <span>{{ scope.row.education}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="address1" 
      label="居住地址" 
      width="200">
    </el-table-column>
    <el-table-column
      prop="mobile_phone"
      label="手机号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="申请状态"
      width="100">
      <template slot-scope="{row}">
        <el-tag :type="row.status | getStatusStyle">{{ row.status |getStatus}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="250">
      <template slot-scope="{row}">
        <el-button
          size="mini" type="primary" :disabled="row.status!=0 && row.status!=3 &&row.status!=6"
          >编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          :disabled="row.status!=0 && row.status!=3 &&row.status!=6"
          >删除</el-button>
          <el-button
          size="mini" type="success" :disabled="row.status!=0 && row.status!=3 &&row.status!=6"
          @click="submit(row)"
          >提交审核</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 编辑弹层功能 -->
    <!-- <el-dialog title="申请管理-编辑" :visible.sync="dialogFormVisible">
      <el-form ref="updateForm"  :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="ID" prop="id" v-show="false">
              <el-input v-model="temp.id" />
            </el-form-item>
          <el-form-item label="姓名" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker type="datetime" v-model="temp.birthday" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="temp.sex" class="filter-item" placeholder="Please select">
              <el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="教育程度" prop="education">
            <el-select v-model="temp.education" class="filter-item" placeholder="Please select">
              <el-option v-for="item in educationOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="居住地址" prop="address1">
              <el-input v-model="temp.address1" />
            </el-form-item>
          <el-form-item label="手机号" prop="mobile_phone">
            <el-input v-model.number="temp.mobile_phone" />
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          编辑
        </el-button>
      </div>
    </el-dialog> -->

    <!-- 删除弹层功能 -->
    <!-- <el-dialog title="申请管理-删除" :visible.sync="dialogDelVisible">
      <p>确定删除？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDelVisible = false">
          取消
        </el-button>
        <el-button type="danger" @click="delData()">
          删除
        </el-button>
      </div>
    </el-dialog> -->

    <!-- 分页 
     :pageNo.sync ="listQuery.pageNo"  == this.$emit('update:pageNo',val);===> listQuery.pageNo = val-->
     <Pagination v-show="rows >0"
      :pageNo.sync ="listQuery.pageNo"
      :curSizes.sync="listQuery.pageSize"
      :total="rows"
      @getList = "getList">
    </Pagination>

    <!-- :page-sizes="[100, 200, 300, 400]" 条数选择 
    :page-size="10" 每一页条数
    total 总条目数
    current-page 页码
    -->
  </div>
</template>

<script>
import {loanList,submitToApprove} from '@/api/api'
import {sexOptions,educationOptions} from '@/utils/selectData'
import Pagination from '@/components/pagination'

export default {
  data() {
    return {
      tableData: [],
      //pages:1,  //总页数
      rows:1,  //总数量
      listQuery:{
        pageNo:1,  //页码
        pageSize:10, //每页条数
        name:''   //查询条件
      },
      sexOptions,
      educationOptions
    }
  },
  filters:{
    getSex(data){
      switch(data){
        case 'man':
          return '男';
        case 'woman':
          return '女';
         default:
           return data; 
      }
    },
    getStatusStyle(data){
      switch(data){
        case 0:
          return 'info';
        case 1:
          return 'success';
        case 2:
          return 'info';
        case 3:
          return 'danger';
        case 4:
          return 'success';
        case 5:
          return 'success';
        case 6:
          return 'danger';
        case 7:
          return 'info';
         default:
           return data; 
      }
    },
    getStatus(data){
    // - 0-默认值进件状态
    // - 1-提交初审状态
    // - 2-初审通过状态
    // - 3-初审拒绝状态
    // - 4-提交终审状态
    // - 5-终审通过状态
    // - 6-终审拒绝状态
    // - 7-生成合同状态
      switch(data){
        case 0:
          return '进件';
        case 1:
          return '提交初审';
        case 2:
          return '初审通过';
        case 3:
          return '初审拒绝';
        case 4:
          return '提交终审';
        case 5:
          return '终审通过';
        case 6:
          return '终审拒绝';
        case 7:
          return '生成合同';
         default:
           return data; 
      }

      
    }
  },
  created() {
    this.getList();
  },
  components:{Pagination},
  methods: {
    getList(){
      loanList(this.listQuery).then(res=>{
        console.log(res);
        let {code} = res.data;
        if(code==20000){
          let {data,rows,pages} = res.data.data.data;
          this.tableData = data;
          //this.pages = pages;
          this.rows = rows; 
        }
      })
    },
    submit(row){  //提交
      submitToApprove({id:row.id}).then(res=>{
        console.log(res);
        this.getList();
        this.$notify({
          title: '提交审核',
          message: '提交成功',
          type: 'success',
          duration:1000
        });
      })
    },
    
  }
}
</script>
