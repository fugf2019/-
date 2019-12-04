<template>
  <el-row>
    <el-col :span="24">
      <el-form ref="form">
        <el-input placeholder="请输入内容" v-model="listQuery.selInfo" class="input-with-select" clearable
                  style="width: 350px">
          <el-select v-model="listQuery.selType" slot="prepend" placeholder="请选择">
            <el-option label="编号" value="number"></el-option>
            <el-option label="模板Code" value="template_code"></el-option>
          </el-select>
        </el-input>

        <el-button v-waves type="primary" @click="handleFilter" style="margin-left: 10px">查询</el-button>
        <el-button v-waves @click="resetFilter" style="margin-left: 4px">重置</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import waves from '@/directive/waves/index'
  import {resetForm} from '@/utils'

  export default {
    name: "FilterListTable",
    directives: {
      waves
    },
    data() {
      return {
        listQuery: {
          selInfo: '',
          selType: ''
        },
      }
    },
    methods: {
      resetFilter() {
        this.listQuery = resetForm(this.listQuery);
      },
      handleFilter() {
        const query = {};
        if (this.listQuery.selType && this.listQuery.selInfo)
          query[this.listQuery.selType] = `like(\"%25${this.listQuery.selInfo}%25\")`;

        this.$emit('filters', query)
      },
    }
  }
</script>

<style scoped>

</style>
