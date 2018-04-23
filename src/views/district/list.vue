<template>
  <div>
    <choose-district v-model="address.provincecode"
                     :label="$t('amap.province')"
                     :options="provinces"
                     @onchange="getProvinceName"></choose-district>
    <choose-district v-model="address.citycode"
                     :label="$t('amap.city')"
                     :options="citys"
                     @onchange="getCityName"></choose-district>
    <tui-cell :title="$t('amap.keywords')">
      <input type="text"
             v-model="keyword"
             maxlength="10"
             slot="right">
    </tui-cell>
    <div class="button-warpper">
      <tui-button type="danger"
                  @click="doSearch(keyword)">{{$t('amap.search')}}</tui-button>
    </div>
    <tui-card v-for="{ id, location, name, pname, cityname, adname, address } in poi" :key="id" v-if="poi.length">
      <router-link slot="left" :to="{
        name: 'district-map',
        query: {
          position: location,
          name: name
        }
      }">{{name}}</router-link>
      <tui-cell>{{pname + cityname + adname}}</tui-cell>
      <p>{{address}}</p>
    </tui-card>
    <tui-card v-if="nodata" title="暂无结果"><p>请重新输入搜索条件</p></tui-card>
  </div>
</template>
<script>
import {
  getDistrict,
  getLoaction,
  formatAdcode,
  searchPlace,
} from './../../util/amap'

export default {
  data() {
    return {
      provinces: [],
      citys: [],
      address: {},
      place: {},
      keyword: '肯德基',
      info: '',
      poi: [],
      nodata: false
    }
  },
  created() {
    getLoaction().then(res => {
      this.place = res
      this.address = {
        province: res.province,
        provincecode: formatAdcode(res.adcode),
        city: res.city,
        citycode: res.adcode
      }
      this.doSearch(this.keyword)
      this.getProvince()
    })
  },
  methods: {
    getProvince() {
      getDistrict().then(res => {
        this.provinces = res.districts[0].districts
        if (this.address.provincecode) {
          this.getCity(this.address.provincecode)
        }
      })
    },
    getCity(val) {
      getDistrict(val).then(res => {
        this.citys = res.districts[0].districts
      })
    },
    getProvinceName(val) {
      this.address.province = val
      this.address.city = '请选择'
      this.address.citycode = ''
      this.getCity(val)
    },
    getCityName(val) {
      this.address.city = val
    },
    doSearch(val) {
      if (this.address.province === '请选择') {
        this.$toast('请选择省')
        return
      }
      if (this.address.city === '请选择') {
        this.$toast('请选择城市')
        return
      }
      if (val.trim()) {
        searchPlace(val, this.address.city).then(res => {
          this.poi = res.pois
          this.nodata = this.poi.length === 0
        })
      } else {
        this.$toast('请输入搜索条件')
      }
    }
  },
}
</script>
<style lang="stylus" scoped>
p
  padding 10px 0
  line-height 24px
</style>
