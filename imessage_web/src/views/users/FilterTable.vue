<template>
  <el-row>
    <el-col :span="24">
      <el-input v-model="argsQuery.username" placeholder="用户" clearable style="width: 150px"></el-input>
      <el-input v-model="argsQuery.company" placeholder="公司" clearable style="width: 150px"></el-input>
      <el-input v-model="argsQuery.position" placeholder="职位" clearable style="width: 150px"></el-input>

      <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查 询</el-button>
    </el-col>
  </el-row>
</template>

<script>
  import waves from '@/directive/waves/index'
  import {resetForm} from '@/utils'

  export default {
    name: "FilterTable",
    directives: {waves},
    props: ['module'],
    data() {
      return {
        argsQuery: {
          username: null,
          company: null,
          position: null,
        }
      }
    },
    watch: {
      module() {
        this.argsQuery = resetForm(this.argsQuery);
      }
    },
    methods: {
      handleFilter() {
        const params = {};
        if (this.argsQuery.username) {
          params['username'] = `like(\"%25${this.argsQuery.username}%25\")`;
        }
        if (this.argsQuery.company) {
          params['company'] = `like(\"%25${this.argsQuery.company}%25\")`;
        }
        if (this.argsQuery.position) {
          params['position'] = `like(\"%25${this.argsQuery.position}%25\")`;
        }
        this.$emit('filterUsers', params)
      }
    }
  }
</script>
