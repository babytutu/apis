/**
 * 标题精简
 * @param {any} value - 原始值
 * @param {any} data - 替换值
 * @return {*} 返回精简标题
 */
export default function (value, data) {
  return value.replace(data, '')
}