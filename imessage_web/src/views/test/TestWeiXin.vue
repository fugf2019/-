<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="token:" prop="token">
            <el-input v-model="form.token"></el-input>
          </el-form-item>
          <el-form-item label="模板编号:" prop="template_number">
            <el-input v-model="form.template_number"></el-input>
          </el-form-item>
          <el-form-item label="收件人:" prop="recipient">
            <el-select v-model="form.recipient" multiple>
              <el-option
                v-for="item in recipient"
                :key="item.id"
                :label="item.nickname"
                :value="item.open_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送内容:"></el-form-item>
          <json-editor ref="jsonEditor" v-model="content"/>

          <el-form-item>
            <el-button type="primary" @click="sendEmail">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import {sendMessage} from '@/api/send_message'
  import {getRecipients} from '@/api/recipient'

  import {Loading} from 'element-ui'
  import JsonEditor from '@/components/JsonEditor'


  export default {
    name: "TestWeiXin",
    components: {
      JsonEditor
    },
    data() {
      return {

        form: {
          token: null,
          template_number: null,
          channel: 'weixin',
          recipient: [],
        },

        content: {
          "content": {
            "result": "123"
          }
        },

        recipient: [],
        rules: {
          token: [{required: true, message: '请输入token', trigger: 'blur'}],
          template_number: [{required: true, message: '请输入模板编号', trigger: 'blur'}],
          recipient: [{required: true, message: '请输入收件人', trigger: 'blur'}],
        }
      }
    },
    created() {
      this.getRecipientList();
    },
    methods: {
      async getRecipientList() {
        const response = await getRecipients({is_weixin: true});
        this.recipient = response._items;
      },

      sendEmail() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;

          let loadingInstance = Loading.service({text: '发送中...'});

          let params;
          try {
            params = {
              ...this.form, ...JSON.parse(this.content)
            };
          } catch (e) {
            params = {
              ...this.form, ...this.content
            };
          }

          try {
            await sendMessage(params);
            loadingInstance.close();
            this.$message.success('发送成功');
          } catch (e) {
            loadingInstance.close();
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
