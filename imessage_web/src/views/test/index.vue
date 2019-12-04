<template>
  <div>
    <panel-title title="业务测试"></panel-title>

    <el-row :gutter="20">
      <el-col :lg="8" :sm="24" style="margin-bottom: 20px">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>邮件测试</span>
          </div>
          <div style="height: 400px;">
            <test-email></test-email>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="8" :sm="24" style="margin-bottom: 20px">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>短信测试</span>
          </div>
          <div style="height: 400px;" class="base-info">
            <test-sms></test-sms>
          </div>
        </el-card>
      </el-col>


      <el-col :lg="8" :sm="24" style="margin-bottom: 20px">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>微信测试</span>
          </div>
          <div style="height: 400px;" class="base-info">
            <test-wei-xin></test-wei-xin>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <p><b>参数说明：</b>(POST, json数据{})</p>
        <p>1. token | string （必填）， 用户token，用来检验用户的身份</p>
        <p>2. template_number | string （必填）， 模板编号，用来发送消息格式</p>
        <p>3. channel | string （必填）, 取值范围 ['sms', 'email', 'weixin'], 发送途径</p>
        <p>4. recipient | array （必填）, 收件人 数组， 比如：['a@qq.com', 'b@qq.com'] | ['135xxxxx3274'] | ['open_id']</p>
        <p>5. content | object （必填）, 消息参数， 根据模板定义的参数， 比如{'content': 'arg': 'test'}, 'arg'是模板定于的参数</p>
        <p>6. subject | object （如果是邮件渠道必填，否则不填）, 邮件参数（如果选择邮件发送，此处是邮件标题）， 根据邮件标题的参数， 比如{'subject': 'arg': 'test'},
          'arg'是标题定于的参数</p>


        <p><b>响应</b>，json， 状态都是200</p>
        <p>1. message_id| int, 发送消息的id</p>
        <p>2. code| string | int, code 为0或者 'OK', 发送正常</p>
        <p>3. errmsg| string, 错误信息</p>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'

  import TestEmail from './TestEmail'
  import TestWeiXin from './TestWeiXin'
  import TestSms from './TestSms'

  export default {
    name: "index",
    components: {
      PanelTitle,
      TestEmail,
      TestWeiXin,
      TestSms
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .base-info {
    .control {
      font-weight: normal;
      font-size: 14px;
      color: #666;
      position: relative;
      top: 7px;
      margin-bottom: 10px;
      width: 100px;

      &.small {
        font-size: 12px;
      }
    }

    .normal {
      font-size: 14px;
      position: relative;
      top: 7px;
      left: 15px;

      &.small {
        font-size: 12px;
      }
    }
  }

</style>
