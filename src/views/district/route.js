import entry from './../App.vue'

export default {
  path: '/district',
  component: entry,
  children: [
    {
      path: '',
      name: 'district-list',
      component: () => import('./list.vue'),
      meta: {
        title: 'search',
      },
    },
    {
      path: 'map',
      name: 'district-map',
      component: () => import('./map.vue'),
      meta: {
        title: 'map',
      },
    },
  ]
}