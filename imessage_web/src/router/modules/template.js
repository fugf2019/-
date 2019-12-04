import Layout from '@/components/Layout'

const templateRouter = {
  path: '/template',
  component: Layout,
  children: [
    {
      path: 'list',
      component: () => import('@/views/template'),
      name: 'TemplateList',
      meta: {
        title: '模板管理',
        icon: 'document',
      }
    },
  ]
};


export default templateRouter
