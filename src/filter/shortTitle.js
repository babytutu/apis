/**
 * 标题精简
 * @param {any} value - 原始值
 * @return {*} 返回精简标题
 */
export default function (value) {
  return value.length > 20 ? value.slice(0, 15) + '...' : value
}