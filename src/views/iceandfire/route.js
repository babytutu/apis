import entry from './../App.vue'

export default {
  path: '/iceandfire',
  component: entry,
  children: [
    {
      path: ':type',
      name: 'iceandfire-list',
      component: () => import('./list.vue'),
      meta: {
        title: 'iceandfire'
      }
    },
    {
      path: 'books/:id',
      name: 'iceandfire-book-detail',
      component: () => import('./book-detail.vue'),
      meta: {
        title: 'book'
      }
    },
    {
      path: 'characters/:id',
      name: 'iceandfire-character-detail',
      component: () => import('./character-detail.vue'),
      meta: {
        title: 'character'
      }
    },
    {
      path: 'houses/:id',
      name: 'iceandfire-house-detail',
      component: () => import('./house-detail.vue'),
      meta: {
        title: 'house'
      }
    }
  ]
}