<template>
  <div>
    <panel-title title="模板管理"></panel-title>

    <filter-table @filters="filters"></filter-table>

    <template-table :data="data"
                    :page-query="listQuery.pageQuery"
                    :total="total"
                    :list-loading="listLoading"
                    @getTemplateList="getTemplateList"></template-table>

  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import FilterTable from './FilterTable'
  import TemplateTable from './Table'

  import {getTemplate} from '@/api/template'

  export default {
    name: "index",

    components: {
      PanelTitle,
      FilterTable,
      TemplateTable,
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
        depot: [],
        total: 0,
        listLoading: true
      }
    },
    created() {
      this.getTemplateList()
    },
    methods: {
      filters(argsQuery) {
        this.listQuery.pageQuery.page = 1;
        this.listQuery.argsQuery = argsQuery;
        this.getTemplateList();
      },
      async getTemplateList() {
        const embedded = {
          channel: true
        };
        const response = await getTemplate(this.listQuery, embedded);
        this.data = response._items;
        this.total = response._meta.total;
        this.listLoading = false;
      }

    }
  }
</script>

<style scoped>

</style>
