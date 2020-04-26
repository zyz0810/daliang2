<template>
  <div>
    <div class="Flex breadcrumbDiv MarginTop">
      <div><h4 class="TextColorGlay">{{$route.meta.title}}</h4></div>
    </div>
    <!-- 图表 -->
    <div class="EchartContent Flex">
      <div class="EchartPie">
        <div class="DataItem">
          <p class="title">数据信息自2020年2月10日起</p>
          <div class="Flex MarginTop30">
            <div class="DataItem-item">
              <div class="icon"><span class="iconitem"><svg-icon icon-class="MoneyPock"></svg-icon></span></div>
              <div class="dataShow">
                <p>总交易金额（元）</p>
                <h4><countTo :startVal='startVal' :endVal='totalTransactionAmoun' :duration='3000'></countTo></h4>
              </div>
            </div>
            <div class="DataItem-item">
              <div class="icon"><span class="iconitem blurcolor"><svg-icon icon-class="dataMoneyPock"></svg-icon></span></div>
              <div class="dataShow">
                <p>总交易数量（吨）</p>
                <h4><countTo :startVal='startVal' :endVal='totalWeight' :duration='3000'></countTo></h4>
              </div>
            </div>
          </div>
        </div>
        <div class="EchartPieitem Flex">
          <div class="EchartPieitem-item-pie">
            <div id="myechart" style="height: 180px;" ref="myEchart">
            </div>
          </div>
          <div class="EchartPieitem-item">
            <div v-for="(item,index) in tradingVolumeListOption"><span :style="{'background': echartColor[item.color*1-1]}"></span>{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="EchartBar">
        <div class="SearchData">
          <div class="ChoseOption-item">
            <el-select v-model="GetData.ChoseType" @change="ChangeNumberChose()">
              <el-option value="1" label="交易量"></el-option>
              <el-option value="2" label="交易金额"></el-option>
              <el-option value="3" label="交易均价"></el-option>
            </el-select>
            <span>单位：{{nuit}}</span>
          </div>
          <div class="rightFlex">
            <div class="ChoseOption-item tagItem">
              <span @click="ChoseYser('all')" :class="{isActive:GetData.type=='all'}">全部</span>
              <span @click="ChoseYser('1')" :class="{isActive:GetData.type=='1'}">本年</span>
              <span @click="ChoseYser('2')" :class="{isActive:GetData.type=='2'}">本月</span>
            </div>
            <div class="ChoseOption-item dataChose" style="width: 300px;">
              <el-date-picker style="width: 130px" v-model="GetData.startTime" @change="ChangeData" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"> </el-date-picker>
              <span class="zhi">至</span>
              <el-date-picker style="width: 130px" v-model="GetData.endTime" @change="ChangeData" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"> </el-date-picker>
            </div>
            <div class="ChoseOption-item button">
              <el-button type="primary" size="mini" @click="getTreeDiagramEchart()">查询</el-button>
            </div>
          </div>
        </div>
        <div class="ShowPinzhong">
          <span @click="ChoseShow(item.name,item.tab)"  v-for="(item,index) in ChoseOptionList" :style="{'background': echartColor[item.color*1-1]}" :key="index" :class="{isactive:item.tab!=0}">{{item.name}}</span>
        </div>
        <div id="EchartBarData" ref="myBarEchart" style="width: 100%;height: 300px;overflow: hidden;"></div>
      </div>
    </div>
    <!-- 图表 -->
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
          <el-form-item prop="departId" label="执行营业部" v-if="permissions==1">
            <el-select v-model="SearchData.departId">
              <el-option label="请选择" value=""></el-option>
              <el-option v-for="(item,index) in SalesOption" :label="item.departName" :key="item.departId" :value="item.departId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="departId" label="任务单位" v-if="permissions==2">
            <el-select v-model="SearchData.departId">
              <el-option label="请选择" value=""></el-option>
              <el-option v-for="(item,index) in ComUserOption" :label="item.userName" :key="item.userId" :value="item.userId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出库单号" prop="orderOutnum">
            <el-input v-model="SearchData.orderOutnum" placeholder="请输入出库单号" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="GetList()">查询</el-button>
            <el-button type="primary" plain @click="reastData()">重置</el-button>
            <el-button type="danger" plain @click="DownloadFile()"><i class="el-icon-edit-outline"></i>全部导出</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" class="list">
        <el-table :data="tableData" width="100%" v-loading="dataloading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading" :header-cell-style="{background:'#EBECED'}">
          <el-table-column type="index" label="编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="出库单号" align="center"><template slot-scope="{row}">{{ row.orderOutnum || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="品类" align="center"><template slot-scope="{row}">{{ row.grainName || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="品种" align="center"><template slot-scope="{row}">{{ row.grainVarietyName || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="等级" align="center"><template slot-scope="{row}">{{ row.orderGbgrade || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="价格(元/吨)" align="center"><template slot-scope="{row}">{{ row.orderBugprice || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="数量(吨)" align="center"><template slot-scope="{row}">{{ row.orderNumber || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="买方交易商" align="center"><template slot-scope="{row}">{{ row.buyUserName || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="卖方交易商" align="center"><template slot-scope="{row}">{{ row.sellUserName || '--' }}</template></el-table-column>
          <el-table-column show-overflow-tooltip label="承储库" align="center"><template slot-scope="{row}">{{ row.depotName || '--' }}</template></el-table-column>
          <el-table-column v-if="permissions==1" show-overflow-tooltip label="执行营业部" align="center"><template slot-scope="{row}">{{ row.departName || '--' }}</template></el-table-column>
          <el-table-column v-if="permissions==2" show-overflow-tooltip label="任务单位" align="center"><template slot-scope="{row}">{{ row.userName || '--' }}</template></el-table-column>          <el-table-column show-overflow-tooltip label="状态" align="center">
            <template slot-scope="{row}"><span class='FilshText'>已完成</span></template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="任务时间" align="center"><template slot-scope="{row}">{{ row.taskTime || '--' }}</template></el-table-column>
          <el-table-column label="操作" align="center" width="150px">
            <template slot-scope="{row}" >
              <el-button type="primary" size="mini" @click="GetInfo(row.taskId)">查看</el-button>
              <el-button type="danger" size="mini" @click="DownloadFile(row.orderOutnum)">下载</el-button>
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
  import echarts from "echarts";
  import countTo from 'vue-count-to'
  import AdminApi from '@/api/AdminApi.js'
  import { mapGetters , mapActions} from 'vuex'
  export default{
    components: { countTo },
    data(){
      return{
        startVal:0,
        SearchData:{
          grainId:'',
          grainVariety:'',
          orderGbgrade:'',
          status:7,
          departId:'',
          orderOutnum:'',
          currentPage:1,
          pageSize:6
        },
        GetData:{
          ChoseType:'1',
          startTime:'',
          endTime:'',
          type:'all'
        },
        nuit:'吨',
        tradingVolumeListOption:[],
        ChoseOptionList:[],
        dataloading:false,
        tableData:[],
        totalRecords:0,
        totalTransactionAmoun:0,
        totalWeight:0,
        echartColor:['#5FDAC0', '#F25859', '#F8B652', '#2DB8EF', '#7F85E4', '#D1CED1'],
        colorLeft:[{
          type: 'linear',
          x: 0, x2: 1, y: 0, y2: 0,
          colorStops: [{
            offset: 0,
            color: '#A1ECDA'
          }, {
            offset: 0.5,
            color: '#A1ECDA'
          }, {
            offset: 0.5,
            color: '#73DAC1'
          }, {
            offset: 1,
            color: '#73DAC1'
          }]
        },{
          type: 'linear',
          x: 0, x2: 1, y: 0, y2: 0,
          colorStops: [{
            offset: 0,
            color: '#F6A8A8'
          }, {
            offset: 0.5,
            color: '#F6A8A8'
          }, {
            offset: 0.5,
            color: '#F16868'
          }, {
            offset: 1,
            color: '#F16868'
          }]
        },{
          type: 'linear',
          x: 0, x2: 1, y: 0, y2: 0,
          colorStops: [{
            offset: 0,
            color: '#F3D4A7'
          }, {
            offset: 0.5,
            color: '#F3D4A7'
          }, {
            offset: 0.5,
            color: '#F1B966'
          }, {
            offset: 1,
            color: '#F1B966'
          }]
        },{
          type: 'linear',
          x: 0, x2: 1, y: 0, y2: 0,
          colorStops: [{
            offset: 0,
            color: '#A0DDF3'
          }, {
            offset: 0.5,
            color: '#A0DDF3'
          }, {
            offset: 0.5,
            color: '#48C1ED'
          }, {
            offset: 1,
            color: '#48C1ED'
          }]
        },{
          type: 'linear',
          x: 0, x2: 1, y: 0, y2: 0,
          colorStops: [{
            offset: 0,
            color: '#D7D8F9'
          }, {
            offset: 0.5,
            color: '#D7D8F9'
          }, {
            offset: 0.5,
            color: '#9A9CE3'
          }, {
            offset: 1,
            color: '#9A9CE3'
          }]
        },{
          type: 'linear',
          x: 0, x2: 1, y: 0, y2: 0,
          colorStops: [{
            offset: 0,
            color: '#E9E9E9'
          }, {
            offset: 0.5,
            color: '#E9E9E9'
          }, {
            offset: 0.5,
            color: '#D8D8D8'
          }, {
            offset: 1,
            color: '#D8D8D8'
          }]
        }],
        colorRight:['#73D9C0', '#F4696C', '#EEBA67', '#4AC0EC', '#999CE2', '#DAD7DB']

      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'GrainOption',
        'SalesOption',
        'GradeOption',
        'VarietyOption',
        'ComUserOption'
      ])
    },
    methods:{
      ...mapActions([
        'GetGrainOption',
        'GetSalesOption',
        'GetVatietyOption',
        'GetComUserOption',
        ]),
      GetList:function(){
        this.dataloading = true
        let Params = this.SearchData
        AdminApi.getTaskOrderList(Params).then(data=>{
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
      DownloadFile:function(orderOutnum=""){
        let Params = {}
        if(orderOutnum){
          Params = {'orderOutnum':orderOutnum}
        }else{
          Params = this.SearchData
        }
        AdminApi.downloadFile(Params).then(data=>{
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
            this.GetList()
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
      GetInfo:function(taskId){
        if(this.permissions == 1){
          this.$router.push({path:'/task/datalist/datainfo',query:{taskId:taskId}})
        }
        if(this.permissions == 2){
          this.$router.push({path:'/Salestask/datalist/datainfo',query:{taskId:taskId}})
        }
      },
      handleCurrentChange:function(val){
        this.SearchData.currentPage = val
        this.GetList()
      },
      getAllTaskResultDataNumber:function(){
        AdminApi.getAllTaskResultByUserId().then(data=>{
          let {message,statusCode} = data
          if(statusCode == 0){
            this.totalTransactionAmoun = message.totalTransactionAmoun
            this.totalWeight = message.totalWeight
          }else{
            this.$message.error(message);
          }
        })
      },
      ChoseYser:function(type){
        this.GetData.startTime = ""
        this.GetData.endTime = ""
        this.GetData.type = type
      },
      ChangeData:function(){
        this.GetData.type = ""
      },
      getPieEchart:function(EchartColor,Piedata){
              let myChart = echarts.init(this.$refs.myEchart);
              window.onresize = myChart.resize;
              this.charts = echarts.init(document.getElementById('myechart'))
              this.charts.clear();
              this.charts.setOption({
                      color:EchartColor,
                      tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c}吨({d}%)'
                        },
                      title:{
                        text:"品类占比",
                        left:"center",
                        top:"50%",
                        textStyle:{
                            color:"#333333",
                            fontSize:14,
                            align:"center"
                        }
                      },
                      graphic:{
                        type:"text",
                        left:"center",
                        top:"40%",
                        style:{
                            text:"总交易",
                            textAlign:"center",
                            color:"#333333",
                            fontSize:16,
                            fontWeight:700
                        }
                      },
                      series: [
                        {
                            type: 'pie',
                            radius: ['55%', '80%'],
                            label: {
                                show: false,
                                position: 'center'
                            },
                            data: Piedata
                        }
                    ]
              })
        },
        GetSectorEchart:function(){
          AdminApi.getTreeDiagramShanxing().then(data=>{
            let {message,statusCode} = data
            if(statusCode == 0){
              if(message.tradingVolumeList){
                let echartColorlist = []
                if(message.tradingVolumeList){
                  message.tradingVolumeList.map(item=>{
                    echartColorlist.push(this.echartColor[item.color*1-1])
                  })
                }
                this.getPieEchart(echartColorlist,message.tradingVolumeList)
                this.tradingVolumeListOption = message.tradingVolumeList
              }
            }else{
              this.$message.error(message);
            }
          })
        },
        ChangeNumberChose:function(){
          if(this.GetData.ChoseType==1){
            this.nuit = '吨'
          }else if(this.GetData.ChoseType==2){
            this.nuit = '万元'
          }else{
            this.nuit = '元/吨'
          }
          this.getTreeDiagramEchart()
        },
        getBarEchart:function(BarData,XData,colorLeft,colorTop,colorRight){
          let myBarEchart = echarts.init(this.$refs.myBarEchart);
          window.onresize = myBarEchart.resize;
          this.charts = echarts.init(document.getElementById('EchartBarData'))
          this.charts.clear();
          this.charts.setOption({
            xAxis: {
                type: 'category',
                splitLine:{
                  show:false //网格线
                },
                axisTick: {
                  show: false //刻度线
                },
                data: XData
            },
            grid: {
               top: '8%',
               bottom:'25%'
            },
            yAxis: {
               type: 'value',
               splitLine:{
                 show:false //网格线
               },
            },
            series: [
                {
                  z:1,
                  type: 'bar',
                  barWidth:30,
                  itemStyle:{
                    normal: {
                      color:function(params) {
                        return colorLeft[params.dataIndex]
                      },
                    }
                  },
                  data:BarData,
                },
                {
                  z:2,
                  type: 'pictorialBar',
                  symbol :'diamond',
                  symbolOffset:[0,'50%'],
                  symbolSize:[30,10],
                  itemStyle:{
                    normal:{
                      color:function(params) {
                        return colorLeft[params.dataIndex]
                      },
                      label: {
                          show: true,
                          position: 'top',
                          formatter: '{c}',
                      },
                    }
                  },
                  data:BarData,
                },
                {
                  type: 'pictorialBar',
                  itemStyle: {
                    normal: {
                      color: function(params) {
                        return colorRight[params.dataIndex]
                      },
                    },

                  },
                  symbol: 'diamond',
                  symbolOffset:[0,'-50%'],
                  symbolSize:[30 - 4,10 * (30 - 4) / 30],
                  symbolPosition: 'end',
                  z:3,
                  data:BarData,
                }
            ]
          })
        },
        getTreeDiagramEchart:function(){
          let Params = this.GetData
          AdminApi.getTreeDiagram(Params).then(data=>{
            let {message,statusCode} = data
            if(statusCode == 0){
              let tradingMaxList = []
              let tradingMinList = []
              let tradingVolumeList = []
              let tradingAveList = []
              let tradingVolumeListXData = []
              let tradingAveListXdata = []
              let tradingTotalList = []
              let tradingTotalListXdata = []
              let colorTop = []
              let colorLeft = []
              let colorRight = []
              if(message.tradingVolumeList){
                message.tradingVolumeList.map(item=>{
                  if(item.tab == 0){
                    tradingVolumeListXData.push(item.name)
                    tradingVolumeList.push(item.value)
                    colorTop.push(this.echartColor[item.color*1-1])
                    colorLeft.push(this.colorLeft[item.color*1-1])
                    colorRight.push(this.colorRight[item.color*1-1])
                  }
                })
              }
              if(message.tradingMaxList){
                message.tradingMaxList.map(item=>{
                  if(item.tab == 0){
                    tradingMaxList.push(item.value)
                  }
                })
              }
              if(message.tradingMinList){
                message.tradingMinList.map(item=>{
                  if(item.tab == 0){
                    tradingMinList.push(item.value)
                  }
                })
              }
              if(message.tradingAveList){
                message.tradingAveList.map(item=>{
                  if(item.tab == 0){
                    tradingAveListXdata.push(item.name)
                    tradingAveList.push(item.value)
                  }
                })
              }
              if(message.tradingTotalList){

                message.tradingTotalList.map(item=>{
                  if(item.tab == 0){
                    tradingTotalListXdata.push(item.name)
                    tradingTotalList.push(item.value)
                    colorTop.push(this.echartColor[item.color*1-1])
                    colorLeft.push(this.colorLeft[item.color*1-1])
                    colorRight.push(this.colorRight[item.color*1-1])
                  }
                })
              }
              if(this.GetData.ChoseType==3){
                this.ChoseOptionList = message.tradingAveList
                this.getLineEchart(tradingMaxList,tradingMinList,tradingAveList,tradingAveListXdata)
              }
              else if(this.GetData.ChoseType==2){
                this.ChoseOptionList = message.tradingTotalList
                this.getBarEchart(tradingTotalList,tradingTotalListXdata,colorLeft,colorTop,colorRight)
              }
              else{
                this.ChoseOptionList = message.tradingVolumeList
                this.getBarEchart(tradingVolumeList,tradingVolumeListXData,colorLeft,colorTop,colorRight)
              }
            }else{
              this.$message.error(message);
            }
          })
        },
        ChoseShow:function(name,bar){
          let Params = {'grainId':name,'type':bar==1?0:1,'typeName':this.GetData.ChoseType}
          AdminApi.getTreehide(Params).then(data=>{
            let {message,statusCode} = data
            if(statusCode == 0){
              this.getTreeDiagramEchart()
              this.$message.success(message);
            }else{
              this.$message.error(message);
            }
          })
        },
        getLineEchart:function(tradingMaxList,tradingMinList,tradingAveList,XData){
          let myBarEchart = echarts.init(this.$refs.myBarEchart);
          window.onresize = myBarEchart.resize;
          this.charts = echarts.init(document.getElementById('EchartBarData'))
          this.charts.clear();
          this.charts.setOption({
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                icon: 'circle',
                data: ['最高成交价', '平均成交价', '最低成交价'],
                right:100,
                orient:'vertical',
                itemWidth: 8,
                itemHeight: 8,
              },
              grid: {
                top: '8%',
                bottom:'25%'
              },
              xAxis:{
                type: 'category',
                splitLine:{
                  show:false //网格线
                },
                axisTick: {
                  show: false //刻度线
                },
                data: XData
              },
              yAxis: {
                type: 'value',
                splitLine:{
                  show:false //网格线
                },
              },
              series: [
                  {
                      name: '最高成交价',
                      type: 'line',
                      data: tradingMaxList,
                      itemStyle: {
                          borderWidth: 3,
                          borderColor: '#3ABDEE',
                          color: '#3ABDEE'
                      }
                  },
                  {
                      name: '平均成交价',
                      type: 'line',
                      data: tradingAveList,
                      itemStyle: {
                          borderWidth: 3,
                          borderColor: '#F45858',
                          color: '#F45858'
                      }
                  },
                  {
                      name: '最低成交价',
                      type: 'line',
                      data: tradingMinList,
                      itemStyle: {
                          borderWidth: 3,
                          borderColor: '#F7B759',
                          color: '#F7B759'
                      }
                  }
              ]
          })
        }
    },
    mounted() {
      if(this.permissions == 2){
        this.GetComUserOption()
      }
      this.GetGrainOption()
      this.GetSalesOption()
      this.GetList()
      this.getAllTaskResultDataNumber()
      this.GetSectorEchart()
      this.getTreeDiagramEchart()
    }
  }
</script>

<style scoped>
  .EchartContent{
    width: 97%;
    margin: 0 auto 1.25rem auto;
  }
  .EchartBar{width: 59%;height: 350px;}
  .EchartBar,.EchartPieitem,.DataItem{background: #FFFFFF;}
  .EchartPie{display: flex;flex-direction: column;justify-content: space-between;width: 40%;height: 350px;}
  .EchartPieitem{width: 100%;margin-top: 0.625rem;height: 12rem;}
  .DataItem{height: 180px;width: 100%;padding:15px;}
  .DataItem p{font-size: 14px;color: #999999;}
  .DataItem .DataItem-item{width: 50%;height: 3rem;display: flex;flex-direction: row;justify-content: flex-start;}
  .DataItem .DataItem-item .icon{width: 3.75rem;text-align: center;font-size: 1.5rem;line-height: 3rem;}
  .DataItem .DataItem-item .icon .iconitem{border-radius: 50%;background: #FFF6EE;padding: 0.625rem;}
  .DataItem .DataItem-item .icon .iconitem.blurcolor{background: #EAF3FF;}
  .DataItem .DataItem-item .dataShow h4{margin: 0;line-height: 2.5rem;color: #333333;font-size: 1.25rem;font-weight: initial;}
  .MarginTop30{margin-top: 1.875rem;}
  .DataItem .title{padding-left:0.3125rem;}
  .EchartPieitem-item{width: 35%;display: flex;flex-flow: row;justify-content: space-between;flex-wrap: wrap;margin-top: 1.875rem;}
  .EchartPieitem-item div{width: 50%;color: #333333;font-size: 0.875rem;}
  .EchartPieitem-item div span{background: #60DABC;border-radius: 50%;width: 5px;height: 5px;display: inline-block;margin-right: 10px;}
  .EchartPieitem-item-pie{width: 65%;height: 200px;}
  .SearchData{margin: 0.625rem 1.5625rem;overflow: hidden;display: flex;flex-flow: row;flex-wrap: wrap;justify-content: space-between;}
  .SearchData .tagItem{margin-right: 0.625rem;}
  .SearchData .tagItem span{color: #333333;font-size: 0.875rem;cursor: pointer;line-height: 36px;}
  .SearchData .tagItem span.isActive{background: #E8F4FF;color: #1492D3;padding: 2px 8px;border-radius: 14px;}
  .SearchData .rightFlex{display: flex;justify-content: flex-start;flex-wrap: nowrap;flex-flow: row;}
  .content{height: auto;}
  .ShowPinzhong {text-align: left;margin-left:1.5625rem;}
  .ShowPinzhong .isactive{background: #999999!important;}
  .ShowPinzhong span{background: #E8F4FF;color: #FFFFFF;padding: 0.1875rem 0.5rem;margin-right: 0.625rem;border-radius: 5px;cursor: pointer;}
</style>
