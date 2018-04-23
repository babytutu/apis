<template>
  <tui-layout :is-scroll="true">
    <template>
      <tui-header :title="title">
        <div slot="left" @click="back">{{$t('nav.back')}}</div>
        <div slot="right" @click="home" v-if="title !== 'home'">{{$t('nav.menu')}}</div>
      </tui-header>
    </template>
    <template slot="content">
      <router-view></router-view>
      <tui-back-to-top el="tui-warper-content">
        <div class="return">{{$t('nav.top')}}</div>
      </tui-back-to-top>
    </template>
  </tui-layout>
</template>
<script>
  export default {
    computed: {
      title() {
        const name = this.$route.meta.title || 'home'
        window.document.title = this.$t(`nav.${name}`)
        return this.$t(`nav.${name}`)
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      home() {
        this.$router.push({
          name: 'home'
        })
      }
    },
  }
</script>
<style lang="stylus" scoped>
.container{
  display flex
  flex-direction column
  &-tab{
    width 100%
    height 50px
  }
  &-content{
  }
}
.return
  position fixed
  bottom 10px
  right 10px
  border-radius: 100%;
  background: #333;
  height: 44px;
  width: 44px;
  line-height: 44px;
  opacity .5
  color #fff
  text-align center
</style>