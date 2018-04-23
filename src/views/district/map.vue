<template>
  <iframe :src="`//uri.amap.com/marker?position=${query.position}&name=${query.name}&src=&coordinate=&callnative=0`" frameborder="0"></iframe>
</template>
<script>
export default {
  data() {
    return {
      query: this.$route.query
    }
  },
}
</script>

<style lang="stylus">
iframe
  width 100%
  height calc(100% + 46px)
  position absolute
  top -46px
</style>
