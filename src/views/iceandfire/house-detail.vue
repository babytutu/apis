<template>
  <div>
    <tui-card :title="detail.name"
              v-if="detail.name">
      <tui-cell title="region">
        <template slot="right">{{detail.region}}</template>
      </tui-cell>
      <tui-cell title="words" v-if="detail.words">
        <template slot="right">{{detail.words}}</template>
      </tui-cell>
      <tui-cell title="culture" v-if="detail.culture">
        <template slot="right">{{detail.culture}}</template>
      </tui-cell>
      <tui-cell title="coatOfArms" v-if="detail.coatOfArms">
        <template slot="right">{{detail.coatOfArms}}</template>
      </tui-cell>
      <tui-cell title="currentLord" v-if="detail.currentLord">
        <template slot="right">
          <router-link :to="`/iceandfire/${detail.currentLord.replace(iceandfire, '')}`">
            <tui-button type="small">{{detail.currentLord | name(iceandfire)}}</tui-button>
          </router-link>
        </template>
      </tui-cell>
      <tui-cell title="overlord"
                v-if="detail.overlord">
        <template slot="right">
          <router-link :to="`/iceandfire/${detail.overlord.replace(iceandfire, '')}`">
            <tui-button type="small">{{detail.overlord | name(iceandfire)}}</tui-button>
          </router-link>
        </template>
      </tui-cell>
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
    this.getDetail(this.id)
  },
  methods: {
    getDetail(id) {
      this.$loading(this.$t('loading'))
      this.http.get(`${iceandfire}houses/${id}`).then(res => {
        this.detail = res
        this.$loading.hide()
      })
    },
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.getDetail(to.params.id)
    next()
  },
}
</script>