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
        <el-button @click="formsubmit" v-show = "!inEditView">新增</el-button>
        <el-button @click="eventUpdate" v-show = "inEditView">编辑</el-button>
        <el-button @click="eventDelete" v-show = "inEditView">删除</el-button>
      </el-form-item>      
    </el-form>
  </div>
</el-dialog>
</template>
<script>
import {formatDate} from '@/util/util'
import localCache from '@/obj/localCache'
import typeCache from '@/obj/typeCache'
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
  localCache.addEvent([this.value2[0], this.value2[1], this.form.name, this.locale])
  this.mgshowDialog = false
}
let eventUpdate = function () {
  localCache.updateEvent(this.eventId, [this.value2[0], this.value2[1], this.form.name, this.locale])
  this.mgshowDialog = false
}

let eventDelete = function () {
  localCache.deleteEvent(this.eventId)
  this.mgshowDialog = false
}

export default {
  data () {
    return {
      localesList: typeCache.workData(),
      inEditView: false,
      mgshowDialog: false,
      locale: '',
      value2: '',
      modelValue: '',
      msg: '',
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
    this.modelValue = [new Date(), new Date()]
    this.locale = self.localesList[0].type
  },
  watch: {
    showDialog () {
      console.log('showDialog', this.showDialog)
      this.mgshowDialog = true
      if (this.eventId) {
        this.inEditView = true
        var eventData = (localStorage[this.eventId]).split(',')
        this.modelValue = [new Date(eventData[0]), new Date(eventData[1])]
        this.form.name = eventData[2]
        if (eventData.length > 3) {
          this.locale = eventData[3]
        }
      }
      var curTime = sessionStorage.getItem('selectedDate')
      if (curTime) {
        this.inEditView = false
        var startDate = new Date(new Date(new Date(curTime * 1000).toLocaleDateString()).getTime())
        var endDate = new Date(new Date(new Date(curTime * 1000).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000)
        var startTime = formatDate(new Date(startDate))
        var endTime = formatDate(new Date(endDate))
        this.modelValue = [new Date(startTime), new Date(endTime)]
        this.form.name = '加班'
        this.locale = '加班'
        sessionStorage.removeItem('selectedDate')
      }
      if (!this.eventId && !curTime) {
        var startDate1 = new Date(new Date(new Date().toLocaleDateString()).getTime())
        var endDate1 = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000)
        var startTime1 = formatDate(new Date(startDate1))
        var endTime1 = formatDate(new Date(endDate1))
        this.modelValue = [new Date(startTime1), new Date(endTime1)]
        this.form.name = ''
        this.locale = '工作'
      }
    },
    modelValue (val) {
      this.value2 = [formatDate(val[0]), formatDate(val[1])]
      console.log('this.value2', this.value2)
    }
  },
  methods: {
    eventAdd,
    eventDelete,
    eventUpdate,
    formsubmit
  }
}
</script>

<style>
  /* CSS */
</style>