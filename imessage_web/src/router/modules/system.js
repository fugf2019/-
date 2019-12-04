import Layout from '@/components/Layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  children: [
    {
      path: 'setting',
      component: () => import('@/views/system'),
      name: 'TestMessage',
      meta: {
        title: '系统设置',
        icon: 'code',
      }
    },
  ]
};


export default systemRouter
