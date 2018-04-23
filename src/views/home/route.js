import entry from './../App.vue'

export default {
  path: '',
  component: entry,
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('./home.vue'),
      meta: {
        title: 'home'
      }
    }
  ]
}