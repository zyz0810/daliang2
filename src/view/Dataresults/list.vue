<template>
  <div>
    <div class="Flex breadcrumbDiv MarginTop">
      <div><h4 class="TextColorGlay">{{$route.meta.title}}<span class="tips" v-if="Scrollingdata.dateString"><i class="el-icon-warning"></i>数据信息自{{Scrollingdata.dateString}}起</span></h4></div>
    </div>
    <!-- 上方 -->
    <div class="EchartContent">
      <div class="DataItem">
        <div class="DataItem-item">
          <div class="dataShow">
            <p>合同总金额 (元)</p>
            <h4><svg-icon icon-class="MoneyPock"></svg-icon><countTo :startVal='Scrollingdata.startVal' :endVal='Scrollingdata.contractamount' :duration='3000'></countTo></h4>
          </div>
        </div>
        <div class="DataItem-item">
          <div class="dataShow">
            <p>合同总交易数量（吨）</p>
            <h4><svg-icon icon-class="dataMoneyPock"></svg-icon><countTo :startVal='Scrollingdata.startVal' :endVal='Scrollingdata.contractquantity' :duration='3000'></countTo></h4>
          </div>
        </div>
      </div>
      <div class="DataItem">
        <div class="DataItem-item">
          <div class="dataShow">
            <p>任务总金额 (元)</p>
            <h4><svg-icon icon-class="MoneyPock"></svg-icon><countTo :startVal='Scrollingdata.startVal' :endVal='Scrollingdata.taskamount' :duration='3000'></countTo></h4>
          </div>
        </div>
        <div class="DataItem-item">
          <div class="dataShow">
            <p>任务总交易数量 (元)</p>
            <h4><svg-icon icon-class="dataMoneyPock"></svg-icon><countTo :startVal='Scrollingdata.startVal' :endVal='Scrollingdata.taskquantity' :duration='3000'></countTo></h4>
          </div>
        </div>
      </div>
      <div class="DataItem MinMargin">
        <div class="DataItem-item">
          <div class="dataShow">
            <p>实际完成金额 (元)</p>
            <h4><svg-icon icon-class="MoneyPock"></svg-icon><countTo :startVal='Scrollingdata.startVal' :endVal='Scrollingdata.Actualamount' :duration='3000'></countTo></h4>
          </div>
        </div>
        <div class="DataItem-item">
          <div class="dataShow">
            <p>实际交易数量 (元)</p>
            <h4><svg-icon icon-class="dataMoneyPock"></svg-icon><countTo :startVal='Scrollingdata.startVal' :endVal='Scrollingdata.Actualquantity' :duration='3000'></countTo></h4>
          </div>
        </div>
      </div>
      <div class="DataItem MinMargin">
        <div class="EchartPieitem-item-pie">
          <div id="myEchartCake" style="height: 180px;" ref="myEchartCake"></div>
        </div>
      </div>
    </div>
    <!-- 上方 end -->
    <!-- 中间 -->
    <div class="EchartContentPie">
      <div class="EchartContentPie-item">
        <div class="EchartContentPie-search Flex">
          <div class="title"><h3>交易量分析</h3></div>
          <div class="SearchData" style="margin-top: 1rem;">
            <div class="SearchData-item tagItem">
              <el-radio-group v-model="barSearch.type" @change="lineSearchchange(3)">
                <el-radio-button :label="1">全部</el-radio-button>
                <el-radio-button :label="2">本年</el-radio-button>
                <el-radio-button :label="3">本月</el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <el-date-picker style="width: 110px" v-model="barSearch.startTime" @change="lineSearchchange(4)" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"> </el-date-picker>
              <span>至</span>
              <el-date-picker style="width: 130px" v-model="barSearch.endTime" @change="lineSearchchange(4)" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"> </el-date-picker>
            </div>
            <div>
              <el-button type="primary" size="mini" @click="getTreeDiagram()">查询</el-button>
            </div>
          </div>
        </div>
        <div class="ShowPinzhong">
          <span  @click="ChoseShow(1,item.tab,item.name,'1')" v-for="(item,index) in barGeranOptionOne" :class="{isactive:item.tab!=1}" :key="index" :style="{'background': echartColor[item.color*1-1]}">{{item.name}}</span>
        </div>
        <div class="EchartPie-item-pie">
          <div id="OneEchartPie" ref="OneEchartPie" style="height: 350px;"></div>
        </div>
      </div>
      <div class="EchartContentPie-item">
        <div class="EchartContentPie-search Flex">
          <div class="title"><h3>交易金额分析</h3></div>
          <div class="SearchData" style="margin-top: 1rem;">
            <div class="SearchData-item tagItem">
              <el-radio-group v-model="barTwoSearch.type" @change="lineSearchchange(5)">
                <el-radio-button :label="1">全部</el-radio-button>
                <el-radio-button :label="2">本年</el-radio-button>
                <el-radio-button :label="3">本月</el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <el-date-picker style="width: 110px" @change="lineSearchchange(6)" v-model="barTwoSearch.startTime" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"> </el-date-picker>
              <span>至</span>
              <el-date-picker style="width: 130px" @change="lineSearchchange(6)" v-model="barTwoSearch.endTime" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"> </el-date-picker>
            </div>
            <div>
              <el-button type="primary" size="mini" @click="getTreeDiagramTwo()">查询</el-button>
            </div>
          </div>
        </div>
        <div class="ShowPinzhong">
          <span @click="ChoseShow(2,item.tab,item.name,'2')" v-for="(item,index) in barGeranOptionTwo" :class="{isactive:item.tab!=1}" :key="index" :style="{'background': echartColor[item.color*1-1]}">{{item.name}}</span>
        </div>
        <div class="EchartPie-item-pie">
          <div id="TwoEchartPie" ref="TwoEchartPie" style="height: 350px;"></div>
        </div>
      </div>
    </div>
    <!-- 中间 end-->
    <!-- 下面 -->
    <div class="LinEchart">
      <div class="EchartContentPie-search Flex">
        <div class="titleLine">
          <h3>交易价格走势分析</h3>
          <el-select v-model="lineSearch.grainId">
            <el-option v-for="(item,index) in GrainOption" :label="item.value" :value="item.key" :key="item.key"></el-option>
          </el-select>
        </div>
        <div class="SearchData">
          <div class="SearchData-item tagItem">
            <el-radio-group v-model="lineSearch.type" @change="lineSearchchange(1)">
              <el-radio-button :label="1">全部</el-radio-button>
              <el-radio-button :label="2">本年</el-radio-button>
              <el-radio-button :label="3">本月</el-radio-button>
            </el-radio-group>
          </div>
          <div>
            <el-date-picker style="width: 110px" v-model="lineSearch.startTime" @change="lineSearchchange(2)" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"> </el-date-picker>
            <span>至</span>
            <el-date-picker style="width: 130px" v-model="lineSearch.endTime" @change="lineSearchchange(2)" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"> </el-date-picker>
          </div>
          <div>
            <el-button type="primary" size="mini" @click="getLineChart()">查询</el-button>
          </div>
        </div>
      </div>
      <div id="EchartLine" ref="EchartLine" style="height: 350px;margin-top: 20px;"></div>
    </div>
    <!-- 下面 end -->
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
        Scrollingdata:{
          startVal:10,
          Actualquantity:0,
          Actualamount:0,
          taskquantity:0,
          taskamount:0,
          contractquantity:0,
          contractamount:0,
          dateString:''
        },
        barGeranOptionOne:[],
        barGeranOptionTwo:[],
        lineSearch:{
          type:1,
          grainId:'bc4db798632946faa13600e1b5ad4458',
          startTime:'',
          endTime:''
        },
        barSearch:{
          type:1,
          startTime:'',
          endTime:''
        },
        barTwoSearch:{
          type:1,
          startTime:'',
          endTime:''
        },
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
        colorRight:['#73D9C0', '#F4696C', '#EEBA67', '#4AC0EC', '#999CE2', '#DAD7DB'],
        echartColor:['#5FDAC0', '#F25859', '#F8B652', '#2DB8EF', '#7F85E4', '#D1CED1'],
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'GrainOption',
      ])
    },
    methods:{
       ...mapActions([
          'GetGrainOption',
        ]),
        //图表X轴种类隐藏显示
        ChoseShow:function(typeName,tab,name,chart){
          let Params = {'typeName':typeName,'type':tab==1?'2':'1','grainId':name};
          AdminApi.getTreehide(Params).then(data=>{
            let {message,statusCode} = data;
            if(statusCode == 0){
              if(chart == '1'){
                this.getTreeDiagram();
              }else{
                this.getTreeDiagramTwo();
              }
            }else{
              this.$message.error(message);
            }
          })
        },
        lineSearchchange:function(type){
          if(type == 2 && (this.lineSearch.endTime || this.lineSearch.startTime)){
            this.lineSearch.type = 1
          }
          if(type == 1 && this.lineSearch.type != 1){
            this.lineSearch.endTime = ""
            this.lineSearch.startTime = ''
          }
          if(type == 4 && (this.barSearch.endTime || this.barSearch.startTime)){
            this.barSearch.type = 1
          }
          if(type == 3 && this.barSearch.type != 1){
            this.barSearch.endTime = ""
            this.barSearch.startTime = ''
          }
          if(type == 6 && (this.barTwoSearch.endTime || this.barTwoSearch.startTime)){
            this.barTwoSearch.type = 1
          }
          if(type == 5 && this.barTwoSearch.type != 1){
            this.barTwoSearch.endTime = ""
            this.barTwoSearch.startTime = ''
          }
        },
        getAllTaskResultRealByUserId:function(){
          AdminApi.getAllTaskResultRealByUserId().then(data=>{
            let {message,statusCode} = data
            if(statusCode == 0){
              this.Scrollingdata.Actualquantity = isNaN(message.totalNumber*1)?0:message.totalNumber*1
              this.Scrollingdata.Actualamount = isNaN(message.totalMoney*1)?0:message.totalMoney*1
            }else{
              this.$message.error(message);
            }
          })
        },
        GetDataNumber:function(){
          AdminApi.getAllTaskResultByUserId().then(data=>{
            let {message,statusCode} = data
            if(statusCode == 0){
              this.Scrollingdata.taskquantity = isNaN(message.totalWeight*1)?0:message.totalWeight*1
              this.Scrollingdata.taskamount = isNaN(message.totalTransactionAmoun*1)?0:message.totalTransactionAmoun*1
              this.Scrollingdata.contractquantity = isNaN(message.contractNumbers*1)?0:message.contractNumbers*1
              this.Scrollingdata.contractamount = isNaN(message.contractPrices*1)?0:message.contractPrices*1
              this.Scrollingdata.dateString = message.times
            }else{
              this.$message.error(message);
            }
          })
        },
        getLineChart:function(){
          let Params = this.lineSearch
          AdminApi.getLineChart(Params).then(data=>{
            let {message,statusCode} = data
            if(statusCode == 0){
               let Xdata = []
               let dataday = []
               let datahistry = []
               message.chartDTOList.map(item=>{
                 Xdata.push(item.timeAxis)
                 dataday.push(message.avgPrice)
                 datahistry.push(item.dayPrice)
               })
               this.getLineEchart(Xdata,dataday,datahistry)
            }else{
              this.$message.error(message);
            }
          })
        },
        getTreeDiagramShanxing:function(){
          AdminApi.getTreeDiagramShanxing().then(data=>{
            let {message,statusCode} = data
            if(statusCode == 0){
              let legendData = []
              message.tradingVolumeList.forEach(item=>{
                legendData.push(item.name)
              })
              this.getPieEchart(legendData,message.tradingVolumeList)
            }else{
              this.$message.error(message);
            }
          })
        },
        getTreeDiagram:function(){
          let Params = this.barSearch
          AdminApi.getTreeDiagram(Params).then(data=>{
            let {message,statusCode} = data
            if(statusCode == 0){
              this.barGeranOptionOne = message.tradingVolumeList
              let tradingVolumeXdata = []
              let tradingVolumedata = []
              let colorLeft = []
              let colorRight = []
              message.tradingVolumeList.map(item=>{
                if(item.tab==1){
                  tradingVolumeXdata.push(item.name)
                  tradingVolumedata.push(item.value)
                  colorLeft.push(this.colorLeft[item.color*1-1])
                  colorRight.push(this.colorRight[item.color*1-1])
                }
              })
              this.getBarEchart('OneEchartPie',this.$refs.OneEchartPie,colorLeft,colorRight,'单位/吨',tradingVolumeXdata,tradingVolumedata)
            }else{
              this.$message.error(message);
            }
          })
        },
        getTreeDiagramTwo:function(){
          let Params = this.barTwoSearch
          AdminApi.getTreeDiagram(Params).then(data=>{
            let {message,statusCode} = data
            if(statusCode == 0){
              this.barGeranOptionTwo = message.tradingTotalList
              let tradingTotaXdata = []
              let tradingTotaldata = []
              let colorLeft = []
              let colorRight = []
              message.tradingTotalList.map(item=>{
                if(item.tab==1){
                    tradingTotaXdata.push(item.name)
                    tradingTotaldata.push(item.value)
                    colorLeft.push(this.colorLeft[item.color*1-1])
                    colorRight.push(this.colorRight[item.color*1-1])
                 }
              })
              this.getBarEchart('TwoEchartPie',this.$refs.TwoEchartPie,colorLeft,colorRight,'单位/万元',tradingTotaXdata,tradingTotaldata)
            }else{
              this.$message.error(message);
            }
          })
        },
        getPieEchart:function(legendData,data){
              let myChart = echarts.init(this.$refs.myEchartCake);
              window.onresize = myChart.resize;
              this.charts = echarts.init(document.getElementById('myEchartCake'))
              this.charts.clear();
              this.charts.setOption({
                      color:['#5FDAC0', '#F25859', '#F8B652', '#2DB8EF', '#7F85E4', '#D1CED1'],
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
                      legend: {
                          icon: "circle",
                          itemWidth: 10,  // 设置宽度
                          itemHeight: 10, // 设置高度
                          orient: 'vertical',
                          right:0,
                          top:30,
                          data: legendData
                      },
                      series: [
                        {
                            type: 'pie',
                            radius: ['55%', '80%'],
                            label: {
                                show: false,
                                position: 'center'
                            },
                            data: data
                        }
                      ]
              })
        },
        getBarEchart:function(EchartBarData,refsEchartBarData,colorLeft,colorRight,Yname,Xdata,data){
          let myBarEchart = echarts.init(refsEchartBarData);
          window.onresize = myBarEchart.resize;
          this.charts = echarts.init(document.getElementById(EchartBarData))
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
                data: Xdata,
            },
            grid: {
               top: '8%',
               bottom:'25%'
            },
            yAxis: {
               type: 'value',
               name: Yname,
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
                  data:data,
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
                  data:data,
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
                  data:data,
                }
            ]
          })
        },
        getLineEchart:function(Xdata,dataday,datahistry){
          let myBarEchart = echarts.init(this.$refs.EchartLine);
          window.onresize = myBarEchart.resize;
          this.charts = echarts.init(document.getElementById('EchartLine'))
          this.charts.clear();
          this.charts.setOption({
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                icon: 'circle',
                data: ['单日均价', '历史平均成交价'],
                right:50,
                orient:'vertical',
                itemWidth: 8,
                itemHeight: 8,
                top:10,
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
                data: Xdata,
                boundaryGap: false,
              },
              yAxis: {
                name:'单位 元/吨',
                type: 'value',
                splitLine:{
                  show:false //网格线
                },
              },
              dataZoom: [
                {
                  show: false,
                  type: 'slider',
                  xAxisIndex: 0,
                  filterMode: 'empty'
                },
                {
                  type: 'inside',
                  xAxisIndex: 0,
                  filterMode: 'empty'
                },
              ],
              series: [
                  {
                      name: '单日均价',
                      type: 'line',
                      data: dataday,
                      itemStyle: {
                          borderWidth: 3,
                          borderColor: '#3ABDEE',
                          color: '#3ABDEE'
                      }
                  },
                  {
                      name: '历史平均成交价',
                      type: 'line',
                      data: datahistry,
                      itemStyle: {
                          borderWidth: 3,
                          borderColor: '#F45858',
                          color: '#F45858'
                      }
                  }
              ]
          })
        }
    },
    mounted() {
      this.GetGrainOption()
      this.GetDataNumber()
      this.getAllTaskResultRealByUserId()
      this.getLineChart()
      this.getTreeDiagramShanxing()
      this.getTreeDiagram()
      this.getTreeDiagramTwo()
    }
  }
</script>

<style scoped>
  .breadcrumbDiv .tips{color: #999999;font-size: 0.875rem;padding-left: 0.625rem;}
  .breadcrumbDiv .tips i{color: #1492D3;padding-right: 0.125rem;}
  .EchartContent,.EchartContentPie{ width: 97%; margin: 0 auto 1.25rem auto; display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-around;}
  .DataItem{background: #FFFFFF;display: flex;justify-content: space-between;flex-direction: row;flex-wrap: nowrap;}
  .DataItem .DataItem-item{width: 48%;text-align: center;padding: 1.875rem 0;line-height: 2.6875rem;}
  .DataItem .DataItem-item .dataShow h4{margin: 0;line-height: 2.5rem;color: #333333;font-size: 1.25rem;font-weight: initial;margin-top: 0.625rem;}
  .EchartPieitem-item-pie{width: 320px;margin: 0 auto;}
  .EchartContentPie-item .title{padding-left: 0.625rem;}
  .SearchData{display: flex;justify-content:flex-end;flex-wrap: nowrap;flex-flow: row;width: 31.25rem;margin-top: 0.5rem;padding-right: 0.625rem;}
  .SearchData .tagItem{margin-right: 0.625rem;}
  .SearchData .tagItem span{color: #333333;font-size: 0.875rem;cursor: pointer;line-height: 36px;}
  .SearchData .tagItem span.isActive{background: #E8F4FF;color: #1492D3;padding: 2px 8px;border-radius: 14px;}
  .ShowPinzhong {text-align: left;width: 80%;margin:0 auto;padding-bottom: 1.25rem;}
  .ShowPinzhong .isactive{background: #999999!important;}
  .ShowPinzhong span{background: #E8F4FF;color: #FFFFFF;padding: 0.1875rem 0.5rem;margin-right: 0.625rem;border-radius: 5px;cursor: pointer;}
  .LinEchart{background: #FFFFFF;margin: 1.25rem auto;width: 96%;padding-top: 0.625rem;}
  .titleLine h3{display: inline;padding:0 1rem;}
</style>
