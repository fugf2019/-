import Layout from '@/components/Layout'

const testRouter = {
  path: '/test',
  component: Layout,
  children: [
    {
      path: 'message',
      component: () => import('@/views/test'),
      name: 'TestMessage',
      meta: {
        title: '业务测试',
        icon: 'key',
      }
    },
  ]
};


export default testRouter
