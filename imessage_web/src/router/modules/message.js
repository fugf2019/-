import Layout from '@/components/Layout'

const messageRouter = {
  path: '/message',
  component: Layout,
  children: [
    {
      path: 'list',
      component: () => import('@/views/message'),
      name: 'MessageList',
      meta: {
        title: '消息管理',
        icon: 'comment-square',
      }
    },
  ]
};


export default messageRouter
