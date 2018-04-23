<template>
  <div>
    <tui-cell :title="$t('amap.keywords')">
      <input type="text"
             v-model="city"
             maxlength="10"
             slot="right">
    </tui-cell>
    <div class="button-warpper">
      <tui-button type="danger"
                  @click="getWeather(city)">{{$t('amap.search')}}</tui-button>
    </div>
    <tui-card :title="`${weather.city || city}`">
      <template v-if="weather.reporttime">
        <tui-cell :title="$t('amap.reporttime')">
          <template slot="right">{{weather.reporttime}}</template>
        </tui-cell>
        <tui-cell v-for="{ week, date, dayweather, nightweather, nighttemp, daytemp } in weather.casts"
                  :title="weeks[week - 1] + date"
                  :key="date">
          <template slot="right">
            <p>{{dayweather + '~' + nightweather + '(' +nighttemp + '℃~' + daytemp + '℃)'}}</p>
          </template>
        </tui-cell>
      </template>
      <tui-cell v-else>{{info}}</tui-cell>
    </tui-card>
    <tui-cell :title="$t('amap.live')">
      <tui-switch v-model="showLive" slot="right"></tui-switch>
    </tui-cell>
    <template v-if="showLive">
      <tui-checkbox v-model="citys" :options="cityList"></tui-checkbox>
      <div class="button-warpper">
        <tui-button type="danger" @click="getWeathers" :disabled="citys.length == 0">{{$t('amap.search')}}</tui-button>
      </div>
      <tui-card :title="$t('amap.live')" v-if="lives.length">
        <tui-cell v-for="{
          body: {
            lives,
          }
        } in lives"
                 :title="lives[0].city"
                  :key="lives[0].city">
          <template slot="right">
            <p>{{lives[0].weather + lives[0].temperature}}℃</p>
          </template>
        </tui-cell>
      </tui-card>
    </template>
  </div>
</template>
<script>
import {
  getWeather,
  getLoaction,
  getBatchWeather
} from './../../util/amap'

export default {
  data() {
    return {
      city: '',
      weather: {},
      info: '',
      weeks: ['Mo', 'Tu', 'We', 'We', 'Fr', 'Sa', 'Su', ],
      lives: [],
      citys: [],
      cityList: [
        {
          label: '北京',
          value: '北京'
        },
        {
          label: '上海',
          value: '上海'
        },
        {
          label: '杭州',
          value: '杭州'
        },
        {
          label: '深圳',
          value: '深圳'
        },
      ],
      showLive: false
    }
  },
  created() {
    this.loadLoaction()
  },
  methods: {
    getWeathers() {
      getBatchWeather(this.citys).then(res => {
        this.lives = res
      })
    },
    getWeather(city = '杭州') {
      if (city.trim()) {
        getWeather(city).then(res => {
          this.weather = res.forecasts[0] || {}
          this.info = this.$t('amap.nodata')
        }).catch(e => {
          this.info = e
        })
      } else {
        this.weather = {}
        this.$toast('请输入搜索条件')
      }
    },
    loadLoaction() {
      getLoaction().then(res => {
        this.place = res
        this.city = res.city
        this.getWeather(res.adcode)
      }).catch(e => {
        this.$toast(e)
      })
    }
  },
}
</script>
