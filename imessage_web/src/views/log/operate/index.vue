<template>
  <div>
    <panel-title title="操作日志"></panel-title>

    <el-row>
      <el-col :span="24">
        <FilterTable @filterLog="filterLog" @getOperateLogList="getOperateLogList"></FilterTable>
        <tc-table :data="data"
                  :page-query="listQuery.pageQuery"
                  :total="total"
                  :list-loading="listLoading"
                  @getOperateLogList="getOperateLogList"></tc-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import FilterTable from './FilterTable'
  import TcTable from './Table'

  import {transformFilter} from '@/utils'


  import {getOperateLog} from '@/api/log/operate'

  export default {
    name: "index",
    components: {
      PanelTitle,
      FilterTable,
      TcTable
    },
    data() {
      return {
        data: [],

        listLoading: true,
        total: 0,
        listQuery: {
          argsQuery: {},
          pageQuery: {
            page: 1,
            max_results: 10
          },
        }
      }
    },
    created() {
      this.getOperateLogList();
    },
    methods: {
      filterLog(argsQuery) {
        this.listQuery.pageQuery.page = 1;
        this.listQuery.argsQuery = argsQuery;
        this.getOperateLogList();
      },

      async getOperateLogList() {
        const params = {...this.listQuery};
        params.argsQuery = transformFilter(params.argsQuery, 'time');

        const sorts = '-time';

        const response = await getOperateLog(params, {}, sorts);
        this.data = response._items;
        this.total = response._meta.total;
        this.listLoading = false;
      }
    }
  }
</script>

<style scoped>

</style>
