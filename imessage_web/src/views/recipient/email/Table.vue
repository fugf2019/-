<template>
  <div>
    <el-row>
      <el-button type='primary' icon="el-icon-plus" @click="cuRecipient('')">创 建
      </el-button>
      <el-button type='danger' icon="el-icon-delete" :disabled="!selectedOtherStock.length"
                 @click="deleteRecipients(selectedOtherStock)">删 除
      </el-button>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column>
          <el-table-column prop="nickname" label="昵称" sortable width="130"></el-table-column>
          <el-table-column prop="phone" label="电话" sortable width="150"></el-table-column>
          <el-table-column prop="email" label="邮件" sortable width="150"></el-table-column>
          <el-table-column prop="company" label="公司" width="180"></el-table-column>
          <el-table-column prop="position" label="职位" width="150"></el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>


          <el-table-column label="操作" align="right" width="150">
            <template slot-scope="scope">
              <div>
                <el-button type="text" @click="cuRecipient(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteRecipients(scope.row)">删除</el-button>
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

    <recipient-dialog ref="recipient_dialog" type="email" @getRecipientList="toGetRecipientList"></recipient-dialog>
  </div>
</template>

<script>
  import {
    getIdFormArray
  } from '@/utils'
  import {deleteRecipientInfo} from '@/api/recipient'
  import RecipientDialog from '../RecipientDialog'

  import _ from 'lodash'

  export default {
    name: "Table",
    props: {
      data: {
        type: Array,
        required: true
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
      RecipientDialog
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
      deleteRecipients(row) {
        this.$confirm('此操作将永久删除收件人, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const data = _.isArray(row) ? row : [row.id];

          this.loading = true;
          for (const id_ of data) {
            await deleteRecipientInfo(id_)
          }
          this.loading = false;
          this.$message.success('删除成功');
          this.$emit('getRecipientList')

        }).catch(() => this.loading = false);
      },

      toGetRecipientList() {
        this.$emit('getRecipientList')
      },

      handleSizeChange(params_limit) {
        this.pageQuery.max_results = params_limit;
        this.$emit('getRecipientList')
      },
      handleCurrentChange(params_page) {
        this.pageQuery.page = params_page;
        this.$emit('getRecipientList')
      },
      cuRecipient(row) {
        this.$refs.recipient_dialog.showRecipientDialog(row);
      }


    }
  }
</script>

<style>

</style>
