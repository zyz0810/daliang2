<template>
  <el-upload id="el-upload" :action="uploadurl" :limit="imglimit" list-type="picture-card" :on-remove="handleRemove" :on-success="successhandle">
    <i slot="default" class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
  import { UploadImgUrl } from '@/api/ApiConfig'
  export default{
    data(){
      return{
        uploadurl:"",
        urlstrings:'',
        imglimit:3
      }
    },
    methods:{
      successhandle(response,file,fileList){
        const dom = document.getElementById('el-upload').getElementsByClassName('el-upload')[0]
        this.urlstrings = this.urlstrings+'#'+response.message[0]
        this.$emit('getImgs', this.urlstrings)
        let number = this.urlstrings.split('#')
        if(this.urlstrings && number.length>this.imglimit){
          dom.style.display = 'none'
        }else{
          dom.style.display = 'inline-block'
        }
      },
      handleRemove(file,fileList){
        const dom = document.getElementById('el-upload').getElementsByClassName('el-upload')[0]
        if(this.urlstrings){
          let urlarr = this.urlstrings.split('#')
          urlarr.forEach(function(e,index){
            if(e==file.response.message[0]){
               urlarr.splice(index, 1);
            }
          })
          this.urlstrings = urlarr.join("#")
          this.$emit('getImgs', this.urlstrings)
        }
        dom.style.display = 'inline-block'
      }
    },
    mounted() {
      this.uploadurl = UploadImgUrl()
    }
  }
</script>

<style scoped lang="stylus">
</style>
