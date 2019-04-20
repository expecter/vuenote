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
    <button v-on:click=eventAdd v-show = !inEditView>新增</button>
    <button v-on:click=eventUpdate v-show = inEditView>编辑</button>
    <button v-on:click=eventDelete v-show = inEditView>删除</button>
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
  localStorage[eventName] = [this.value2[0], this.value2[1], this.msg]
  let setEvent = new Event('setItemEvent')
  window.dispatchEvent(setEvent)
}
let eventUpdate = function () {
  console.log('this.value2', this.value2)
  // localStorage[this.eventId] = [this.formatDate(this.value2[0], 'yyyy-MM-dd hh:mm'), this.formatDate(this.value2[1], 'yyyy-MM-dd hh:mm'), this.msg]
  localStorage[this.eventId] = [this.value2[0], this.value2[1], this.msg]
  let setEvent = new Event('setItemEvent')
  window.dispatchEvent(setEvent)
}

let eventDelete = function () {
  if (localStorage.tlEventName) {
    var tlEvent = localStorage.tlEventName.split(',')
    tlEvent.splice(tlEvent.indexOf(this.eventId), 1)
    console.log('SSSSS', tlEvent)
    localStorage.tlEventName = tlEvent
  }
  console.log('SSSSSTT', this.eventId)
  localStorage.removeItem(this.eventId)
  let setEvent = new Event('setItemEvent')
  window.dispatchEvent(setEvent)
}
let padLeftZero = function (str) {
  return ('00' + str).substr(str.length)
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
      inEditView: false,
      value2: '',
      msg: 'AAAAA'
    }
  },
  props: ['eventId'],
  created: function () {
    if (this.eventId) {
      this.inEditView = true
      var eventData = (localStorage[this.eventId]).split(',')
      this.value2 = [new Date(eventData[0]), new Date(eventData[1])]
    }
  },
  watch: {
    eventId () {
      console.log('eventId has change')
      if (this.eventId) {
        this.inEditView = true
        var eventData = (localStorage[this.eventId]).split(',')
        this.value2 = [new Date(eventData[0]), new Date(eventData[1])]
      }
    }
  },
  methods: {
    eventAdd,
    eventDelete,
    eventUpdate,
    formatDate (date, fmt) {
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
  }
}
</script>

<style>
  /* CSS */
</style>