<template>
  <div>
    <tui-cell :title="date"></tui-cell>
    <h1>{{detail.title}}</h1>
    <tui-cell :title="detail.author">
      <div class="button" slot="right" v-if="detail.date">
        <router-link :to="{
          name: 'story-list',
          params: {
            date: detail.date.prev
          }
        }">
          {{$t('story.prev')}}
        </router-link>
        <router-link v-if="showNext"
                    :to="{
          name: 'story-list',
          params: {
            date: detail.date.next
          }
        }">
          {{$t('story.next')}}
        </router-link>
      </div>
    </tui-cell>
    <div class="detail" v-html="detail.content">
    </div>
  </div>
</template>
<script>
import {story} from 'src/apis'

export default {
  data() {
    return {
      detail: {},
      showNext: false,
      date: this.$route.params.date
    }
  },
  created() {
    this.getNew(this.date)
  },
  watch: {
    $route(val) {
      this.date = val.params.date
      this.getNew(this.date)
    }
  },
  methods: {
    getNew(date) {
      this.$loading(this.$t('loading'))
      this.showNext = date !== this.todayDate
      this.http.get(`${story}/article/day?dev=1&date=${date}`).then(res => {
        this.detail = res.data
        this.$loading.hide()
      })
    }
  },
}
</script>
<style lang="stylus"
       scoped>
p
  padding-top 10px
  line-height 1.5
.button
  display flex
  justify-content flex-end
  a
    margin 10px 0 10px 10px
    padding 0 10px
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    text-align: center;

</style>