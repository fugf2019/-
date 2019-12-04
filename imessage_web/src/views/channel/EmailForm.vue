<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="用户名:" prop="email_username">
            <el-input v-model="form.email_username"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="email_password">
            <el-input v-model="form.email_password"></el-input>
          </el-form-item>
          <el-form-item label="服务器:" prop="email_address">
            <el-input v-model="form.email_address"></el-input>
          </el-form-item>
          <el-form-item label="端口:" prop="email_port">
            <el-input v-model.number="form.email_port" type="number"></el-input>
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
    name: "EmailForm",
    data() {
      return {
        info_id: null,

        form: {
          email_username: null,
          email_password: null,
          email_address: null,
          email_port: null,
          enable: true,
          type: 'email'
        },
        rules: {
          email_username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          email_password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          email_address: [{required: true, message: '请输入服务器', trigger: 'blur'}],
          email_port: [{required: true, message: '请输入端口', trigger: 'blur'}],
        }
      }
    },
    created() {
      this.getSmsSetting();
    },
    methods: {
      async getSmsSetting() {
        const response = await getChannel({type: 'email'});
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
