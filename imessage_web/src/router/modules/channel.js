import Layout from '@/components/Layout'

const channelRouter = {
  path: '/setting',
  component: Layout,
  name: 'Channel',
  children: [
    {
      path: 'info',
      component: () => import('@/views/channel'),
      name: 'ChannelInfo',
      meta: {
        title: '渠道管理',
        icon: 'grid-four-up'
      }
    },
  ]
};

export default channelRouter
