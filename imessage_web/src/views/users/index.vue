<template>
  <div>
    <panel-title title="用户管理"></panel-title>

    <el-row>
      <el-col :span="24">

        <el-tabs v-model="module" type="border-card" @tab-click="changeTab">
          <el-tab-pane label="审核中" name="reviewing">
            <FilterTable :module="module" @filterUsers="filterUsers"></FilterTable>
            <tc-table :data="data"
                      :module="module"
                      :page-query="listQuery.pageQuery"
                      :total="total"
                      :list-loading="listLoading"
                      @getUserList="getUserList"></tc-table>
          </el-tab-pane>
          <el-tab-pane label="已审核" name="reviewed">
            <FilterTable :module="module" @filterUsers="filterUsers"></FilterTable>
            <tc-table :data="data"
                      :module="module"
                      :page-query="listQuery.pageQuery"
                      :total="total"
                      :list-loading="listLoading"
                      @getUserList="getUserList"></tc-table>
          </el-tab-pane>
        </el-tabs>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import FilterTable from './FilterTable'
  import TcTable from './Table'

  import {getUsers} from '@/api/users/users'

  export default {
    name: "index",
    components: {
      PanelTitle,
      FilterTable,
      TcTable
    },
    data() {

      const queryModule = this.$route.query.module;
      return {
        data: [],

        module: queryModule || 'reviewing',

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
      this.getUserList();
    },
    methods: {
      changeTab(tab) {
        this.listLoading = true;
        this.module = tab.name;
        this.$nextTick(() => {
          this.getUserList();
        })
      },

      filterUsers(argsQuery) {
        this.listQuery.pageQuery.page = 1;
        this.listQuery.argsQuery = argsQuery;
        this.getUserList();
      },

      async getUserList() {
        const params = {...this.listQuery};
        params.argsQuery['username'] = '!=admin';
        params.argsQuery['is_reviewed'] = this.module !== 'reviewing';

        const response = await getUsers(params);
        this.data = response._items;
        this.total = response._meta.total;
        this.listLoading = false;
      }
    }
  }
</script>

<style scoped>

</style>
