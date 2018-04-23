/**
 * 标题精简
 * @param {any} value - 原始值
 * @return {*} 返回精简标题
 */
export default function (value) {
  return value && value.length ? value.join(',') : ''
}