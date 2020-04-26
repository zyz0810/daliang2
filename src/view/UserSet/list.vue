<template>
  <div>
    <div class="Flex breadcrumbDiv MarginTop">
      <div><h4 class="TextColorGlay">{{$route.meta.title}}</h4></div>
      <div class="LeftCenter AddTask">
        <span class="backColor" @click="Adduserdialog()"><svg-icon icon-class="AddUser"></svg-icon>添加人员</span>
        <span class="DeleteIco" @click="deletdialogFormVisible=true"><i class="el-icon-delete"></i>删除</span>
      </div>
    </div>
    <el-row class="content">
      <el-col :span="24" class="list MarginTop20">
        <el-table :data="tableData" width="100%" v-loading="dataloading" @selection-change="handleSelectionChange" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading" :header-cell-style="{background:'#EBECED'}">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="经纪人姓名" align="center"><template slot-scope="{row}">{{ row.agentName || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="联系方式" align="center"><template slot-scope="{row}">{{ row.agentPhone || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="所属营业部" align="center"><template slot-scope="{row}">{{ row.userName || '--' }}</template></</el-table-column>
          <el-table-column show-overflow-tooltip label="主要任务完成数" align="center"><template slot-scope="{row}">{{ row.mainCompletedNumber || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="辅助任务完成数" align="center"><template slot-scope="{row}">{{ row.auxiliaryCompletedNumber || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="主要任务出库吨数" align="center"><template slot-scope="{row}">{{ row.mainOutNumber || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="辅助任务出库吨数" align="center"><template slot-scope="{row}">{{ row.auxiliaryOutNumber || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="添加时间" align="center"><template slot-scope="{row}">{{ row.crttime || '--' }}</template></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="page">
        <span class="FloatLeft TextColorGlay">共{{totalRecords}}条</span><el-pagination @current-change="handleCurrentChange"  :page-size="SearchData.pageSize" background layout="prev, pager, next,jumper" :total="totalRecords"> </el-pagination>
      </el-col>
    </el-row>
    <!-- 添加人员 -->
    <el-dialog class="dialog" title="添加经纪人" :visible.sync="AdduserdialogFormVisible" width="400px" :close-on-click-modal="false">
      <el-form :model="AddUserFrom" class="demo-ruleForm" :rules="rulesAddUserFrom" ref="AddUserFrom" label-width="100px" >
        <el-form-item label="经纪人姓名" prop="agentName">
          <el-input  v-model="AddUserFrom.agentName" style="width: 204px;" maxlength="30" clearable placeholder="请输入经纪人姓名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="agentPhone">
          <el-input v-model="AddUserFrom.agentPhone" style="width: 204px;" maxlength="11" clearable placeholder="请输入联系方式" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属营业部" prop="sourceUserId">
          <el-select v-model="AddUserFrom.sourceUserId" style="width: 204px;" placeholder="请选择">
            <el-option v-for="(item,index) in DepartOption" :key="index" :label="item.userName" :value="item.userId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="TextCenter">
        <el-button type="primary" :loading="Loginloading" @click="SubmitAddUser()">确定</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示 -->
    <el-dialog class="dialog" title="提示" :visible.sync="deletdialogFormVisible" width="400px" :close-on-click-modal="false">
      <h3 class="warnTip"><i class="el-icon-warning warningText"></i> 确认删除后数据将不可恢复</h3>
      <div class="TextCenter">
        <el-button type="primary" :loading="DelLoginloading" @click="SubmitDeleteUser()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import AdminApi from '@/api/AdminApi.js'
  import { mapGetters , mapActions} from 'vuex'
  import { validatePhone } from '@/assets/js/validator';
  export default{
    data(){
      return{
        Loginloading:false,
        dataloading:false,
        DelLoginloading:false,
        AdduserdialogFormVisible:false,
        deletdialogFormVisible:false,
        tableData:[],
        AddUserFrom:{
          agentName:'',
          agentPhone:'',
          sourceUserId:'',
          sourceUserName:''
        },
        rulesAddUserFrom:{
          agentName:[
            {required:true,message:'请输入经纪人姓名',trigger:'blur'}
          ],
          agentPhone:[
            {required:true,message:'请输入联系方式',trigger:'blur'},
            { validator:validatePhone, trigger:'blur'},
          ],
          sourceUserId:[
            {required:true,message:'请选择营业部',trigger:'change'}
          ],
        },
        SearchData:{
          currentPage:1,
          pageSize:10,
        },
        totalRecords:0,
        multipleSelection:[]
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'DepartOption'
      ])
    },
    methods:{
     ...mapActions([
      'GetDepartOption'
      ]),
      GetList:function(){
        this.dataloading = true
        let Params = this.SearchData
        AdminApi.getUserAgent(Params).then(data=>{
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
      Adduserdialog:function(){
        this.GetDepartOption(this.permissions)
        this.AdduserdialogFormVisible = true
        this.$nextTick(()=>{
           this.$refs['AddUserFrom'].resetFields()
        })
      },
      handleCurrentChange:function(val){
        this.SearchData.currentPage = val
        this.GetList()
      },
     SubmitAddUser:function(){
      this.$refs['AddUserFrom'].validate((valid)=>{
        if(valid){
          let sourceUserName = ''
          this.DepartOption.map(item=>{
            if(item.userId == this.AddUserFrom.sourceUserId){
              sourceUserName = item.userName
            }
          })
          if(!sourceUserName){
            this.$message.error('系统错误');
          }
          this.AddUserFrom.sourceUserName = sourceUserName
          this.Loginloading = true
          let Params = this.AddUserFrom
          AdminApi.addUserAgent(Params).then(data => {
            this.Loginloading = false
            let { message , statusCode } = data
            if(statusCode == 0){
              this.AdduserdialogFormVisible = false
              this.GetList()
              this.$message.success(message);
            }else{
              this.$message.error(message);
            }
          })
        }else{
          this.$message.error('请输入正确的信息');
        }
      })
     },
     handleSelectionChange:function(val){
       this.multipleSelection = val;
     },
     SubmitDeleteUser:function(){
       if(!this.multipleSelection || this.multipleSelection.length<=0){
         this.$message.error('请选择经纪人');
         return false
       }
       this.DelLoginloading = true
       let agentIdsArr = []
       agentIdsArr = this.multipleSelection.map(item=>{
         return item.agentId
       })
       let Params = {'agentIds':agentIdsArr.join(',')}
       AdminApi.delUserAgent(Params).then(data => {
         this.DelLoginloading = false
         let { message , statusCode } = data
         if(statusCode == 0){
           this.deletdialogFormVisible = false
           this.GetList()
           this.$message.success(message);
         }else{
           this.$message.error(message);
         }
       })
     }
    },
    mounted() {
      this.GetList()
    }
  }
</script>

<style scoped>
  .MarginTop20{margin-top: 1.25rem;}
  .backColor{background: #E3F5FF;padding: 0.5rem 0.625rem;border-radius: 0.9375rem;}
  .DeleteIco{background: #FFEAEA;padding: 0.5rem 0.625rem;color: #EB4A4A;border-radius: 0.9375rem;}
  .warnTip{color: #333333;text-align: center;}
  .warnTip .warningText{color: #e8972e;font-size:1.5625rem;}
</style>
