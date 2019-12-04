<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit>
          <el-table-column prop="time" label="提交时间" sortable width="150"></el-table-column>
          <el-table-column prop="channel.type" label="渠道" sortable width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.channel.type === 'sms'">短信</span>
              <span v-else-if="scope.row.channel.type === 'email'">邮件</span>
              <span v-else>微信</span>
            </template>
          </el-table-column>
          <el-table-column prop="template.number" label="模板编号" sortable width="150"></el-table-column>

          <el-table-column prop="status" label="状态" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.message_log">
                <el-tag type="success" v-if="scope.row.message_log.code === '0' || scope.row.message_log.code === 'OK'">
                  成功
                </el-tag>
                <el-tag type="danger" v-else>失败</el-tag>
              </div>
              <div v-else>
                <el-tag type="warning">未知</el-tag>
              </div>

            </template>
          </el-table-column>

          <el-table-column prop="template.format" label="模板格式"></el-table-column>
          <el-table-column prop="content" label="发送消息内容参数"></el-table-column>
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
        this.$emit('getMessageList')
      },
      handleCurrentChange(params_page) {
        this.pageQuery.page = params_page;
        this.$emit('getMessageList')
      },
    }
  }
</script>

<style>

</style>
