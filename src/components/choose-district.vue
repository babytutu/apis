<template>
  <tui-cell :title="label">
    <select slot="right"
            v-model="key"
            @change="onchange">
      <option value="">请选择</option>
      <option v-for="{ adcode, name } in options"
              :value="adcode"
              :key="adcode">{{name}}</option>
    </select>
  </tui-cell>
</template>
<script>
export default {
  props: {
    label: [String, Number],
    options: Array,
    value: [String, Number]
  },
  data() {
    return {
      key: ''
    }
  },
  created() {
    this.key = this.value
  },
  watch: {
    value(val) {
      this.key = val
    }
  },
  methods: {
    onchange(e) {
      this.$emit('input', this.key)
      this.$emit('onchange', e.target.selectedOptions[0].label)
    }
  },
}
</script>
