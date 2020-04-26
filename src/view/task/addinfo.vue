<template>
  <div>
    <div class="Flex breadcrumbDiv MarginTop">
      <div><h4 class="TextColorGlay">{{$route.meta.title}}</h4></div>
    </div>
    <el-row class="content">
      <el-col :span="24">
        <div class="InfoTitle">
          <span class="line"></span>
          <span class="text TextColorGlay">基本信息</span>
        </div>
        <div class="AddInfo">
          <el-form :inline="true" :model="AddData" :rules="rulesAddData" ref="AddData"  class="demo-form-inline FlexFrom" label-width="120px">
            <el-form-item label="合同号" prop="orderContract">
              <el-input v-model="AddData.orderContract"  maxlength="40" @change="OrderByOrderContract()" clearable placeholder="请输入合同号"></el-input>
            </el-form-item>
            <el-form-item label="等级" prop="orderGbgrade">
              <el-select :disabled="disabled" v-model="AddData.orderGbgrade" placeholder="请选择等级">
                <el-option v-for="(item,index) in GradeOption" :label="item" :value="item" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="卖方交易商" prop="sellUserName">
              <el-input :disabled="disabled" v-model="AddData.sellUserName" maxlength="50" placeholder="请输入卖方交易商名称"></el-input>
            </el-form-item>
            <el-form-item label="标的号" prop="orderTarget">
              <el-input :disabled="disabled" v-model="AddData.orderTarget" maxlength="30" clearable placeholder="请输入标的号"></el-input>
            </el-form-item>
            <el-form-item label="产地" class="orderCountry" prop="orderCountry">
              <el-select :disabled="disabled" v-model="AddData.orderCountry" placeholder="请选择国家" @change="choseCountry">
                <el-option  v-for="(item,key) in Countrylist" :key="key" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地区" class="orderCounty" prop="orderProvince" v-show="AddData.orderCountry=='中国'">
              <div class="orderCountyItem">
                <el-select :disabled="disabled" v-model="AddData.orderProvince" placeholder="请选择省" @change="choseCity">
                  <el-option v-for="item in province" :key="item.id" :label="item.value"  :value="item.value"></el-option>
                </el-select>
              </div>
              <div class="orderCountyItem">
                <el-select :disabled="disabled" v-model="AddData.orderCity" placeholder="请选择市" @change="choseBlock">
                  <el-option  v-for="item in cityAll" :key="item.id"  :label="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
              <div class="orderCountyItem">
                <el-select :disabled="disabled" v-model="AddData.orderCounty" placeholder="请选择区">
                  <el-option  v-for="item in areaAll" :key="item.id"  :label="item.value" :value="item.value"></el-option>
                </el-select>
              </div>
            </el-form-item>
             <el-form-item label="买方交易商" prop="buyUserName">
              <el-input :disabled="disabled" v-model="AddData.buyUserName" maxlength="50" placeholder="请输入买方交易商名称"></el-input>
            </el-form-item>
             <el-form-item label="商户编号" prop="merchantNo">
              <el-input :disabled="disabled" v-model="AddData.merchantNo" maxlength="50" placeholder="请输入商户编号"></el-input>
            </el-form-item>
            <el-form-item label="合同数量"  prop="contractNumber" class="appendset">
              <el-input :disabled="disabled" v-model="AddData.contractNumber" @change="GetcontractPrice()" placeholder="请输入合同数量"><template slot="append">吨</template></el-input>
            </el-form-item>
            <el-form-item label="承储库" prop="storageName">
              <el-input :disabled="disabled" v-model="AddData.storageName" maxlength="30" placeholder="请输入实际存粮地点"></el-input>
            </el-form-item>
            <el-form-item label="品类" prop="grainId">
              <el-select :disabled="disabled" v-model="AddData.grainId" placeholder="请选择品类" @change="GetgrainVarietylist">
                <el-option v-for="(item,index) in GrainOption" :label="item.value" :value="item.key" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品种" prop="grainVariety">
              <el-select :disabled="disabled" v-model="AddData.grainVariety" placeholder="请选择品种">
                <el-option v-for="(item,index) in VarietyOption" :label="item.value" :value="item.key" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="买入单价"  prop="orderBugprice" class="appendset">
              <el-input :disabled="disabled" v-model="AddData.orderBugprice" @change="GetcontractPrice()"  placeholder="请输入买入单价"><template slot="append">元/吨</template></el-input>
            </el-form-item>
            <el-form-item label="实际存粮地点" prop="depotName">
              <el-input :disabled="disabled" v-model="AddData.depotName" maxlength="30" placeholder="请输入承储库名称"></el-input>
            </el-form-item>
            <el-form-item label="价款" prop="contractPrice"  class="appendset" >
              <el-input :disabled="disabled" @change="GetcontractPrice()" v-model="AddData.contractPrice" placeholder="请输入价款"><template slot="append">元</template></el-input>
            </el-form-item>
            <el-form-item label="仓号" prop="depotNum">
              <el-input :disabled="disabled" v-model="AddData.depotNum" maxlength="20" placeholder="请输入仓号"></el-input>
            </el-form-item>
            <div class="InfoTitle width100">
              <span class="line"></span>
              <span class="text TextColorGlay">本次出库信息</span>
            </div>
            <el-form-item label="出库单号" prop="orderOutnum">
              <el-input v-model="AddData.orderOutnum" maxlength="30" placeholder="请输入出库单号"></el-input>
            </el-form-item>
            <el-form-item label="经办人" prop="operator">
              <el-input v-model="AddData.operator" maxlength="20" placeholder="请输入经办人"></el-input>
            </el-form-item>
            <el-form-item label="经办人身份证号" prop="operatorCardid">
              <el-input v-model="AddData.operatorCardid" maxlength="18" placeholder="请输入经办人身份证号"></el-input>
            </el-form-item>
            <el-form-item label="本次提货数量" prop="orderNumber" class="appendset">
              <el-input v-model="AddData.orderNumber" @change="GetcontractPrice()" placeholder="请输入本次提货数量"><template slot="append">吨</template></el-input>
            </el-form-item>
            <el-form-item label="本次金额" prop="orderTargetprice"  class="appendset">
              <el-input @change="GetcontractPrice()" v-model="AddData.orderTargetprice" placeholder="请输入本次金额"><template slot="append">元</template></el-input>
            </el-form-item>
            <div class="InfoTitle width100">
              <span class="line"></span>
              <span class="text TextColorGlay">任务信息</span>
            </div>
            <div class="setBlock">
              <el-form-item label="选择执行营业部" prop="departId" label-width="140px" class="width100">
                <el-select v-model="AddData.departId" placeholder="请选择选择执行营业部">
                  <el-option v-for="(item,index) in SalesOption" :label="item.departName" :key="item.departId" :value="item.departId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务内容" prop="taskContent" label-width="140px" class="width100">
                <el-input type="textarea" v-model="AddData.taskContent" maxlength="150" show-word-limit placeholder="请输入任务内容"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="BtnCenter">
          <el-button type="primary" :loading="AddLoading" @click="SubmitAddInfo()">提交</el-button>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import AdminApi from '@/api/AdminApi.js'
  import { mapGetters , mapActions} from 'vuex'
  import { validateTwoFloat,validateIdCard } from '@/assets/js/validator';
  import { GetAddressMap,choseAddress,GetCountry } from '@/assets/js/city'
  export default{
    data(){
      return{
        disabled:false,
        province:'',
        cityAll:[],
        areaAll:[],
        Countrylist:[],
        orderContract:'',
        AddData:{
          contractPrice:'',
          contractNumber:'',
          merchantNo:'',
          operator:'',
          operatorCardid:'',
          storageName:'',
          orderOutnum:'',
          orderBugprice:'',
          orderTarget:'',
          orderTargetprice:'',
          orderContract:'',
          orderNumber:'',
          sellUserName:'',
          buyUserName:'',
          depotName:'',
          depotNum:'',
          grainId:'',
          grainName:'',
          grainVariety:'',
          grainVarietyName:'',
          orderGbgrade:'',
          orderCountry:'',
          orderProvince:'',
          orderCity:'',
          orderCounty:'',
          departId:'',
          taskContent:'',
        },
        AddLoading:false,
        rulesAddData:{
          contractPrice:[
            {required:true,message:'请输入请输入价款',trigger:'blur'},
            { validator:validateTwoFloat, trigger:'blur'}
          ],
          contractNumber:[
            {required:true,message:'请输入合同数量',trigger:'blur'},
            { validator:validateTwoFloat, trigger:'blur'}
          ],
          merchantNo:[
            {required:true,message:'请输入商户编号',trigger:'blur'},
          ],
          operator:[
            {required:true,message:'请输入经办人',trigger:'blur'},
          ],
          operatorCardid:[
            {required:true,message:'请输入经办人身份证号',trigger:'blur'},
            { validator:validateIdCard, trigger:'blur'}
          ],
          storageName:[
            {required:true,message:'请输入实际存粮地点',trigger:'blur'},
          ],
          orderOutnum:[
            {required:true,message:'请输入出库单号',trigger:'blur'}
          ],
          orderBugprice:[
            {required:true,message:'请输入买入单价',trigger:'blur'},
            { validator:validateTwoFloat, trigger:'blur'}
          ],
          orderTarget:[
            {required:true,message:'请输入标的号',trigger:'blur'}
          ],
          orderTargetprice:[
            {required:true,message:'请输入标的价格',trigger:'blur'},
            { validator:validateTwoFloat, trigger:'blur'}
          ],
          orderContract:[
            {required:true,message:'请输入合同号',trigger:'blur'}
          ],
          orderNumber:[
            {required:true,message:'请输入本次提货数量',trigger:'blur'},
            { validator:validateTwoFloat, trigger:'blur'},
            { validator:(rule,value,callback)=>{ if(value > this.AddData.contractNumber){ callback(new Error('本次提货数量不能大于合同数量')); } else { callback(); } }, trigger:'blur' },
          ],
          sellUserName:[
            {required:true,message:'请输入卖方交易商名称',trigger:'blur'}
          ],
          buyUserName:[
            {required:true,message:'请输入买方交易商名称',trigger:'blur'}
          ],
          depotName:[
            {required:true,message:'请输入承储库名称',trigger:'blur'}
          ],
          depotNum:[
            {required:true,message:'请输入仓号',trigger:'blur'}
          ],
          taskContent:[
            {required:true,message:'请输入任务内容',trigger:'blur'}
          ],
          grainVariety:[
            {required:true,message:'请选择品类',trigger:'change'}
          ],
          departId:[
            {required:true,message:'请选择执行营业部',trigger:'blur'}
          ],
          grainId:[
            {required:true,message:'请选择品种',trigger:'change'}
          ],
          orderGbgrade:[
            {required:true,message:'请选择国际等级',trigger:'change'}
          ],
          orderCountry:[
            {required:true,message:'请选择产地',trigger:'change'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'GrainOption',
        'SalesOption',
        'GradeOption',
        'VarietyOption',
      ])
    },
    methods:{
      ...mapActions([
        'GetGrainOption',
        'GetSalesOption',
        'GetVatietyOption'
        ]),
      OrderByOrderContract:function(){
        if(this.AddData.orderContract == "" || !this.AddData.orderContract){
          this.$message.error('请输入合同号');
          return false
        }
        this.orderContract = this.AddData.orderContract
        let Params = {'orderContract':this.AddData.orderContract}
        AdminApi.getTaskOrderByOrderContract(Params).then(data=>{
          let {message,statusCode} = data
          if(statusCode == 0){
             this.AddData = message
            if(message.orderContract){
              this.GetVatietyOption(message.grainId)
              this.disabled = true
            }else{
              this.AddData.orderContract = this.orderContract
              this.disabled = false
            }
          }else{
            this.$refs['AddData'].resetFields()
            this.AddData.orderContract = this.orderContract
            this.$message.error(message);
          }
        })
      },
      GetcontractPrice:function(){
        if(this.AddData.contractNumber>0 && this.AddData.orderBugprice>0){
          this.AddData.contractPrice = (this.AddData.contractNumber*this.AddData.orderBugprice).toFixed(2)
        }else{
          this.AddData.contractPrice = 0
        }
        if(this.AddData.orderNumber>0 && this.AddData.orderBugprice>0){
          this.AddData.orderTargetprice = (this.AddData.orderNumber*this.AddData.orderBugprice).toFixed(2)
        }else{
          this.AddData.orderTargetprice = 0
        }

      },
      SubmitAddInfo:function(){
        this.$refs['AddData'].validate((valid) => {
            if (valid) {
              this.AddLoading = true
              let grainName = this.GrainOption.find(item => item.key == this.AddData.grainId)
              this.AddData.grainName = grainName.value
              let grainVarietyName = this.VarietyOption.find(item => item.key == this.AddData.grainVariety)
              this.AddData.grainVarietyName = grainVarietyName.value
              let Params = this.AddData
              AdminApi.addTaskOrder(Params).then(data=>{
                this.AddLoading = false
                let {message,statusCode} = data
                if(statusCode == 0){
                  this.$message.success(message);
                  this.$refs['AddData'].resetFields()
                  this.$router.push({path:'/task/list'})
                }else{
                  this.$message.error(message);
                }
              })
            }else{
              this.$message.error('请输入正确的添加信息');
            }
          })
      },
      GetgrainVarietylist:function(e){
        this.AddData.grainVariety = ''
        this.AddData.grainVarietyName = ''
        this.GetVatietyOption(e)
      },
      choseCity:function(e) {
        let index2 = this.province.findIndex(item => item.value === e)
        this.AddData.orderCity = this.province[index2].children[0]['value']
        this.AddData.orderCounty=this.province[index2].children[0].children[0]['value']
        var self = this
        choseAddress(self,0,this.province[index2].id)
      },
      choseBlock:function(e) {
        let index = this.cityAll.findIndex(item => item.value === e)
        this.AddData.orderCounty= this.cityAll[index].children[0]['value']
      	var self = this
        choseAddress(self,1,this.cityAll[index].id)
      },
      choseCountry:function(e){
        if(e=='中国'){
          this.AddData.orderProvince = ''
          this.AddData.orderCounty = ''
          this.AddData.orderCity = ''
          let self = this
          GetAddressMap(self)
        }
      }
    },
    mounted() {
      this.GetGrainOption()
      this.GetSalesOption()
      let self = this
      GetCountry(self)
    }
  }
</script>

<style scoped>
  .BtnCenter{text-align: center;padding: 20px 0;}
  .width100{width: 100%;}
  .setBlock .el-form-item{width: 100%;}
</style>
