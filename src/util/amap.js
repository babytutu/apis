import axios from 'axios'
// 高德开发key
const key = '642bfc64d46e4dc4ecaf2bbe97510e74'
// 高德api前缀
const host = '//restapi.amap.com'
// 获取地区信息
const districtUrl = `${host}/v3/config/district?key=${key}&extensions=base`
// 获取ip定位
const locationUrl = `${host}/v3/ip?key=${key}`
// 天气预报查询
const weatherUrl = `${host}/v3/weather/weatherInfo?key=${key}&extensions=all`
// 搜索位置
const searchPlaceUrl = `${host}/v3/place/text?key=${key}&extensions=base`
// 批量查询
const batchUrl = `${host}/v3/batch?key=${key}`

/**
 * 返回resapi方法封装
 * @param {string} url restapi地址
 * @param {string} err 错误信息
 */
function getRestapi(url, err) {
  return new Promise((resolve, reject) => {
    axios.get(url).then((res) => {
      if (res.infocode === '10000') {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 批量查询数据接口@see {@link https://lbs.amap.com/api/webservice/guide/api/batchrequest}
 * @param {object} data 批量查询
 */
function batchRestapi(data) {
  return new Promise((resolve, reject) => {
    axios.post(batchUrl, data).then((res) => {
      if (res.length > 0) {
        resolve(res)
      } else {
        reject('信息获取失败')
      }
    })
  })
}
/**
 * 查询省市区信息@see {@link https://lbs.amap.com/api/webservice/guide/api/district}
 * @param {string} keywords 地区关键字，全国为空
 * @returns {Promise} promise对象
 */
export function getDistrict(keywords = '', subdistrict = 1) {
  return getRestapi(`${districtUrl}&keywords=${keywords}&subdistrict=${subdistrict}`, '位置信息查询失败')
}

/**
 * 获取ip定位@see {@link https://lbs.amap.com/api/webservice/guide/api/ipconfig}
 * @returns {Promise} promise对象
 */
export function getLoaction() {
  return getRestapi(locationUrl, '获取定位信息失败')
}
/**
 * 获取天气预报@see {@link https://lbs.amap.com/api/webservice/guide/api/weatherinfo}
 * @param {string} city 城市
 */
export function getWeather(city) {
  return getRestapi(`${weatherUrl}&city=${city}`, '获取天气信息失败')
}

/**
 * 地区编码和省市转换，默认转为省编码，市编码需要判断是否港澳
 * @param {string} adcode 地区编码
 * @param {string} type 地区类型
 * @return {string} 省或市的编码
 */
export function formatAdcode(adcode = '', type = 'province') {
  const provinceCode = adcode.replace(/\d{4}$/, '0000')
  let citycode = adcode
  if (!/^8(1|2)\d{4}$/.test(adcode)) {
    citycode = adcode.replace(/\d{2}$/, '00')
  }
  return type === 'province' ? provinceCode : citycode
}

/**
 * 搜索地址信息@see {@link https://lbs.amap.com/api/webservice/guide/api/search}
 * @param {string} keywords 搜索关键字
 * @param {number|string} city 城市
 * @param {number} page 当前页数
 * @param {number} offset 每页条数
 */
export function searchPlace(keywords, city, page = 1, offset = 20) {
  return getRestapi(`${searchPlaceUrl}&city=${city}&keywords=${keywords}&page=${page}&offset=${offset}`, '暂无结果')
}

/**
 * 批量查询城市看起实时天气
 * @param {array} arr 城市列表
 */
export function getBatchWeather(arr = []) {
  let ops = []
  arr.forEach(i => {
    ops.push({
      url: `/v3/weather/weatherInfo?key=${key}&extensions=base&city=${i}`
    })
  })
  return batchRestapi({ops})
}