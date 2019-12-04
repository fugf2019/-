<template>
  <div>
    <panel-title title="系统设置"></panel-title>


    <el-row :gutter="20">
      <el-col :lg="12" :sm="24" style="margin-bottom: 20px">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>消息频率信息</span>
            <span class="text-warning pull-right"
                  style="font-size: 12px; position: relative; top: 15px">注：不设置默认每天发送不上线</span>
          </div>
          <div style="height: 350px;" class="base-info">
            <el-form :model="form" ref="form" label-width="120px">

              <el-form-item label="邮件每天发送次数:" prop="email_number">
                <el-input v-model.number="form.email_number" type="number" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="短信每天发送次数:" prop="sms_number">
                <el-input v-model.number="form.sms_number" type="number" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="微信每天发送次数:" prop="wx_number">
                <el-input v-model.number="form.wx_number" type="number" style="width: 250px"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="saveChannel">保 存</el-button>
              </el-form-item>

            </el-form>
          </div>
        </el-card>
      </el-col>


      <el-col :lg="12" :sm="24" style="margin-bottom: 20px">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>行业设置</span>
            <span class="text-warning pull-right"
                  style="font-size: 12px; position: relative; top: 15px">注：与微信模板挂钩, 每个月只能更换一次</span>
          </div>
          <div style="height: 350px;" class="base-info">
            <el-form :model="industryForm" ref="industryForm" :rules="industryRules" label-width="120px">

              <el-form-item label="所属行业1:" prop="industry_type_01">
                <el-select v-model="first_1" placeholder="请选择" @change="changeFirst1">
                  <el-option
                    v-for="(vulue, key) in industryTypes"
                    :key="key"
                    :label="key"
                    :value="key">
                  </el-option>
                </el-select>
                <el-select v-model="industryForm.industry_type_01" placeholder="请选择">
                  <el-option
                    v-for="item in sec_1"
                    :key="item.name"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属行业2:" prop="industry_type_02">
                <el-select v-model="first_2" placeholder="请选择" @change="changeFirst2">
                  <el-option
                    v-for="(vulue, key) in industryTypes"
                    :key="key"
                    :label="key"
                    :value="key">
                  </el-option>
                </el-select>
                <el-select v-model="industryForm.industry_type_02" placeholder="请选择">
                  <el-option :disabled="industryForm.industry_type_01 === item.value"
                             v-for="item in sec_2"
                             :key="item.name"
                             :label="item.name"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveIndustry">保 存</el-button>
              </el-form-item>

            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'

  import waves from '@/directive/waves/index'

  import {Loading} from 'element-ui'
  import {getChannel, updateChannel, getIndustryType} from '@/api/channel'


  export default {
    name: 'Dashboard',
    directives: {
      waves
    },
    components: {
      PanelTitle
    },
    computed: {},
    data() {
      return {
        form: {
          email_number: null,
          sms_number: null,
          wx_number: null,
        },

        email_id: null,
        sms_id: null,
        wx_id: null,

        industryForm: {
          industry_type_01: null,
          industry_type_02: null,
        },
        industryRules: {
          industry_type_01: [
            {required: true, message: '请选择所属行业1', trigger: 'blur'},
          ],
          industry_type_02: [
            {required: true, message: '请选择所属行业2', trigger: 'blur'},
          ],
        },

        industryTypes: {},

        first_1: null,
        first_2: null,
        sec_1: [],
        sec_2: [],

      }
    },
    async created() {
      await this.getIndustryTypeList();
      await this.getChannelList();

    },
    methods: {
      // ----------------- 特效 -------------
      changeFirst1(val) {
        this.industryForm.industry_type_01 = null;
        this.sec_1 = this.industryTypes[val] || [];
      },
      changeFirst2(val) {
        this.industryForm.industry_type_02 = null;
        this.sec_2 = this.industryTypes[val] || [];
      },


      // -------------------------------------

      async getIndustryTypeList() {
        const response = await getIndustryType();
        const data = response._items;
        for (const info of data) {
          if (!this.industryTypes[info['industry_first']] || !this.industryTypes[info['industry_first']].length) {
            this.industryTypes[info['industry_first']] = [{
              name: info['industry_secondary'],
              value: info['id']
            }]
          } else {
            this.industryTypes[info['industry_first']].push({
              name: info['industry_secondary'],
              value: info['id']
            })
          }
        }
        console.log(this.industryTypes);
      },

      async getChannelList() {
        const embedded = {
          industry_type: true
        };
        const response = await getChannel({}, embedded);
        const data = response._items;
        const email = data.filter(value => value.type === 'email');
        if (email.length) {
          this.form.email_number = email[0].number;
          this.email_id = email[0].id;
        }

        const sms = data.filter(value => value.type === 'sms');
        if (sms.length) {
          this.form.sms_number = sms[0].number;
          this.sms_id = sms[0].id;
        }

        const weixin = data.filter(value => value.type === 'weixin');
        if (weixin.length) {
          this.form.wx_number = weixin[0].number;
          this.wx_id = weixin[0].id;

          const industry_type = weixin[0].industry_type;
          this.first_1 = industry_type[0].industry_first;
          this.changeFirst1(this.first_1);
          this.industryForm.industry_type_01 = industry_type[0].id;

          this.first_2 = industry_type[1].industry_first;
          this.changeFirst2(this.first_2);
          this.industryForm.industry_type_02 = industry_type[1].id;
        }
      },

      // 设置 每天 发送 次数
      async saveChannel() {
        let loading = Loading.service({text: '更新中...'});
        if (this.email_id) {
          await updateChannel(this.email_id, {number: this.form.email_number || null})
        } else {
          this.$message.error('请先配置邮件')
        }

        if (this.sms_id) {
          await updateChannel(this.sms_id, {number: this.form.sms_number || null})
        } else {
          this.$message.error('请先配置短信')
        }


        if (this.wx_id) {
          await updateChannel(this.wx_id, {number: this.form.wx_number || null})
        } else {
          this.$message.error('请先配置微信')
        }

        loading.close();
        if (!this.email_id && !this.sms_id && !this.wx_id) return false;
        await this.getChannelList();
        this.$message.success('更新成功');
      },

      // 保存 行业设置
      saveIndustry() {
        this.$refs['industryForm'].validate(async (valid) => {
          if (!valid) return false;

          const loading = Loading.service({text: '更新中...'});

          if (!this.wx_id) {
            this.$message.error('请先配置微信')
          } else {
            try {
              await updateChannel(this.wx_id, {
                industry_type: [
                  this.industryForm.industry_type_01,
                  this.industryForm.industry_type_02
                ]
              })
            } catch (e) {
              loading.close();
              return
            }
          }

          loading.close();
          this.$message.success('更新成功');
        });
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .base-info {
    .el-form-item__label {
      font-size: 14px;
    }

    .control {
      font-weight: normal;
      font-size: 14px;
      color: #666;
      position: relative;
      top: 7px;
      margin-bottom: 10px;
      width: 100px;

      &.small {
        font-size: 12px;
      }
    }

    .normal {
      font-size: 14px;
      position: relative;
      top: 7px;
      left: 15px;

      &.small {
        font-size: 12px;
      }
    }
  }

</style>

