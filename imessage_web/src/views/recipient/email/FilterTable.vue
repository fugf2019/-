<template>
  <el-row>
    <el-col :span="24">
      <el-input v-model="argsQuery.nickname" placeholder="昵称" clearable style="width: 150px"></el-input>
      <el-input v-model="argsQuery.phone" placeholder="电话" clearable style="width: 150px"></el-input>
      <el-input v-model="argsQuery.email" placeholder="邮件" clearable style="width: 150px"></el-input>
      <el-input v-model="argsQuery.company" placeholder="公司" clearable style="width: 150px"></el-input>

      <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查 询</el-button>
    </el-col>
  </el-row>
</template>

<script>
  import waves from '@/directive/waves/index'

  export default {
    name: "FilterTable",
    directives: {waves},
    data() {
      return {
        argsQuery: {
          nickname: null,
          phone: null,
          email: null,
          company: null,
        }
      }
    },
    methods: {
      handleFilter() {
        let params = {};
        for (const [k, v] of Object.keys(this.from)) {
          if (v) {
            params[k] = `like(\"%25${v}%25\")`;
          }
        }
        this.$emit('filterRecipient', params)
      }
    }
  }
</script>
