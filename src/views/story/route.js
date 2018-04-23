import entry from './../App.vue'

export default {
  path: '/story',
  component: entry,
  children: [
    {
      path: ':date',
      name: 'story-list',
      component: () => import('./story.vue'),
      meta: {
        title: 'story'
      }
    }
  ]
}