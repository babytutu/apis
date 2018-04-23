<template>
  <div>
    <tui-cell :title="$t(`nav.${type}`)"></tui-cell>
    <tui-cell v-for="{ name, url } in list"
              :key="url"
              :title="name">
              <router-link :to="`/iceandfire/${url.replace(iceandfire, '')}`">{{name}}</router-link>
    </tui-cell>
  </div>
</template>
<script>
import {
  iceandfire
} from 'src/apis'

export default {
  data() {
    return {
      iceandfire,
      type: this.$route.params.type,
      list: [],
    }
  },
  created() {
    this.$loading(this.$t('loading'))
    this.http.get(`${iceandfire}${this.type}s`).then(res => {
      this.list = res
      this.$loading.hide()
    })
  }
}
</script>