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
function getNightTime (val, type = 'day') {
  var startTime = new Date(val)
  var overTime = 0
  if (type === 'day') {
    overTime = 24
  }
  if (type === 'month') {
    overTime = this.getCountDays(val) * 24
  }
  if (type === 'year') {
    var curYear = new Date(val)
    overTime = this.getYearDays(curYear.getFullYear()) * 24
  }
  var eventTime = new Date(new Date(startTime.toLocaleDateString()).getTime() + overTime * 60 * 60 * 1000)
  return eventTime
}

function changeDateType (val) {
  var eventTime = new Date(val)
  return formatDate(eventTime, 'yyyy-MM-dd')
}
function getCountDays (date) {
  var newDate = new Date(date)
  var curMonth = newDate.getMonth()
  newDate.setMonth(curMonth + 1)
  newDate.setDate(0)
  return newDate.getDate()
}
function getYearDays (year) {
  if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
    return 366
  } else {
    return 365
  }
}
function getLastNightTime (date) {
  var newDate = new Date(date)
  if (newDate.getHours() === 0 && newDate.getMinutes() === 0) {
    return new Date((newDate.getTime() / 1000 - 60) * 1000)
  }
  return new Date(date)
}
export default{
  formatDate,
  getNightTime,
  changeDateType,
  getCurDayZeroTime,
  getCountDays,
  getLastNightTime,
  getYearDays
}
