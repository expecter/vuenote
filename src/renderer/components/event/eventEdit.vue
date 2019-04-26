<template>
<el-dialog
  title="提示"
  :visible.sync="mgshowDialog"
  width="60%">
  <div>
    <el-form ref="form" :model="form" label-width="80px">    
    <el-form-item label="活动名称">
      <el-input v-model="msg" placeholder="请输入内容" style="width: 100%;"></el-input>
    </el-form-item>    
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="modelValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 100%;"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动类型">
        <el-select v-model = 'locale' placeholder="请选择活动区域" style="width: 100%;">
          <el-option  v-for="item in localesList" :label="item.type" :value="item.type" :key="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="eventAdd" v-show = "!inEditView">新增</el-button>
        <el-button @click="eventUpdate" v-show = "inEditView">编辑</el-button>
        <el-button @click="eventDelete" v-show = "inEditView">删除</el-button>
      </el-form-item>      
    </el-form>
  </div>
</el-dialog>
</template>
<script>
import config from '@/components/config/config'
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
  localStorage[eventName] = [this.value2[0], this.value2[1], this.msg, this.locale]
  let setEvent = new Event('setItemEvent')
  window.dispatchEvent(setEvent)
  this.mgshowDialog = false
}
let eventUpdate = function () {
  console.log('this.value2', this.value2)
  // localStorage[this.eventId] = [this.formatDate(this.value2[0], 'yyyy-MM-dd hh:mm'), this.formatDate(this.value2[1], 'yyyy-MM-dd hh:mm'), this.msg]
  localStorage[this.eventId] = [this.value2[0], this.value2[1], this.msg, this.locale]
  let setEvent = new Event('setItemEvent')
  window.dispatchEvent(setEvent)
  this.mgshowDialog = false
}

let eventDelete = function () {
  if (localStorage.tlEventName) {
    var tlEvent = localStorage.tlEventName.split(',')
    tlEvent.splice(tlEvent.indexOf(this.eventId), 1)
    localStorage.tlEventName = tlEvent
    this.mgshowDialog = false
  }
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
      localesList: config.workData(),
      inEditView: false,
      mgshowDialog: false,
      locale: '',
      value2: '',
      modelValue: '',
      msg: '',
      form: {}
    }
  },
  props: ['eventId', 'showDialog'],
  created: function () {
  },
  watch: {
    // eventId () {
    //   if (this.eventId) {
    //     this.inEditView = true
    //     var eventData = (localStorage[this.eventId]).split(',')
    //     this.modelValue = [new Date(eventData[0]), new Date(eventData[1])]
    //     this.value2 = [eventData[0], eventData[1]]
    //   }
    // },
    showDialog () {
      this.mgshowDialog = true
      if (this.eventId) {
        this.inEditView = true
        var eventData = (localStorage[this.eventId]).split(',')
        this.modelValue = [new Date(eventData[0]), new Date(eventData[1])]
        this.msg = eventData[2]
        if (eventData.length > 3) {
          this.locale = eventData[3]
        }
      }
    },
    modelValue (val) {
      this.value2 = [this.formatDate(val[0], 'yyyy-MM-dd hh:mm'), this.formatDate(val[1], 'yyyy-MM-dd hh:mm')]
      console.log('this.value2', this.value2)
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