<template>
  <el-row>
    <el-col :span="24">
      <el-date-picker
        v-model="argsQuery.time"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd HH:mm:ss"
        :default-time="['00:00:00', '23:59:59']"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-input v-model="argsQuery.ip" placeholder="IP" clearable style="width: 150px"></el-input>

      <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查 询</el-button>
<!--      <span class="text-explode">|</span>-->
<!--      <el-button v-waves type="danger" icon="el-icon-delete" :disabled="disabled" @click="deleteLogs">删 除</el-button>-->
    </el-col>
  </el-row>
</template>

<script>
  import waves from '@/directive/waves/index'
  import {pickerOptions, resetForm, transformFilter} from '@/utils'

  import {deleteOperateLogs} from '@/api/log/operate'

  export default {
    name: "FilterTable",
    directives: {waves},
    data() {
      return {
        pickerOptions,
        disabled: true,
        argsQuery: {
          time: null,
          ip: null,
        }
      }
    },
    watch: {
      argsQuery: {
        handler(val) {
          this.disabled = !((val.time && val.time.length) || val.ip)
        },
        deep: true
      }
    },
    methods: {
      handleFilter() {
        let params = {};
        for (const [k, v] of Object.entries(this.argsQuery)) {
          if (v) {
            if (k === 'time') {
              params[k] = v;
            } else {
              params[k] = `like(\"%25${v}%25\")`;
            }
          }
        }
        this.$emit('filterLog', params)
      },

      deleteLogs() {
        this.$confirm('此操作将永久删除操作日志, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.loading = true;

          let params = {...this.argsQuery};
          params = transformFilter(params, 'time');
          if (params.ip) {
            params['ip'] = `like(\"%25${params.ip}%25\")`;
          }
          await deleteOperateLogs(params);
          this.$message.success('删除成功');
          this.$emit('getOperateLogList')

        }).catch(() => this.loading = false);
      }
    },
  }
</script>
