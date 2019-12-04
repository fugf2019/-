<template>
  <div>
    <panel-title title="渠道设置"></panel-title>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>短信</span>
            <span class="text-warning pull-right"
                  style="font-size: 12px; position: relative; top: 15px">注：短信是使用阿里云提供的服务</span>
          </div>
          <div style="height: 400px;">
            <sms-form></sms-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>邮件</span>
          </div>
          <div style="height: 400px;">
            <email-form></email-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>微信</span>
          </div>
          <div style="height: 400px;">
            <weixin-form></weixin-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'

  import SmsForm from './SmsForm'
  import EmailForm from './EmailForm'
  import WeixinForm from './WeixinForm'

  export default {
    name: "index",
    components: {
      PanelTitle,
      SmsForm,
      EmailForm,
      WeixinForm
    }
  }
</script>

<style scoped>

</style>
