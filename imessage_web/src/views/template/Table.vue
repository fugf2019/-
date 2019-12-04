<template>
  <div>
    <el-row v-if="is_admin">
      <el-button type='primary' icon="el-icon-plus" @click="cuTemplateInfo('')">创 建
      </el-button>
      <el-button type='danger' icon="el-icon-delete" :disabled="!selectedCustomer.length"
                 @click="deleteTemplate(selectedCustomer)">删 除
      </el-button>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column>
          <el-table-column prop="number" label="编号" width="130"></el-table-column>
          <el-table-column prop="channel.type" label="渠道" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.channel.type === 'sms'">短信</span>
              <span v-else-if="scope.row.channel.type === 'email'">邮件</span>
              <span v-else>微信</span>
            </template>
          </el-table-column>

          <el-table-column prop="sms_sign" label="短信签名" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.sms_sign">{{scope.row.sms_sign}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>

          <el-table-column prop="subject" label="邮件标题" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.subject">{{scope.row.subject}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>

          <el-table-column label="模板信息" align="center">
            <el-table-column prop="template_code" label="模板Code">
              <template slot-scope="scope">
                <span v-if="scope.row.template_code">{{scope.row.template_code}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column prop="format" label="模板格式"></el-table-column>
          </el-table-column>

          <el-table-column label="操作" align="right" width="150" v-if="is_admin">
            <template slot-scope="scope">
              <el-button type="text" @click="cuTemplateInfo(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteTemplate(scope.row)">删除</el-button>
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

    <template-dialog ref="template_dialog" @getTemplateList="toGetTemplateList"></template-dialog>
  </div>
</template>

<script>
  import {
    getIdFormArray
  } from '@/utils'
  import {deleteTemplateInfo} from '@/api/template'
  import TemplateDialog from './TemplateDialog'

  import _ from 'lodash'

  export default {
    name: "ListTable",
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
      TemplateDialog,
    },
    data() {
      return {
        loading: this.listLoading,

        selectedCustomer: [],

        is_admin: this.$store.getters.username === 'admin'
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.selectedCustomer = getIdFormArray(val, 'id');
      },
      deleteTemplate(row) {
        this.$confirm('此操作将永久删除模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const data = _.isArray(row) ? row : [row.id];

          this.loading = true;
          for (const id_ of data) {
            await deleteTemplateInfo(id_)
          }
          this.loading = false;
          this.$message.success('删除成功');
          this.$emit('getTemplateList')

        }).catch(() => this.loading = false);
      },

      toGetTemplateList() {
        this.$emit('getTemplateList')
      },

      handleSizeChange(params_limit) {
        this.pageQuery.max_results = params_limit;
        this.$emit('getTemplateList')
      },
      handleCurrentChange(params_page) {
        this.pageQuery.page = params_page;
        this.$emit('getTemplateList')
      },

      cuTemplateInfo(row) {
        this.$refs.template_dialog.showTemplateDialog(row);
      },


    }
  }
</script>

<style>
  .span-hover:hover {
    text-decoration: underline;
  }
</style>
