let padLeftZero = function (str) {
  return ('00' + str).substr(str.length)
}
function formatDate (date, fmt = 'yyyy-MM-dd hh:mm') {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
function getCurDayZeroTime () {
  var start = new Date(new Date(new Date().toLocaleDateString()).getTime())
  return start
}
// 获取当晚12点时间
function getNightTime (val) {
  var startTime = new Date(val)
  var eventTime = new Date(new Date(startTime.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000)
  if (eventTime.getHours() === 0 && eventTime.getMinutes() === 0) {
    eventTime = new Date((eventTime.getTime() / 1000 - 60) * 1000)
  }
  return formatDate(eventTime, 'yyyy-MM-dd hh:mm')
}
function changeDateType (val) {
  var eventTime = new Date(val)
  return formatDate(eventTime, 'yyyy-MM-dd')
}
export default{
  formatDate,
  getNightTime,
  changeDateType,
  getCurDayZeroTime
}
