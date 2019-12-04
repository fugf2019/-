<template>
  <div>
    <panel-title title="短信用户"></panel-title>

    <el-row>
      <el-col :span="24">
        <FilterTable @filterRecipient="filterRecipient"></FilterTable>
        <tc-table :data="data"
                  :page-query="listQuery.pageQuery"
                  :total="total"
                  :list-loading="listLoading"
                  @getRecipientList="getRecipientList"></tc-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import FilterTable from './FilterTable'
  import TcTable from './Table'

  import {getRecipient} from '@/api/recipient'

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
      this.getRecipientList();
    },
    methods: {
      filterRecipient(argsQuery) {
        this.listQuery.pageQuery.page = 1;
        this.listQuery.argsQuery = argsQuery;
        this.getRecipientList();
      },

      async getRecipientList() {
        const params = {...this.listQuery};
        params.argsQuery['is_phone'] = true;
        const response = await getRecipient(params);
        this.data = response._items;
        this.total = response._meta.total;
        this.listLoading = false;
      }
    }
  }
</script>

<style scoped>

</style>
