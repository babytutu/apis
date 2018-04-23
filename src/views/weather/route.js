import entry from './../App.vue'

export default {
  path: '/weather',
  component: entry,
  children: [
    {
      path: '',
      name: 'weather-list',
      component: () => import('./list.vue'),
      meta: {
        title: 'weather',
      },
    }
  ]
}