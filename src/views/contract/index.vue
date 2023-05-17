<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入姓名" style="width: 200px;" class="filter-item" 
      @input = "getList" />
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        搜索
      </el-button>
    </div>

    <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      prop="loan_name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="loan_card"
      label="身份证号码"
     >
    </el-table-column>
    <el-table-column
      prop="file_path"
      label="合同状态"
     >
     <template slot-scope="{row}">
          <el-tag  :type="row.file_path |statusTypeFilter" >  
            {{ row.file_path |statusFilter}}
          </el-tag>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="300">
      <template slot-scope="{row}">
        <el-button
          size="mini" type="primary" @click="handleCreate(row)" :disabled="row.file_path!=null"
          >生成合同</el-button>
         <el-button
          size="mini"
          type="danger"  @click="handleDownload(row)" :disabled="row.file_path==null"
          >下载合同</el-button>
          
      </template>
    </el-table-column>
  </el-table>


    <!-- 分页封装处理 -->
    <Pagination v-show="rows >0"
      :pageNo.sync ="listQuery.pageNo"
      :curSizes.sync="listQuery.pageSize"
      :total="rows"
      @getList = "getList">
    </Pagination>


  </div>
</template>

<script>
import { contractList ,contractCreateFile, contractDownload } from '@/api/api'
import Pagination from '@/components/pagination' 
import { getToken} from '@/utils/setToken'

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      rows: 1, //总数量
      listQuery: {
        pageNo: 1, //当前页码
        pageSize: 10,//条数
        name: '',//查询条件-姓名
      },
    }
  },
   filters: {
    statusFilter(type) {  //合同状态
        if(type){
          return "已生成合同"
        }else {
          return "未生成合同"
        }
    },
    statusTypeFilter(type) {  //状态样式 
        if(type){
            return "success"
          }else {
            return "primary"
          }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      contractList(this.listQuery).then(res => {
        var {code} = res.data;
        console.log(code);
        if(code == '20000'){
          var {data,rows} = res.data.data.data;
            this.list = data;  //获取展示的数据
            this.rows = rows; //获取总数量

          }
      })
    },
   
    //生成合同
    handleCreate(row){
      contractCreateFile({id:row.id}).then(res => {
        var {code} = res.data;
        if(code == '20000'){
            this.getList();//调用查询接口
              this.$notify({
                title: '生成合同',
                message: '生成合同提交成功',
                type: 'success',
                duration: 2000
              });
            }
        })
    },
    
    //下载
    handleDownload(row) {
      contractDownload({id:row.id}).then(res => {
        var {code} = res.data;
        if(code == '20000'){
              this.$notify({
                title: '下载合同',
                message: '下载合同提交成功',
                type: 'success',
                duration: 2000
              });
              this.downloadUrlFile(this.url+res.data.data.url);
            }
        })
    },
    downloadUrlFile(url) {
      const xhr = new XMLHttpRequest();  //调用XHR  通过请求获取数据流
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';  //响应类型  blob字节流
      xhr.setRequestHeader('token', getToken());  //传入token
      xhr.onload = () => {
        if (xhr.status === 200) {
          // 获取图片blob数据并保存   responseURL
          var filename = xhr.responseURL.substring(xhr.responseURL.lastIndexOf("/")+1);
          this.saveAs(filename, xhr.response);
        }
      };
      xhr.send();  //发送
    },
    saveAs(name, data) {
        var urlObject = window.URL;  //window对象的URL对象是专门用来将blob或者file读取成一个url的。
        var export_blob = new Blob([data]); //Blob对象可以看作是存放二进制数据的容器
        var save_link = document.createElement('a');//创建a标签
        save_link.href = urlObject.createObjectURL(export_blob); //通过URL.createObjectURL(blob)可以获取当前文件的一个内存URL
        save_link.download = name;
        save_link.click();//触发a标签
    }
  }
}
</script>
