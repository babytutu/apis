<template>
  <div v-if="detail.name">
    <tui-card :title="detail.name">
      <tui-cell title="author">
        <template slot="right">{{detail.authors | title}}</template>
      </tui-cell>
      <tui-cell title="mediaType">
        <template slot="right">{{detail.mediaType}}</template>
      </tui-cell>
      <tui-cell title="numberOfPages">
        <template slot="right">{{detail.numberOfPages}}</template>
      </tui-cell>
      <tui-cell title="publisher">
        <template slot="right">{{detail.publisher}}</template>
      </tui-cell>
      <tui-cell title="released">
        <template slot="right">{{detail.released}}</template>
      </tui-cell>
    </tui-card>
    <tui-card title="povCharacters" v-if="detail.povCharacters.length">
      <div class="detail">
        <router-link v-for="pov in detail.povCharacters"
                    :key="pov"
                    class="char"
                    :to="`/iceandfire/${pov.replace(iceandfire, '')}`">
          <tui-button type="warning">
            {{pov | name(iceandfire) | name('characters/')}}
          </tui-button>
        </router-link>
      </div>
    </tui-card>
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
      id: this.$route.params.id,
      detail: {},
    }
  },
  created() {
    this.$loading(this.$t('loading'))
    this.http.get(`${iceandfire}books/${this.id}`).then(res => {
      this.detail = res
      this.$loading.hide()
    })
  }
}
</script>
<style lang="stylus" scoped>
.detail
  display flex
  flex-wrap: wrap;
  .char
    margin 5px
    width calc(100%/5 - 10px)
</style>
