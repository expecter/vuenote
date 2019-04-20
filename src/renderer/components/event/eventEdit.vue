<template>
<div>
  <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      format="yyyy-MM-dd hh:mm" 
      value-format="yyyy-MM-dd hh:mm"
      align="right">
    </el-date-picker>
    <button v-on:click=eventAdd>Add 1</button>
</div>
</template>
<script>
let eventAdd = function () {
  var eventName = 'evN_1'
  if (localStorage.tlEventName) {
    var tlEvent = localStorage.tlEventName.split(',')
    var lastElement = tlEvent[tlEvent.length - 1]
    var tlIndex = lastElement.split('_')
    var nextIndex = parseInt(tlIndex[1]) + 1
    eventName = 'evN_' + nextIndex
    tlEvent.push(eventName)
    localStorage.tlEventName = tlEvent
  } else {
    localStorage.tlEventName = [eventName]
  }
  localStorage[eventName] = [this.value2[0], this.value2[1], 'AAAA']
  let setEvent = new Event('setItemEvent')
  window.dispatchEvent(setEvent)
}

export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ''
    }
  },
  created: function () {
  },
  methods: {
    eventAdd
  }
}
</script>

<style>
  /* CSS */
</style>