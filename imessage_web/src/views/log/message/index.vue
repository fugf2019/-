<template>
  <div>
    <panel-title title="消息日志"></panel-title>

    <el-row>
      <el-col :span="24">
        <FilterTable @filterLog="filterLog" @getMessageLogList="getMessageLogList"></FilterTable>
        <tc-table :data="data"
                  :page-query="listQuery.pageQuery"
                  :total="total"
                  :list-loading="listLoading"
                  @getMessageLog="getMessageLogList"></tc-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import FilterTable from './FilterTable'
  import TcTable from './Table'

  import {transformFilter} from '@/utils'


  import {getMessageLog} from '@/api/log/message'

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
      this.getMessageLogList();
    },
    methods: {
      filterLog(argsQuery) {
        this.listQuery.pageQuery.page = 1;
        this.listQuery.argsQuery = argsQuery;
        this.getMessageLogList();
      },

      async getMessageLogList() {
        const params = {...this.listQuery};
        params.argsQuery = transformFilter(params.argsQuery, 'time');

        const sorts = '-time';

        const response = await getMessageLog(params, {}, sorts);
        this.data = response._items;
        this.total = response._meta.total;
        this.listLoading = false;
      }
    }
  }
</script>

<style scoped>

</style>
