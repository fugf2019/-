import Layout from '@/components/Layout'

const recipientRouter = {
  path: '/recipient',
  component: Layout,
  name: 'Recipient',
  meta: {
    title: '收件人管理',
    icon: 'person',
  },
  children: [
    {
      path: 'email',
      component: () => import('@/views/recipient/email'),
      name: 'RecipientEmail',
      meta: {
        title: '邮件用户',
        icon: 'list'
      }
    },
    {
      path: 'sms',
      component: () => import('@/views/recipient/sms'),
      name: 'RecipientSms',
      meta: {
        title: '短信用户',
        icon: 'list-rich'
      }
    },
    {
      path: 'wx',
      component: () => import('@/views/recipient/wx'),
      name: 'RecipientWx',
      meta: {
        title: '微信用户',
        icon: 'link'
      },
    },
  ]
};

export default recipientRouter
