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
export {
  formatDate,
  getCurDayZeroTime
}
