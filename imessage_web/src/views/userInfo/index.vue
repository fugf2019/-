<template>
  <div>
    <panel-title title="个人信息"></panel-title>

    <el-row>
      <el-col :span="8">
        <fieldset>
          <h5 style="margin-bottom: 10px; font-size: 13px">基本信息</h5>

          <el-form :model="baseForm" :rules="baseRules" ref="baseForm" label-width="120px">
            <el-form-item label="账号名:">
              <span>{{userInfo.username}}</span>
            </el-form-item>
            <el-form-item label="token:">
              <span>{{userInfo.token}}</span>
            </el-form-item>
          </el-form>
        </fieldset>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import {getUserInfo, updateUser} from '@/api/users/users'
  import _ from 'lodash'
  import waves from '@/directive/waves'

  import {getEnumName} from '@/utils'

  export default {
    name: "index",
    components: {
      PanelTitle
    },
    directives: {
      waves
    },
    data() {
      return {
        userInfo: {},
        baseForm: {
          desc: null,
        },
        baseRules: {
          // nickname: {required: true, message: '请输入用户昵称', trigger: ['blur', 'change']},
        }
      }
    },
    created() {
      this.getUserInfo(this.$store.getters.userId);
    },
    methods: {
      getEnumName,
      getUserInfo(user_id) {
        this.getUser(user_id).then(response => {
          this.userInfo = response;
          this.baseForm = _.pick(response, Object.keys(this.baseForm));
        })
      },

      async getUser(user_id) {
        return await getUserInfo(user_id)
      },
    }
  }
</script>

<style scoped>

</style>
