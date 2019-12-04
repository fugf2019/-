<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="40%" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="pull-left">
        <div class="div_title">
          <span>模板信息</span>
        </div>
      </div>
    </el-row>

    <el-row>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-col :span="20">

          <el-form-item label="编号:" prop="number">
            <el-input v-model="form.number"></el-input>
            <span class="text-warning" style="font-size: 12px">注: 微信编号 有"TM**"和"OPENTMTM**"等形式</span>
          </el-form-item>
          <el-form-item label="渠道:" prop="channel">
            <el-select v-model="form.channel" @change="changeChannel">
              <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.type_name"
                :value="item.id"
                :disabled="!item.enable">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="短信签名:" prop="sms_sign" v-if="showSign">
            <el-input v-model="form.sms_sign"></el-input>
          </el-form-item>
          <el-form-item label="邮件标题:" prop="subject" v-if="showSubject">
            <el-input v-model="form.subject"></el-input>
          </el-form-item>
          <el-form-item label="模板Code:" prop="template_code" v-if="showCode">
            <el-input v-model="form.template_code"></el-input>
          </el-form-item>
          <el-form-item label="模板格式:" prop="format" v-if="showFormat">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.format"></el-input>
          </el-form-item>
          <el-form-item label="描述:" prop="desc">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.desc"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="updateCustomerInf">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {updateTemplate, createTemplate} from '@/api/template'
  import _ from 'lodash'

  import {getChannel} from '@/api/channel'
  import {resetForm} from '@/utils'

  export default {
    name: "DepotDialog",
    data() {
      return {
        dialog: {
          title: '',
          visible: false,
        },
        form: {
          number: null,
          channel: null,
          sms_sign: null,
          subject: null,
          template_code: null,
          format: null,
          desc: null,
        },

        channels: [],

        info_id: null,
        showSign: false,
        showCode: false,
        showFormat: false,
        showSubject: false,

        rules: {
          number: [
            {required: true, message: '请输入编号', trigger: 'blur'},
          ],
          channel: [
            {required: true, message: '请选择渠道', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      changeShowHide(info) {
        this.showSign = info['type'] === 'sms';
        this.showSubject = info['type'] === 'email';
        this.showFormat = info['type'] !== 'weixin';
        this.showCode = !['weixin', 'email'].includes(info['type']);
      },

      changeChannel(value) {
        const data = this.channels.filter(val => val.id === value);
        const info = data.length ? data[0] : null;
        if (!info) {
          return
        }

        this.form.sms_sign = null;
        this.form.subject = null;
        this.form.template_code = null;
        this.form.format = null;
        this.form.desc = null;
        this.changeShowHide(info);
      },

      async getChannelList() {
        const response = await getChannel();
        this.channels = response._items;
      },

      showTemplateDialog(row = null) {
        this.dialog.visible = true;
        this.dialog.title = row ? `更新模板 【${row.number}】` : '创建模板';

        this.getChannelList();

        this.$nextTick(() => {
          if (row) {
            this.form = _.pick(row, Object.keys(this.form));
            this.$refs.form.clearValidate();
            this.info_id = row.id;
            this.form.channel = row.channel.id;

            this.changeShowHide(row.channel);
            return
          }
          this.info_id = null;
          this.form.template_code = null;
          this.showSign = false;
          this.showCode = false;
          this.showSubject = false;
          this.showFormat = false;
          this.$refs.form.resetFields();

        })
      },

      updateCustomerInf() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;

          const params = {...this.form};
          if (!this.showCode) {
            delete params['template_code'];
          }

          !this.info_id ?
            await createTemplate(params) :
            await updateTemplate(this.info_id, params);
          this.$message.success('更新成功');
          this.dialog.visible = false;
          this.$emit('getTemplateList');
        });
      }
    }
  }
</script>

<style scoped>

</style>
