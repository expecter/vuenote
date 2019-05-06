export default {
  getTlTimeType: function () {
    return [
      {type: 'date', text: '天'},
      //   {type: 'week', text: '周'},
      {type: 'month', text: '月'},
      {type: 'year', text: '年'},
      {type: 'dates', text: '多个日期'},
      {type: 'datetimerange', text: '开始结束时间'},
      { type: 'untime', text: '未定' }
    ]
  },
  changeToCal: function (value, type) {
    return value
  }
}
