<template>
  <div>
    <h1>{{$t('choose')}}</h1>
    <tui-radio :options="langs"
               :alias="['label', 'lang']"
               v-model="lang"></tui-radio>
    <h1>{{$t('list')}}</h1>
    <tui-cell v-for="{ tab, name, query, params, title } in navTabs"
              :key="tab"
              @click.native="goUrl(name, query, params)">{{title}}</tui-cell>
    <h1>{{$t('api')}}</h1>
    <div class="desc">
      <p>https://lbs.amap.com</p>
      <p>https://meiriyiwen.com</p>
      <p>https://www.anapioficeandfire.com</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lang: localStorage.getItem('lang'),
      langs: [{
          lang: 'zh',
          label: '中文',
        },
        {
          lang: 'en',
          label: 'English',
        },
      ],
    }
  },
  methods: {
    goUrl(name, query, params) {
      this.$router.push({
        name,
        query,
        params
      })
    },
  },
  computed: {
    navTabs() {
      return [{
          name: 'weather-list',
          title: this.$t('nav.weather'),
        },
        {
          name: 'district-list',
          title: this.$t('nav.search'),
        },
        {
          name: 'story-list',
          params: {
            date: this.todayDate
          },
          title: this.$t('nav.story')
        },
        {
          name: 'iceandfire-list',
          params: {
            type: 'book'
          },
          title: this.$t('nav.book'),
        },
        {
          name: 'iceandfire-list',
          params: {
            type: 'house'
          },
          title: this.$t('nav.house'),
        }
      ]
    }
  },
  created() {
    this.debug(this, 1, 2,3)
    this.info(1, 2 ,3)
    this.error(3)
    this.warn(4)
    console.log(1)
  },
  watch: {
    lang(val) {
      this.$i18n.locale = val
      localStorage.setItem('lang', val)
    }
  }
}
</script>