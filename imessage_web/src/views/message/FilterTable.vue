<template>
  <el-row>
    <el-col :span="24">
      <el-select v-model="argsQuery.channel" clearable placeholder="渠道">
        <el-option v-for="item in channel" :key="item.id" :label="item.type_name" :value="item.id">
        </el-option>
      </el-select>
      <el-input v-model="argsQuery.content" placeholder="发送消息参数" clearable style="width: 250px"></el-input>

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

      <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查 询</el-button>
    </el-col>
  </el-row>
</template>

<script>
  import waves from '@/directive/waves/index'
  import {getChannel} from '@/api/channel'

  import {pickerOptions} from '@/utils'


  export default {
    name: "FilterTable",
    directives: {waves},
    data() {
      return {
        channel: [],
        pickerOptions,

        argsQuery: {
          channel: null,
          content: null,
          time: [],
        }
      }
    },
    created() {
      this.getChannelList();
    },
    methods: {
      async getChannelList() {
        const response = await getChannel();
        this.channel = response._items;
      },

      handleFilter() {
        let params = {};
        for (const [k, v] of Object.entries(this.argsQuery)) {
          if (v !=null && v.length) {
            if (k === 'channel' || k === 'time') {
              params[k] = v;
            } else {
              params[k] = `like(\"%25${v}%25\")`;
            }
          }
        }
        this.$emit('filterMessage', params)
      }
    }
  }
</script>
