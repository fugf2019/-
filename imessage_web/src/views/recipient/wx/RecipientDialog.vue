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
  } from '@/api/recipient'

  import {getUsers} from '@/api/users/users'


  export default {
    name: "RecipientDialog",
    data() {
      return {
        dialog: {
          title: '',
          visible: false,
        },

        form: {
          nickname: null,
          user: null,
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
        }
      }
    },
    methods: {
      async getUserList() {
        const params = {
          is_reviewed: true,
          // username: '!=admin'
        };
        const response = await getUsers(params);
        this.users = response._items;
      },

      showRecipientDialog(row = null) {
        this.dialog.visible = true;
        this.dialog.title = `更新收件人 【${row.nickname}】`;

        this.getUserList();

        this.$nextTick(() => {
          this.form = _.pick(row, Object.keys(this.form));
          this.$refs.form.clearValidate();
          this.info_id = row.id;
        })
      },

      updateRecipient() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;

          await updateRecipient(this.info_id, this.form);
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
