<template>
  <div>
    <panel-title title="基础信息"></panel-title>


    <el-row :gutter="20">
      <el-col :lg="12" :sm="24" style="margin-bottom: 20px">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>二维码</span>
            <span class="text-warning pull-right"
                  style="font-size: 12px; position: relative; top: 15px">注：二维码有效期2小时</span>
          </div>
          <div style="height: 350px;">
            <img :src="url" alt="二维码" v-if="url" width="300px" height="300px" style="margin-left: 10px"/>
            <div class="top-line"></div>
            <el-button type="primary" @click="getUserInfo" style="margin-left: 25px" v-if="url">更新二维码</el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :lg="12" :sm="24" style="margin-bottom: 20px">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>基本信息</span>
          </div>
          <div style="height: 350px;" class="base-info">
            <el-row>
              <div class="control pull-left text-gray-ol">
                <span>账号名：</span>
              </div>
              <div class="normal pull-left">
                <span>{{userInfo.username}}</span>
              </div>
            </el-row>
            <el-row>
              <div class="control pull-left text-gray-ol">
                <span>token：</span>
              </div>
              <div class="normal pull-left">
                <span>{{userInfo.message_token.substring(0, 50) + '...'}}</span>
                <span class="text-explode">|</span>
                <el-popover
                  placement="top-start"
                  title="token"
                  width="600"
                  trigger="click"
                  :content="userInfo.message_token">
                  <span slot="reference" class="span-color">查看</span>
                </el-popover>
              </div>
            </el-row>
            <el-row>
              <div class="control pull-left text-gray-ol">
                <span>收件人数量：</span>
              </div>
              <div class="normal pull-left">
                <span>{{userInfo.recipient.length}} 个</span>
              </div>
            </el-row>
          </div>
        </el-card>
      </el-col>


    </el-row>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'

  import waves from '@/directive/waves/index'

  import {getUserInfo, updateQr} from '@/api/users/users'

  import {Loading} from 'element-ui'


  export default {
    name: 'Dashboard',
    directives: {
      waves
    },
    components: {
      PanelTitle
    },
    computed: {},
    data() {
      return {
        url: '',
        userInfo: {
          message_token: '',
          recipient: [],
        },
      }
    },
    async created() {
      await this.getUserInfo();
    },
    methods: {
      async getUserInfo() {
        let loadingInstance = Loading.service({text: '加载中...'});
        await updateQr();
        const response = await getUserInfo(this.$store.getters.userId);
        this.userInfo = response;
        this.url = response.qr_url;
        loadingInstance.close();
      },

    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .base-info {
    .el-form-item__label {
      font-size: 14px;
    }

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

