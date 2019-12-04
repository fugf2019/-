<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="text-warning"
              style="font-size: 12px">注：请在微信公众号里设置
          <p>URL： /api/receive/event</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="应用ID:" prop="app_id">
            <el-input v-model="form.app_id"></el-input>
          </el-form-item>
          <el-form-item label="应用密钥:" prop="app_secret">
            <el-input v-model="form.app_secret"></el-input>
          </el-form-item>
          <el-form-item label="token:" prop="token">
            <el-input v-model="form.token"></el-input>
          </el-form-item>
          <el-form-item label="启用:" prop="enable">
            <el-switch v-model="form.enable"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveEmail">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import {getChannel, updateChannel, createChannel} from '@/api/channel'
  import _ from '_lodash@4.17.15@lodash'

  export default {
    name: "WeixinForm",
    data() {
      return {
        info_id: null,
        readonly: true,

        form: {
          app_id: null,
          app_secret: null,
          token: null,
          enable: true,
          type: 'weixin'
        },
        rules: {
          app_id: [{required: true, message: '请输入应用ID', trigger: 'blur'}],
          app_secret: [{required: true, message: '请输入应用密钥', trigger: 'blur'}],
          token: [{required: true, message: '请输入token', trigger: 'blur'}],
        }
      }
    },
    created() {
      this.getSmsSetting();
    },
    methods: {
      async getSmsSetting() {
        const response = await getChannel({type: 'weixin'});
        const data = response._items;
        if (!data.length) return false;
        const info = data[0];
        this.form = _.pick(info, Object.keys(this.form));
        this.info_id = info.id

      },
      saveEmail() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;

          if (this.info_id) {
            await updateChannel(this.info_id, this.form)
          } else {
            const resp = await createChannel(this.form);
            this.info_id = resp.id;
          }
          this.$message.success('更新成功');
        })
      }
    }
  }
</script>

<style scoped>

</style>
