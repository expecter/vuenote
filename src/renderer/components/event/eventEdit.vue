<template>
<el-dialog
  title="提示"
  :visible.sync="mgshowDialog"
  width="80%">
  <div>
    <el-form ref="form" :model="form" :rules = "rules" label-width="80px">    
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入内容" style="width: 100%;"></el-input>
    </el-form-item>
      <el-form-item label="时间类型">
        <el-select v-model = 'showRangeView' placeholder="请选择时间区域" style="width: 100%;" @change="getCouponSelected">
          <el-option  v-for="item in timeTypeList" :label="item.text" :value="item.type" :key="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          v-if = "showRangeView === 'date'"
          type="date"
          v-model="modelValue1"
          placeholder="选择日期">
        </el-date-picker>
        <el-date-picker
          v-if = "showRangeView === 'week'"
          type="week"
          v-model="modelValue1"
          format="yyyy 第 WW 周"
          placeholder="选择周">
        </el-date-picker>
        <el-date-picker
          v-if = "showRangeView === 'month'"
          type="month"
          v-model="modelValue1"
          placeholder="选择月">
        </el-date-picker>
        <el-date-picker
          v-if = "showRangeView === 'year'"
          type="year"
          v-model="modelValue1"
          placeholder="选择年">
        </el-date-picker>
        <el-date-picker
          v-if = "showRangeView === 'dates'"
          type="dates"
          v-model="modelValue1"
          placeholder="选择一个或多个日期">
        </el-date-picker>
        <el-date-picker
          v-if = "showRangeView === 'datetimerange'"
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
        <el-button @click="formsubmit" v-show = "!inEditView">新增</el-button>
        <el-button @click="eventUpdate" v-show = "inEditView">编辑</el-button>
        <el-button @click="eventDelete" v-show = "inEditView">删除</el-button>
      </el-form-item>      
    </el-form>
  </div>
</el-dialog>
</template>
<script>
import util from '@/util/util'
import localCache from '@/obj/localCache'
import typeCache from '@/obj/typeCache'
import timeType from '@/ref/timeType'
let formsubmit = function () {
  this.$refs['form'].validate((valid) => {
    console.log('valid', valid)
    if (valid) {
      this.eventAdd()
    } else {
      return false
    }
  })
}
let eventAdd = function () {
  localCache.addEvent([this.value2[0], this.value2[1], this.form.name, this.locale, this.showRangeView])
  this.mgshowDialog = false
}
let eventUpdate = function () {
  localCache.updateEvent(this.eventId, [this.value2[0], this.value2[1], this.form.name, this.locale, this.showRangeView])
  this.mgshowDialog = false
}

let eventDelete = function () {
  localCache.deleteEvent(this.eventId)
  this.mgshowDialog = false
}
let formateReg = function (val) {
  if (!val || val === '') {
    return ''
  }
  return util.formatDate(val)
}

export default {
  data () {
    return {
      localesList: typeCache.workData(),
      timeTypeList: timeType.getTlTimeType(),
      inEditView: false,
      mgshowDialog: false,
      locale: '',
      value2: '',
      modelValue: '',
      modelValue1: '',
      msg: '',
      needChangeValue: false,
      showRangeView: timeType.getTlTimeType()[0].type, // 显示时间区域
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['eventId', 'showDialog'],
  created: function () {
    let self = this
    window.addEventListener('setTypeEvent', function (e) {
      self.localesList = typeCache.workData()
    })
    self.localesList = typeCache.workData()
    // this.modelValue = [new Date(), new Date()]
    this.locale = self.localesList[0].type
  },
  watch: {
    modelValue (val) {
      if (!val || val === '') {
        this.value2 = ['', '']
        return
      }
      this.value2 = []
      for (var index in val) {
        this.value2.push(this.formateReg(val[index]))
      }
    },
    modelValue1 (val) {
      console.log('modelValue1', val)
      if (!val || val === '') {
        this.value2 = ['', '']
        return
      }
      if (this.showRangeView === 'dates') {
        var dayArray = []
        for (var index in val) {
          if (val[index] !== '') {
            dayArray.push(util.formatDate(val[index]))
          }
        }
        this.value2 = [dayArray.join('|'), '']
        return
      }
      if (this.showRangeView === 'date') {
        this.value2 = [util.formatDate(val), '']
      }
      if (this.showRangeView === 'week') {
        this.value2 = [util.formatDate(val), '']
      }
      if (this.showRangeView === 'month') {
        this.value2 = [util.formatDate(val), '']
      }
      if (this.showRangeView === 'year') {
        this.value2 = [util.formatDate(val), '']
      }
      console.log('this.value2', this.value2)
    },
    showRangeView (val) {
    },
    showDialog () {
      this.mgshowDialog = true
      this.showRangeView = 'date'
      if (this.eventId) {
        this.inEditView = true
        var eventData = (localStorage[this.eventId]).split(',')
        this.showRangeView = eventData[4] ? eventData[4] : 'datetimerange'
        this.updateModelView(eventData)
        this.form.name = eventData[2]
        if (eventData.length > 3) {
          this.locale = eventData[3]
        }
        return
      }
      var curTime = sessionStorage.getItem('selectedDate')
      if (curTime) {
        this.inEditView = false
        var startDate = new Date(new Date(new Date(curTime * 1000).toLocaleDateString()).getTime())
        // var endDate = new Date(new Date(new Date(curTime * 1000).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000)
        var startTime = util.formatDate(startDate)
        // var endTime = formatDate(new Date(endDate))
        // this.modelValue = [new Date(startTime), new Date(endTime)]
        this.form.name = '加班'
        this.locale = '加班'
        this.showRangeView = 'date'
        this.updateModelView([startTime])
        sessionStorage.removeItem('selectedDate')
        return
      }
      var startDate1 = new Date(new Date(new Date().toLocaleDateString()).getTime())
      // var endDate1 = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000)
      var startTime1 = util.formatDate(startDate1)
      // var endTime1 = formatDate(new Date(endDate1))
      // this.modelValue = [new Date(startTime1), new Date(endTime1)]
      this.form.name = ''
      this.showRangeView = 'date'
      this.updateModelView([startTime1])
      this.locale = '工作'
    }
  },
  methods: {
    eventAdd,
    eventDelete,
    eventUpdate,
    formsubmit,
    formateReg,
    getCouponSelected () {
      // this.modelValue = ''
      // this.modelValue1 = ''
      if (this.showRangeView === 'datetimerange') {
        if (this.modelValue === '' && this.modelValue1) {
          if (this.modelValue1.constructor === Date) {
            this.modelValue = [this.modelValue1, this.modelValue1]
          }
          if (this.modelValue1.constructor === Array) {
            this.modelValue = [this.modelValue1[0], this.modelValue1[1]]
          }
        }
        return
      }
      if (!this.modelValue1) {
        return
      }
      if (this.showRangeView === 'dates') {
        if (this.modelValue1.constructor === Date) {
          this.modelValue1 = [this.modelValue1]
        }
        if (this.modelValue1.constructor === Array) {
        }
        return
      }
      // 除多个日期和区间以外的日期
      if (this.modelValue1.constructor === Array) {
        this.modelValue1 = this.modelValue1[0] ? this.modelValue1[0] : ''
      }
    },
    updateModelView (eventData) {
      if (this.showRangeView === 'datetimerange') {
        this.modelValue = [new Date(eventData[0]), new Date(eventData[1])]
      }
      if (this.showRangeView === 'date') {
        this.modelValue1 = new Date(eventData[0])
      }
      if (this.showRangeView === 'week') {
        this.modelValue1 = new Date(eventData[0])
      }
      if (this.showRangeView === 'month') {
        this.modelValue1 = new Date(eventData[0])
      }
      if (this.showRangeView === 'year') {
        this.modelValue1 = new Date(eventData[0])
      }
      if (this.showRangeView === 'dates') {
        var dates = (eventData[0]).split('|')
        var tlStartTime = []
        for (var index in dates) {
          var eventTime = new Date(dates[index])
          tlStartTime.push(eventTime)
        }
        this.modelValue1 = tlStartTime
      }
    }
  }
}
</script>

<style>
  /* CSS */
</style>