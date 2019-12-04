<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="40%" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="pull-left">
        <div class="div_title">
          <span>收件人信息</span>
        </div>
      </div>
    </el-row>

    <el-row>
      <el-col :span="20">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">

          <el-form-item label="昵称:" prop="nickname">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>

          <el-form-item label="所属用户:" prop="user">
            <el-select v-model="form.user" placeholder="请选择">
              <el-option
                v-for="item in users"
                :key="item.id"
                :label="item.username"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="电话:" prop="phone" v-if="type === 'sms'">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="email:" prop="email" v-if="type === 'email'">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="公司名:" prop="company">
            <el-input v-model="form.company"></el-input>
          </el-form-item>
          <el-form-item label="职位:" prop="position">
            <el-input v-model="form.position"></el-input>
          </el-form-item>

          <el-form-item label="描述:" prop="desc">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.desc"></el-input>
          </el-form-item>

        </el-form>
      </el-col>


    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="updateRecipient">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import _ from 'lodash'
  import {
    updateRecipient,
    createRecipient,
  } from '@/api/recipient'

  import {getUserList} from '@/api/users/users'


  export default {
    name: "RecipientDialog",
    props: {
      type: {
        type: String,
        required: true
      }
    },
    data() {
      const validatePhone = (rule, value, callback) => {
        let error = new Error('手机号必须填写');
        this.type === 'sms' && !value ? callback(error) : callback();
      };
      const validateEmail = (rule, value, callback) => {
        if (this.type === 'email' && !value) callback(new Error('邮件必须填写'));
        callback();
      };


      return {
        dialog: {
          title: '',
          visible: false,
        },

        form: {
          nickname: null,
          user: null,
          phone: null,
          email: null,
          desc: null,
          company: null,
          position: null,
        },

        info_id: null,
        users: [],


        rules: {
          nickname: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
          ],
          user: [
            {required: true, message: '请选择用户', trigger: 'blur'},
          ],
          phone: [
            {required: true, validator: validatePhone, trigger: 'blur'},
          ],
          email: [
            {required: true, validator: validateEmail, trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      async getUserList() {
        const params = {
          is_reviewed: true,
          // username: '!=admin'
        };
        const response = await getUserList(params);
        this.users = response._items;
      },

      showRecipientDialog(row = null) {
        this.dialog.visible = true;
        this.dialog.title = row ? `更新收件人 【${row.nickname}】` : '创建收件人';

        this.getUserList();

        this.$nextTick(() => {
          if (row) {
            this.form = _.pick(row, Object.keys(this.form));
            this.$refs.form.clearValidate();
            this.info_id = row.id;
            return
          }
          this.info_id = null;
          this.$refs.form.resetFields();
        })
      },

      updateRecipient() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;

          const params = {...this.form};
          if (this.type === 'email') {
            params['is_email'] = true
          } else {
            params['is_phone'] = true
          }

          if (this.info_id) {
            await updateRecipient(this.info_id, params);
          } else {
            const resp = await await createRecipient(params);
            this.info_id = resp.id;
          }
          this.$message.success('更新成功');
          this.dialog.visible = false;
          this.$emit('getRecipientList');
        });
      }
    }
  }
</script>

<style scoped>

</style>
