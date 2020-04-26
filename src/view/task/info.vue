<template>
  <div>
    <div class="Flex breadcrumbDiv MarginTop">
      <div><h4 class="TextColorGlay">{{$route.meta.title}}</h4></div>
    </div>
    <el-row v-loading="dataloading">
       <div class="ContenFelx">
         <el-col :span="18" class="step">
           <el-steps :active="datainfo.setstatus"  align-center>
             <el-step title="添加任务" :class="{inine:datainfo.status>=2 && datainfo.status!=8}" :description="datainfo.taskTime"></el-step>
             <el-step title="任务接收"  :class="{inine:datainfo.status>=3 && datainfo.status!=8}" :description="datainfo.acceptTaskTime"></el-step>
             <el-step title="仓单注册" :class="{inine:datainfo.status>=4 && datainfo.status!=8}" :description="datainfo.orderCrttime"></el-step>
             <el-step title="出库" :class="{inine:datainfo.status>=5 && datainfo.status!=8}" :description="datainfo.outOutStartTime"></el-step>
             <el-step title="物流运输" :class="{inine:datainfo.status>=6 && datainfo.status!=8}" :description="datainfo.outOutStartTime"></el-step>
             <el-step title="入库" :class="{inine:datainfo.status>=7 && datainfo.status!=8}" :description="datainfo.outInEndTime"></el-step>
             <el-step title="任务完成" :description="datainfo.finishTaskTime"></el-step>
           </el-steps>
         </el-col>
         <el-col :span="5" class="StepStatus">
           <div class="StatusCircle" v-if="datainfo.status>=2 && datainfo.status<=7">
             <el-progress type="circle" :percentage="(datainfo.status/7)*100" :show-text="false"></el-progress>
             <span class="statusText">{{datainfo.status | filtersStatus}}</span>
           </div>
           <div class="StatusCircle" v-if="datainfo.status==1">
             <el-progress type="circle" :percentage="0" :show-text="false"></el-progress>
             <span class="statusText">{{datainfo.status | filtersStatus}}</span>
           </div>
           <div class="StatusCircle" v-if="datainfo.status==8">
             <el-progress type="circle" :percentage="100" status="warning" :show-text="false"></el-progress>
             <span class="statusText WarnText">{{datainfo.status | filtersStatus}}</span>
           </div>
           <p class="StatusCentent" :class="[datainfo.status!=8?'StatusCirclePrimitText':'']">{{datainfo.taskTime}}</p>
         </el-col>
       </div>
       <div class="detailsTitle">
         <div class="detailsTitle-item">
           <div class="title"><i class="el-icon-document"></i><span>本次出库信息</span></div>
           <div><i class="el-icon-tickets"></i><span>出库单号：{{datainfo.orderOutnum || '--'}}</span></div>
           <div><i class="el-icon-user-solid"></i><span>经办人：{{datainfo.operator || '--'}}</span></div>
           <div><i class="el-icon-mobile"></i><span>经办人身份证号：{{datainfo.operatorCardid || '--'}}</span></div>
         </div>
         <div class="line"></div>
         <div class="detailsTitle-item">
           <div><svg-icon icon-class="ClassGran"></svg-icon><span>品类：{{datainfo.grainName || '--'}}</span></div>
           <div><svg-icon icon-class="ClassGran"></svg-icon><span>品种：{{datainfo.grainVarietyName || '--'}}</span></div>
           <div><i class="el-icon-medal"></i><span>等级：{{datainfo.orderGbgrade || '--'}}</span></div>
           <div><i class="el-icon-location"></i><span>产地：{{datainfo.orderCountry || '--'}}</span></div>
         </div>
         <div class="line"></div>
         <div class="detailsTitle-item">
           <div><i class="el-icon-paperclip"></i><span>本次提货数量：{{datainfo.orderNumber || '--'}}吨</span></div>
           <div><svg-icon icon-class="Money"></svg-icon><span>本次金额：{{datainfo.orderTargetprice || '--'}}元</span></div>
           <div><svg-icon icon-class="Money"></svg-icon><span>买入单价：{{datainfo.orderBugprice || '--'}}元/吨</span></div>
         </div>
         <div class="line"></div>
         <div class="detailsTitle-item">
           <div><i class="el-icon-user-solid"></i><span>执行营业部：{{datainfo.departName || '--'}}</span></div>
           <div><i class="el-icon-user-solid"></i><span>执行经纪人：{{datainfo.userAgentNames || '--'}}</span></div>
           <div><i class="el-icon-user-solid"></i><span>转发营业部：{{datainfo.departNames || '--'}}</span></div>
           <div><i class="el-icon-office-building"></i><span>任务内容：{{datainfo.taskContent || '--'}}</span></div>
         </div>
         <div v-if="$route.path != '/Salestask/forwardlist/forwardinfo/taskinfo'" class="detailsTitle-item" style="align-items: center; display: flex;">
           <el-button type="danger" v-if="permissions==1 && datainfo.status==1" :loading="cancelloading" size="mini" @click="cancelTask(datainfo.taskId)">取消任务</el-button>
           <el-button type="warning" v-if="permissions==2 && datainfo.status==1" size="mini" @click="ResaveTask(1,datainfo.taskId)">接收任务</el-button>
           <el-button type="success" v-if="datainfo.status==7" size="mini" :loading="Downloadloading" @click="DownloadFile(datainfo.orderOutnum)">下载</el-button>
           <el-button type="warning" :loading="ComfirmLoading" @click="ComfirmFinsh(datainfo.taskId,datainfo.status)" v-if="permissions==2 && datainfo.status>1 && datainfo.status<7" size="mini">确认完成</el-button>
         </div>
       </div>
       <p class="InfoTitle">流向流量追踪信息</p>
       <div class="content">
         <el-col :span="24" class="search">
          <el-form :inline="true" :model="SearchData" ref="SearchData" class="demo-form-inline">
             <el-form-item label="车牌号" prop="catNum">
               <el-input v-model="SearchData.catNum" placeholder="请输入车牌号" clearable></el-input>
             </el-form-item>
             <el-form-item>
               <el-button type="primary" @click="GetList()">查询</el-button>
               <el-button type="primary" plain @click="reastData()">重置</el-button>
             </el-form-item>
           </el-form>
         </el-col>
         <el-col :span="24" class="list">
           <el-table :data="tableData" width="100%" :header-cell-style="{background:'#EBECED'}">
             <el-table-column type="index" label="编号" align="center"></el-table-column>
             <el-table-column show-overflow-tooltip label="司机姓名" align="center"><template slot-scope="{row}">{{ row.carName || '--' }}</template></el-table-column>
             <el-table-column show-overflow-tooltip label="车牌号" align="center"><template slot-scope="{row}">{{ row.carLicense || '--' }}</template></el-table-column>
             <el-table-column show-overflow-tooltip label="运输起点" align="center"><template slot-scope="{row}">{{ row.depotAddress || '--' }}</template></el-table-column>
             <el-table-column show-overflow-tooltip label="运输终点" align="center"><template slot-scope="{row}">{{ row.outAddress || '--' }}</template></el-table-column>
             <el-table-column show-overflow-tooltip label="实际运输量" align="center"><template slot-scope="{row}">{{ row.carOutnetStr || '--' }}</template></el-table-column>
             <el-table-column show-overflow-tooltip label="实际发车时间" align="center"><template slot-scope="{row}">{{ row.carOutdate || '--' }}</template></el-table-column>
             <el-table-column show-overflow-tooltip label="实际到达时间" align="center"><template slot-scope="{row}">{{ row.carIndate || '--' }}</template></el-table-column>
             <el-table-column show-overflow-tooltip label="实际用时" align="center"><template slot-scope="{row}">{{ row.routeDate || '--' }}</template></el-table-column>
           </el-table>
         </el-col>
         <el-col :span="24" class="page">
           <span class="FloatLeft TextColorGlay">共{{totalRecords}}条</span><el-pagination @current-change="handleCurrentChange"  :page-size="SearchData.pageSize" background layout="prev, pager, next,jumper" :total="totalRecords"> </el-pagination>
         </el-col>
       </div>
     </el-row>

     <!-- 接收任务弹框 -->
     <el-dialog class="dialog" title="分配任务" :visible.sync="TaskdialogFormVisible" width="700px" :close-on-click-modal="false">
       <div class="headerStep">
         <el-steps :active="active" simple finish-status="success">
          <el-step title="1.接收任务"></el-step>
          <el-step title="2.分配执行经纪人"></el-step>
          <el-step title="3.任务转发"></el-step>
          <el-step title="4.确认信息"></el-step>
        </el-steps>
       </div>
       <div class="step_One" v-show="active==2">
         <div class="title"><h3>分配执行经纪人</h3></div>
         <div class="Backgroundcolor ">
           <el-form :model="brokerFrom" class="demo-ruleForm" :rules="rulesbrokerFrom" ref="brokerFrom" label-width="100px" >
             <el-form-item label="主要经纪人" prop="agentId">
               <el-select v-model="brokerFrom.agentId" @change="GetFilerAgentlist">
                 <el-option v-for="(item,index) in AgentOption" :label="item.agentName" :value="item.agentId" :key="index"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="辅助经纪人" prop="auxiliaryAgentId" style="margin-bottom: 0;">
               <el-button type="primary" plain size="small" @click="addauxiliaryAgentList()">添加辅助经纪人</el-button>
               <div class="brokerFromItem">
                 <el-tag v-for="(item,index) in auxiliaryAgentList" :key="index" closable type="info" @close="CloseAgent(item.agentId)">
                    {{item.agentName}}
                  </el-tag>
               </div>
             </el-form-item>
           </el-form>
         </div>
         <div class="TextCenter MarginTop">
           <el-button type="primary" @click="ResaveTask(2)">下一步</el-button>
         </div>
       </div>
       <div class="step_Two" v-show="active==3">
         <div class="title Flex"><h3>任务转发<span class="">（可不选）</span></h3><p class="tiips"><i class="el-icon-warning"></i>自身营业部辖区内任务无需转发</p></div>
         <div class="Backgroundcolor">
           <el-form class="demo-ruleForm" label-width="100px" >
             <el-form-item label="转发到营业部" prop="auxiliaryAgentId" style="margin-bottom: 0;">
               <el-button type="primary" plain size="small" @click="adddepartList()">添加转发到营业部</el-button>
               <div class="brokerFromItem">
                 <el-tag v-for="(item,index) in departList" :key="index" closable type="info" @close="CloseDepart(item.userId)">
                    {{item.userName}}
                  </el-tag>
               </div>
             </el-form-item>
           </el-form>
         </div>
         <div class="TextCenter MarginTop">
           <el-button type="primary" plain @click="active=2">上一步</el-button>
           <el-button type="primary" @click="ResaveTask(3)">下一步</el-button>
         </div>
       </div>
       <div class="step_Three" v-show="active==4">
         <div class="title"><h3>确认信息</h3></div>
         <div class="Backgroundcolor">
           <p class="text">出库执行营业部：{{datainfo.departName}}</p>
           <p class="text">执行经纪人：
            <span>{{auxiliaryAgentName}}</span><span v-if="auxiliaryAgentList.length>0">、</span>
             <span v-for="(item,index) in auxiliaryAgentList" :key="index" v-if="auxiliaryAgentList.length-1!=index">{{item.agentName}}、</span>
             <span v-else>{{item.agentName}}</span>
           </p>
           <p class="text">转发到营业部：
             <span v-for="(item,index) in departList" :key="index" v-if="departList.length-1!=index">{{item.userName}}、</span>
             <span v-else>{{item.userName}}</span>
           </p>
         </div>
         <div class="TextCenter MarginTop">
           <el-button type="primary" plain @click="active=3">上一步</el-button>
           <el-button type="primary" @click="ConfirmTask()" :loading="ConfirmTaskloading" class="windth84">确认</el-button>
         </div>
       </div>
     </el-dialog>
     <!-- 选择辅助经纪人 -->
     <el-dialog class="dialog" title="选择辅助经纪人" :visible.sync="auxiliaryAgentOptionFormVisible" :destroy-on-close="true" width="700px" :close-on-click-modal="false">
       <div class="list">
         <el-table :data="auxiliaryAgentOption"  @selection-change="handleSelectionChange" ref="handleSelectionChange" max-height="400" width="100%" :header-cell-style="{background:'#EBECED'}">
           <el-table-column type="selection"  width="55"></el-table-column>
           <el-table-column type="index" label="编号" align="center"></el-table-column>
           <el-table-column label="经纪人姓名" align="center"><template slot-scope="{row}">{{ row.agentName || '--' }}</template></el-table-column>
           <el-table-column label="联系方式" align="center"><template slot-scope="{row}">{{ row.agentPhone || '--' }}</template></el-table-column>
         </el-table>
         <div class="TextCenter MarginTop"><el-button type="primary" @click="comfirmAgentOption()">确 定</el-button></div>
       </div>
     </el-dialog>
     <!-- 选择营业部 -->
     <el-dialog class="dialog" title="选择转发营业部" :visible.sync="departListFormVisible" :destroy-on-close="true" width="700px" :close-on-click-modal="false">
       <div class="list">
         <el-table :data="departListOption" @selection-change="DeparthandleSelectionChange" ref="DeparthandleSelectionChange" width="100%" max-height="400" :header-cell-style="{background:'#EBECED'}">
           <el-table-column type="selection" width="55"></el-table-column>
           <el-table-column type="index" label="编号" align="center"></el-table-column>
           <el-table-column label="营业部名称" align="center"><template slot-scope="{row}">{{ row.userName || '--' }}</template></el-table-column>
         </el-table>
         <div class="TextCenter MarginTop"><el-button type="primary" @click="ConfirmDepartListForm()">确 认</el-button></div>
       </div>
     </el-dialog>
  </div>
</template>

<script>
  import AdminApi from '@/api/AdminApi.js'
  import { mapGetters,mapActions } from 'vuex'
  export default{
    data(){
      return{
        TaskdialogFormVisible:false,
        departListFormVisible:false,
        auxiliaryAgentOptionFormVisible:false,
        ConfirmTaskloading:false,
        dataloading:false,
        cancelloading:false,
        Downloadloading:false,
        ComfirmLoading:false,
        tableData:[],
        datainfo:{},
        totalRecords:0,
        SearchData:{
          pageSize:6,
          orderOutnum:'',
          catNum:'',
          currentPage:1,
        },
        rulesbrokerFrom:{
          agentId:[
            {required:true,message:'请选择主要经纪人',trigger:'change'}
          ]
        },
        brokerFrom:{
          agentId:'',
          auxiliaryAgentId:'',
          forwardUserId:'',
          taskId:'',
        },
        active:1,
        auxiliaryAgentName:'',
        auxiliaryAgentList:[],
        auxiliaryAgentListSet:[],
        auxiliaryAgentOption:[],
        departListOption:[],
        departList:[],
        departListset:[],
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'AgentOption',
        'DepartOption'
      ])
    },
    filters:{
      filtersStatus: function(value) {
        if(!value) return '--'
        let StatusArr = {1:'待接收', 2:'进行中',  3:'进行中', 4:'进行中', 5:'进行中', 6:'进行中', 7:'已完成', 8:'已取消'}
        return StatusArr[value]
      }
    },
    methods:{
      ...mapActions([
        'GetAgentOption',
        'GetDepartOption'
      ]),
      GetInfo:function(){
        this.dataloading = true
        let  taskId =  this.$route.query.taskId
        let Params = {'taskId':taskId}
        AdminApi.getTaskOrder(Params).then(data=>{
          this.dataloading = false
          let {message,statusCode} = data
          if(statusCode == 0){
            this.datainfo = message
            this.GetList(message.orderOutnum)
            if(message.status==8){
              this.datainfo.setstatus = 1
            }else{
              this.datainfo.setstatus = message.status
            }
            this.percentage = (this.datainfo.status/7)*100
          }
        })
      },
      GetList:function(orderOutnum){
        if(orderOutnum){
          this.SearchData.orderOutnum = orderOutnum
        }else{
          this.SearchData.orderOutnum = this.datainfo.orderOutnum
        }
        let Params = this.SearchData
        AdminApi.getOutCarList(Params).then(data=>{
          let {message,statusCode} = data
          if(statusCode == 0){
            this.tableData = message.cars
            this.totalRecords = message.totalRecords
          }
        })
      },
      reastData:function(){
        this.$refs['SearchData'].resetFields()
        this.GetList(this.datainfo.orderOutnum)
      },
      handleCurrentChange:function(val){
        this.SearchData.currentPage = val
        this.GetList(this.datainfo.orderOutnum)
      },
      ComfirmFinsh:function(taskId,status){
        this.$confirm('确认完成后任务数据将自动提交', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
           if(status==6){
             this.ComfirmLoading = true
             let Params = {'taskId':taskId}
             AdminApi.confirmCompletion(Params).then(data=>{
               this.ComfirmLoading = false
               let {message,statusCode} = data
               if(statusCode == 0){
                 this.$message.success(message);
                 this.GetInfo()
               }else{
                 this.$message.error(message);
               }
             })
           }else{
             this.$message.error('任务流程尚未完成，无法完成');
           }
        })
      },
      CloseAgent:function(agentId){
        let auxiliaryAgentList = this.auxiliaryAgentList.filter(item=>{
           if(item.agentId != agentId){
              return item
           }else{
             this.$refs.handleSelectionChange.toggleRowSelection(item,false);
           }
        })
        this.auxiliaryAgentList = auxiliaryAgentList
      },
      CloseDepart:function(departId){
        let departList = this.departList.filter(item=>{
           if(item.userId != departId){
              return item
           }else{
             this.$refs.DeparthandleSelectionChange.toggleRowSelection(item,false);
           }
        })
        this.departList = departList
      },
      ResaveTask:function(step,taskId=""){
        if(step==1){
          this.brokerFrom.taskId = taskId
          this.brokerFrom.agentId = ""
          this.TaskdialogFormVisible = true
          let auxiliaryAgentOption = Object.assign([],this.AgentOption)
          this.auxiliaryAgentOption = auxiliaryAgentOption
          let departList = this.DepartOption
          this.departListOption =  Object.assign([],departList)
          this.active = 2
        }
        if(step==2){
          this.$refs['brokerFrom'].validate((valid) => {
            if(valid){
              this.active = 3
            }
          })
        }
        if(step==3){
          let auxiliaryAgentName = this.AgentOption.find(Item=>{
            if(this.brokerFrom.agentId == Item.agentId){
               return Item
            }
          })
          this.auxiliaryAgentName = auxiliaryAgentName.agentName
          this.active = 4
        }
      },
       DownloadFile:function(orderOutnum=""){
        let Params = {}
        if(orderOutnum){
          Params = {'orderOutnum':orderOutnum}
        }else{
          Params = this.SearchData
        }
        this.Downloadloading = true
        AdminApi.downloadFile(Params).then(data=>{
            this.Downloadloading = false
            const blob = new Blob([data]);
            let myDate = new Date();
            let timename = myDate.toLocaleDateString().split('/').join('-');
            const fileName = '数据结果'+timename+'.xlsx';
            const linkNode = document.createElement('a');
            linkNode.download = fileName; //a标签的download属性规定下载文件的名称
            linkNode.style.display = 'none';
            linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
            document.body.appendChild(linkNode);
            linkNode.click();  //模拟在按钮上的一次鼠标单击
            URL.revokeObjectURL(linkNode.href); // 释放URL 对象
            document.body.removeChild(linkNode);
        })
      },
      cancelTask:function(taskId){
        this.$confirm('确认后该任务将会关闭', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.cancelloading = true
            let Params = {'taskId':taskId}
            AdminApi.cancelTaskOrder(Params).then(data=>{
              this.cancelloading = false
              let {message,statusCode} = data
              if(statusCode == 0){
                this.$message.success(message);
                this.GetInfo()
              }else{
                this.$message.error(message);
              }
            })
        }).catch(() => {
          this.$message.error('已取消删除');
        });
      },
      ConfirmTask:function(){
        if(!this.brokerFrom.agentId || this.brokerFrom.agentId==""){
          this.$message.error('请返回上一步，选择主要经纪人');
          return false
        }
        let depart = []
        this.departList.map(item=>{
          depart.push(item.userId)
        })
        let Agent = []
        this.auxiliaryAgentList.map(item=>{
          Agent.push(item.agentId)
        })
        this.brokerFrom.auxiliaryAgentId = Agent.join(",")
        this.brokerFrom.forwardUserId = depart.join(',')
        this.ConfirmTaskloading = true
        let Params = this.brokerFrom
        AdminApi.addDepartTaskOrder(Params).then(data=>{
          this.ConfirmTaskloading = false
          let {message,statusCode} = data
          if(statusCode == 0){
            this.GetInfo()
            this.$message.success(message);
            this.TaskdialogFormVisible = false
          }else{
            this.$message.error(message);
          }
        })
      },
      GetFilerAgentlist:function(e){
        let auxiliaryAgentList = []
        this.AgentOption.map(Item=>{
          if(Item.agentId != e){
            auxiliaryAgentList.push(Item)
          }
        })
        this.auxiliaryAgentOption = auxiliaryAgentList
      },
      // 选择辅助经纪人
      handleSelectionChange:function(val){
        this.auxiliaryAgentListSet = val
      },
      // 确认选择辅助经纪人
      comfirmAgentOption:function(){
        this.auxiliaryAgentOptionFormVisible = false
        this.auxiliaryAgentList = this.auxiliaryAgentListSet;
      },
      // 点击添加辅助经纪人
      addauxiliaryAgentList:function(){
        this.auxiliaryAgentListSet = []
        this.auxiliaryAgentList.map(item=>{
          this.$refs.handleSelectionChange.toggleRowSelection(item,true);
        })
        this.auxiliaryAgentOptionFormVisible = true
      },
      //选择营业部
      DeparthandleSelectionChange:function(val){
        this.departListset = val
      },
      //确认选择营业部
      ConfirmDepartListForm:function(){
        this.departListFormVisible = false
        this.departList = this.departListset;
      },
      //添加营业部
      adddepartList:function(){
        this.departListset = []
        this.departList.map(item=>{
          this.$refs.DeparthandleSelectionChange.toggleRowSelection(item,true);
        })
        this.departListFormVisible = true
      }
    },
    mounted() {
      if(this.permissions == 2){
        this.GetAgentOption()
        this.GetDepartOption(this.permissions)
      }
      this.GetInfo()
    }
  }
</script>

<style scoped>
  .StatusCirclePrimit{border-color: #def0f9;color: #1492D3;}
  .StatusCirclePrimitText{color: #1492D3;}
  .title h3{color: #333333;padding-left: 1.25rem;}
  .title h3 span{color: #999999;}
  .title .tiips{color: #999999;line-height: 3.4375rem;}
  .detailsTitle{width: 97%;background: #FFFFFF;display: flex;margin: 1.25rem auto;flex-direction: row;flex-wrap: nowrap; padding: 0.9375rem;border-radius: 0.625rem;}
  .detailsTitle .detailsTitle-item{color: #333333;line-height: 1.875rem;font-size: 0.875rem;padding: 0 1.25rem;}
  .detailsTitle .detailsTitle-item .title{font-size:1.125rem;color: #1492D3;}
  .detailsTitle .detailsTitle-item span{padding-left: 0.5rem;}
  .detailsTitle .line{height: auto;width: 1px;background: #999999;margin: 0 0.625rem;}
  .InfoTitle{color: #333333;margin-left: 0.625rem;font-size: 1rem;}
  .title h3{color: #333333;padding-left: 1.25rem;}
  .brokerFromItem {width: 20rem;border: 1px solid #D7D7D7;padding: 0.125rem 0.3125rem 0.125rem 1.25rem;background: #FFFFFF;display: flex;justify-content: end; flex-flow: wrap;min-height: 80px;}
  .Backgroundcolor{background: #F6F6F6;padding: 1.25rem;}
  .el-tag.el-tag--info{border: 0rem;margin:0.625rem 1.25rem 0.625rem 0;}
  .title h3 span{color: #999999;}
  .title .tiips{color: #999999;line-height: 3.4375rem;}
  .Backgroundcolor .text{font-size: 1rem;color: #333333;line-height: 1.875rem;}
  .windth84{width: 5.25rem;}
</style>
