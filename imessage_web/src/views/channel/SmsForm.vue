<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="密钥ID:" prop="access_key_id">
            <el-input v-model="form.access_key_id"></el-input>
          </el-form-item>
          <el-form-item label="短信密钥:" prop="access_key_secret">
            <el-input v-model="form.access_key_secret"></el-input>
          </el-form-item>
          <el-form-item label="启用:" prop="enable">
            <el-switch v-model="form.enable"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveSms">保 存</el-button>
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
    name: "SmsForm",
    data() {
      return {
        info_id: null,

        form: {
          access_key_id: null,
          access_key_secret: null,
          enable: true,
          type: 'sms'
        },
        rules: {
          access_key_id: [{required: true, message: '请输入密钥ID', trigger: 'blur'}],
          access_key_secret: [{required: true, message: '请输入密钥', trigger: 'blur'}],
        }
      }
    },
    created() {
      this.getSmsSetting();
    },
    methods: {
      async getSmsSetting() {
        const response = await getChannel({type: 'sms'});
        const data = response._items;
        if (!data.length) return false;
        const info = data[0];
        this.form = _.pick(info, Object.keys(this.form));
        this.info_id = info.id

      },
      saveSms() {
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
