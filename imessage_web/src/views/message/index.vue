<template>
  <div>
    <panel-title title="消息管理"></panel-title>

    <filter-table @filterMessage="filterMessage"></filter-table>
    <message-table :data="data"
                   :page-query="listQuery.pageQuery"
                   :total="total"
                   :list-loading="listLoading"
                   @getMessageList="getMessageList"></message-table>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import FilterTable from './FilterTable'
  import MessageTable from './Table'

  import {transformFilter} from '@/utils'

  import {getMessage} from '@/api/message'

  export default {
    name: "index",
    components: {
      PanelTitle,
      FilterTable,
      MessageTable
    },
    data() {
      return {
        listQuery: {
          argsQuery: {},
          pageQuery: {
            page: 1,
            max_results: 10
          },
        },

        data: [],
        total: 0,
        listLoading: true
      }
    },
    created() {
      this.getMessageList()
    },
    methods: {
      filterMessage(argsQuery) {
        this.listQuery.pageQuery.page = 1;
        this.listQuery.argsQuery = argsQuery;
        this.getMessageList();
      },
      async getMessageList() {
        const embedded = {
          channel: true,
          template: true,
          message_log: true,
        };

        const params = {...this.listQuery};
        params.argsQuery = transformFilter(params.argsQuery, 'time');

        const sorts = '-time';
        const response = await getMessage(params, embedded, sorts);
        this.data = response._items;
        this.total = response._meta.total;
        this.listLoading = false;
      }

    }

  }
</script>

<style scoped>

</style>
