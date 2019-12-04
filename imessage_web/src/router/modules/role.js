import Layout from '@/components/Layout'

const usersRouter = {
  path: '/user',
  component: Layout,
  meta: {
    title: '用户管理',
    icon: 'cog',
  },
  children: [
    {
      path: 'role',
      component: () => import('@/views/role/info'),
      name: 'Role',
      meta: {
        title: '权限管理',
        icon: 'key',
      }
    },
    {
      path: 'list',
      component: () => import('@/views/users'),
      name: 'UserList',
      meta: {
        title: '用户信息',
        icon: 'people',
      }
    }
  ]
};


export default usersRouter
