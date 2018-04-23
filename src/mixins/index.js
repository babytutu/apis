import IS_DEBUG from './../util/env'

const todayDate = new Date().format("yyyyMMdd")

export default {
  computed: {
    // 所有组件都能拿到
    IS_DEBUG() {
      return IS_DEBUG
    },
  },
  data() {
    return {
      todayDate,
    }
  },

  methods: {
  },
}
