import Layout from '@/components/Layout'

const logRouter = {
  path: '/log',
  component: Layout,
  meta: {
    title: '日志管理',
    icon: 'file',
  },
  children: [
    {
      path: 'operate',
      component: () => import('@/views/log/operate'),
      name: 'LogOperate',
      meta: {
        title: '操作日志',
        icon: 'pulse',
      }
    },
    {
      path: 'message',
      component: () => import('@/views/log/message'),
      name: 'LogMessage',
      meta: {
        title: '消息日志',
        icon: 'script',
      }
    },
  ]
};


export default logRouter
