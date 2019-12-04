<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit>
          <el-table-column prop="time" label="时间" sortable width="160"></el-table-column>
          <el-table-column prop="message" label="消息ID" sortable width="150"></el-table-column>
          <el-table-column prop="code" label="code" sortable width="250"></el-table-column>
          <el-table-column prop="msg" label="msg"></el-table-column>
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
  </div>
</template>

<script>
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
    data() {
      return {
        loading: this.listLoading,
      };
    },
    methods: {
      handleSizeChange(params_limit) {
        this.pageQuery.max_results = params_limit;
        this.$emit('getMessageLog')
      },
      handleCurrentChange(params_page) {
        this.pageQuery.page = params_page;
        this.$emit('getMessageLog')
      },
    }
  }
</script>

<style>

</style>
