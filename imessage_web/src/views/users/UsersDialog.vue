<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="40%" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="pull-left">
        <div class="div_title">
          <span>用户信息</span>
        </div>
      </div>
    </el-row>

    <el-row>
      <el-col :span="20">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">

          <el-form-item label="账号:" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色:" prop="role" v-if="form.username !== 'admin'">
            <el-select v-model="form.role">
              <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司名:" prop="company">
            <el-input v-model="form.company"></el-input>
          </el-form-item>
          <el-form-item label="职位:" prop="position">
            <el-input v-model="form.position"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" v-if="show_password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword" v-if="show_password">
            <el-input type="password" v-model="form.checkPassword"></el-input>
          </el-form-item>

          <el-form-item label="描述:" prop="desc">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.desc"></el-input>
          </el-form-item>

        </el-form>
      </el-col>


    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="updateUserInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import _ from 'lodash'
  import {
    updateUser,
    createUser,
  } from '@/api/users/users'
  import {getRoles} from '@/api/users/role'


  export default {
    name: "UsersDialog",
    props: {
      module: {
        type: String,
        default: 'is_reviewed'
      }
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (this.show_password) {
          if (!value) callback(new Error('请输入密码'));
          if (this.form.checkPassword !== '') this.$refs.form.validateField('checkPassword');
          callback();
        }

      };
      const validatePass2 = (rule, value, callback) => {
        if (this.show_password) {
          if (!value) callback(new Error('请再次输入密码'));
          if (value !== this.form.password) callback(new Error('两次输入密码不一致!'));
          callback();
        }
      };

      return {
        dialog: {
          title: '',
          visible: false,
        },
        roles: [],

        form: {
          username: null,
          name: null,
          role: null,
          desc: null,
          company: null,
          position: null,
          password: null,
          checkPassword: null,
          is_reviewed: true
        },

        info_id: null,
        show_password: true,


        rules: {
          username: [
            {required: true, message: '请输入账户', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          password: [
            {validator: validatePass, required: true, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: validatePass2, required: true, trigger: 'blur'}
          ],
          role: [{required: true, message: '请输入角色', trigger: 'blur'}],
        }
      }
    },
    methods: {
      getRolesList() {
        getRoles().then(response => {
          this.roles = response._items;
        })
      },

      showUserDialog(row = null) {
        this.dialog.visible = true;
        this.dialog.title = row ? `更新用户 【${row.nickname}】` : '创建用户';
        this.show_password = !Boolean(row);

        this.getRolesList();

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

      updateUserInfo() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;
          const params = {...this.form};
          delete params['checkPassword'];

          if (this.info_id) {
            await updateUser(this.info_id, params);
          } else {
            const resp = await await createUser(params);
            this.info_id = resp.id;
          }
          this.$message.success('更新成功');
          this.dialog.visible = false;
          this.$emit('getUserList');
        });
      }
    }
  }
</script>

<style scoped>

</style>
