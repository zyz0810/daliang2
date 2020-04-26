import AdminApi from '@/api/AdminApi.js'
import { Message } from 'element-ui'
//定义常量
const GRAON_OPTION = 'GRAON_OPTION'
const SALES_OPTION = 'SALES_OPTION'
const VARIETY_OPTION = 'VARIETY_OPTION'
const AGENT_OPTION = 'AGENT_OPTION'
const DEPART_OPTION = 'DEPART_OPTION'
const COMUSER_OPTION = 'COMUSER_OPTION'

const Option = {
  state:{
    GrainOption: [],
    SalesOption:[],
    GradeOption:{1:'一等', 2:'二等', 3:'三等', 4:'四等', 5:'五等', 6:'等外'},
    VarietyOption:[],
    StatusOption:[{value:1,label:'待接收'}, {value:2,label:'进行中'}, {value:7,label:'已完成'},{value:8,label:'已取消'}],
    AgentOption:[],
    DepartOption:[],
    ComUserOption:[],
  },
  mutations: {
    [GRAON_OPTION](state, GrainOption) {
      state.GrainOption = GrainOption
    },
    [SALES_OPTION](state, SalesOption) {
      state.SalesOption = SalesOption
    },
    [VARIETY_OPTION](state, VarietyOption) {
      state.VarietyOption = VarietyOption
    },
    [AGENT_OPTION](state, AgentOption) {
      state.AgentOption = AgentOption
    },
    [DEPART_OPTION](state, DepartOption) {
      state.DepartOption = DepartOption
    },
    [COMUSER_OPTION](state, ComUserOption) {
      state.ComUserOption = ComUserOption
    },
  },
  actions:{
    GetGrainOption({ commit }){
      AdminApi.getGrain().then(data=>{
        let {message,statusCode} = data
        if(statusCode == 0){
          commit(GRAON_OPTION, message.grain)
        }else{
          Message.error(message);
        }
      })
    },
    GetSalesOption({ commit }){
      AdminApi.getMyDepartUser().then(data=>{
        let {message,statusCode} = data
        if(statusCode == 0){
          commit(SALES_OPTION, message)
        }else{
          Message.error(message);
        }
      })
    },
    GetVatietyOption({ commit,state },Value){
      state.VarietyOption = []
      if(Value){
        let grainVarietyoptions = state.GrainOption.find(item => item.key == Value)
        commit(VARIETY_OPTION, grainVarietyoptions.list)
      }else{
        state.VarietyOption = []
      }
    },
    GetAgentOption({ commit,state }){
      AdminApi.getUserAgentList().then(data=>{
        let {message,statusCode} = data
        if(statusCode == 0){
          commit(AGENT_OPTION, message)
        }else{
          Message.error(message);
        }
      })
    },
    GetDepartOption({ commit },Value){
      let Params = {'userType':Value}
      AdminApi.getAllDepartUser(Params).then(data=>{
        let {message,statusCode} = data
        if(statusCode == 0){
          commit(DEPART_OPTION, message)
        }else{
          Message.error(message);
        }
      })
    },
    GetComUserOption({ commit,state }){
      AdminApi.getMyComUser().then(data=>{
        let {message,statusCode} = data
        if(statusCode == 0){
          commit(COMUSER_OPTION, message)
        }else{
          Message.error(message);
        }
      })
    },
  },
  getters: {
    GrainOption: state => state.GrainOption,
    SalesOption: state => state.SalesOption,
    GradeOption: state => state.GradeOption,
    VarietyOption: state => state.VarietyOption,
    StatusOption: state => state.StatusOption,
    AgentOption: state => state.AgentOption,
    DepartOption: state => state.DepartOption,
    ComUserOption: state => state.ComUserOption,
  }
}
export default Option
