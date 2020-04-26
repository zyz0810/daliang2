<template>
  <div>
    <div class="Flex breadcrumbDiv MarginTop">
      <div><h4 class="TextColorGlay">{{$route.meta.title}}</h4></div>
      <div class="LeftCenter AddTask" v-if="permissions==1">
        <router-link to="/task/list/taskadd">
          <i class="el-icon-folder-add"></i>添加任务
        </router-link>
      </div>
    </div>
    <el-row class="content">
      <el-col :span="24" class="search">
        <el-form :inline="true" :model="SearchData" ref="SearchData" class="demo-form-inline">
          <el-form-item label="品类" prop="grainId">
            <el-select v-model="SearchData.grainId" @change="GetgrainVarietylist">
              <el-option label="请选择" value=""></el-option>
              <el-option v-for="(item,index) in GrainOption" :label="item.value" :value="item.key" :key="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品种" prop="grainVariety">
          <el-form-item label="品种" prop="grainVariety">
            <el-select v-model="SearchData.grainVariety">
              <el-option label="请选择" value=""></el-option>
              <el-option v-for="(item,index) in VarietyOption" :label="item.value" :key="item.key" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="等级" prop="orderGbgrade">
            <el-select v-model="SearchData.orderGbgrade">
              <el-option label="请选择" value=""></el-option>
              <el-option v-for="(item,index) in GradeOption" :label="item" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同号" prop="orderContract">
            <el-input v-model="SearchData.orderContract" placeholder="请输入合同号" clearable></el-input>
          </el-form-item>
          <el-form-item label="商户编号" prop="merchantNo">
            <el-input v-model="SearchData.merchantNo" placeholder="请输入商户编号" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="GetList()">查询</el-button>
            <el-button type="primary" plain @click="reastData()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" class="list">
        <el-table :data="tableData" width="100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading" :header-cell-style="{background:'#EBECED'}">
          <el-table-column type="index" label="编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="合同号" align="center"><template slot-scope="{row}">{{ row.orderContract || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="商户编号" align="center"><template slot-scope="{row}">{{ row.merchantNo || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="品类" align="center"><template slot-scope="{row}">{{ row.grainName || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="品种" align="center"><template slot-scope="{row}">{{ row.grainVarietyName || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="等级" align="center"><template slot-scope="{row}">{{ row.orderGbgrade || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="价格(元/吨)" align="center"><template slot-scope="{row}">{{ row.orderBugprice || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="合同数量(吨)" align="center"><template slot-scope="{row}">{{ row.contractNumber || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="完成数量(吨)" align="center"><template slot-scope="{row}">{{ row.finishNumbers || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="买方交易商" align="center"><template slot-scope="{row}">{{ row.buyUserName || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="卖方交易商" align="center"><template slot-scope="{row}">{{ row.sellUserName || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="实际存粮地点" align="center"><template slot-scope="{row}">{{ row.depotName || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="任务时间" align="center"><template slot-scope="{row}">{{ row.taskTime || '--' }}</template></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}" >
              <el-button type="primary" size="mini" @click="GetInfo(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="page">
        <span class="FloatLeft TextColorGlay">共{{totalRecords}}条</span><el-pagination @current-change="handleCurrentChange"  :page-size="SearchData.pageSize" background layout="prev, pager, next,jumper" :total="totalRecords"> </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AdminApi from '@/api/AdminApi.js'
  import { mapGetters , mapActions} from 'vuex'
  export default{
    data(){
      return{
        SearchData:{
          grainId:'',
          grainVariety:'',
          orderGbgrade:'',
          status:'',
          orderContract:'',
          merchantNo:'',
          currentPage:1,
          pageSize:8
        },
        dataloading:false,
        tableData:[],
        totalRecords:0,
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'GrainOption',
        'GradeOption',
        'VarietyOption',
      ])
    },
    methods:{
      ...mapActions([
        'GetGrainOption',
        'GetVatietyOption',
        ]),
      GetList:function(){
        this.dataloading = true
        let Params = this.SearchData
        AdminApi.getTaskOrderListByOrderContract(Params).then(data=>{
          this.dataloading = false
          let {message,statusCode} = data
          if(statusCode == 0){
            this.tableData = message.records
            this.totalRecords = message.totalRecords
          }else{
            this.$message.error(message);
          }
        })
      },
      GetgrainVarietylist:function(e){
        this.SearchData.grainVariety = ''
        this.GetVatietyOption(e)
      },
      reastData:function(){
        this.$refs['SearchData'].resetFields()
        this.GetList()
      },
      GetInfo:function(row){
        if(this.permissions == 1){
          sessionStorage.setItem('OrderInfo', JSON.stringify(row))
          this.$router.push({path:'/task/list/taskdetails'})
        }
        if(this.permissions == 2){
          sessionStorage.setItem('OrderInfo', JSON.stringify(row))
          this.$router.push({path:'/Salestask/list/taskdetails'})
        }
      },
      handleCurrentChange:function(val){
        this.SearchData.currentPage = val
        this.GetList()
      }
    },
    mounted() {
      this.GetGrainOption()
      this.GetList()
    }
  }
</script>

<style scoped>

</style>
