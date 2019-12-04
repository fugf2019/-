<template>
  <div>
    <el-row>
      <el-button type='primary' icon="el-icon-plus" @click="cuUser('')" v-if="module !== 'reviewing'">创 建
      </el-button>
      <el-button type='danger' icon="el-icon-delete" :disabled="!selectedOtherStock.length"
                 @click="deleteUsers(selectedOtherStock)">删 除
      </el-button>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="username" label="用户名" sortable width="130"></el-table-column>
          <el-table-column prop="login_ip" label="登录IP" sortable width="130"></el-table-column>
          <el-table-column prop="login_time" label="登录时间" sortable width="150"></el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>


          <el-table-column label="操作" align="right" width="150">
            <template slot-scope="scope">
              <div>
                <el-button type="text" @click="reviewUser(scope.row)" v-if="module === 'reviewing'">审核</el-button>

                <el-button type="text" @click="cuUser(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteUsers(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination :current-page="pageQuery.page" :page-sizes="[10,20,30, 40]" :page-size="pageQuery.max_results"
                       :total="total" background layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
      </el-col>
    </el-row>

    <users-dialog ref="users_dialog" @getUserList="toGetUserList"></users-dialog>
  </div>
</template>

<script>
  import {
    getIdFormArray
  } from '@/utils'
  import {deleteUser, updateUser} from '@/api/users/users'
  import UsersDialog from './UsersDialog'

  import _ from 'lodash'

  export default {
    name: "Table",
    props: {
      data: {
        type: Array,
        required: true
      },
      module: {
        type: String,
      },
      total: {
        type: Number,
        required: true,
        default: 0
      },
      pageQuery: {
        type: Object,
        required: true
      },
      listLoading: {
        type: Boolean,
        default: true
      },
    },
    watch: {
      listLoading(val) {
        this.loading = val;
      },
    },
    components: {
      UsersDialog
    },
    data() {
      return {
        loading: this.listLoading,

        selectedOtherStock: [],
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.selectedOtherStock = getIdFormArray(val, 'id');
      },
      reviewUser(row) {
        this.$confirm('用户信息正确?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await updateUser(row.id, {is_reviewed: true});
          this.loading = false;
          this.$message.success('审核成功');
          this.$emit('getUserList')

        }).catch(() => this.loading = false);
      },

      deleteUsers(row) {
        this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const data = _.isArray(row) ? row : [row.id];

          this.loading = true;
          for (const id_ of data) {
            await deleteUser(id_)
          }
          this.loading = false;
          this.$message.success('删除成功');
          this.$emit('getUserList')

        }).catch(() => this.loading = false);
      },

      toGetUserList() {
        this.$emit('getUserList')
      },

      handleSizeChange(params_limit) {
        this.pageQuery.max_results = params_limit;
        this.$emit('getUserList')
      },
      handleCurrentChange(params_page) {
        this.pageQuery.page = params_page;
        this.$emit('getUserList')
      },
      cuUser(row) {
        this.$refs.users_dialog.showUserDialog(row);
      }


    }
  }
</script>

<style>

</style>
