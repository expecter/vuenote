<template>     
    <div>
        
      <el-container>
        <el-aside width="100px">
        <el-row>
          <el-button @click="$goRoute('vueCal')">日历列表</el-button>
        </el-row>
        <el-row>
          <el-button @click="$goRoute('eventList')">事件列表</el-button>
        </el-row>
      </el-aside>
      <el-container>
        <el-main>
        <div height = "400px">
          <router-view></router-view>
          <!-- <filedown></filedown> -->
          <!-- <fileupload></fileupload> -->
        </div>
      </el-main>
        <eventEdit :showDialog = showDialog></eventEdit>
        <typeEdit :showTypeDialog = showTypeDialog></typeEdit>
        <el-footer>
            <el-button @click="addEventPanel" round>添加事件</el-button>
            <el-button @click="showTypePanel" round>添加分类</el-button>
            <el-button @click="exportExcel" round>导出事件</el-button>
            <el-button @click="addwork" round>加班</el-button>
            <!-- <el-button @click="addEventPanel" round>导入事件</el-button> -->
            <!-- <el-button @click="addEventPanel" round>事件追踪</el-button> -->
        </el-footer>
        </el-container>
      </el-container>
      
      
    </div>
  
</template>

<script>
  // import LandingPage from '@/components/LandingPage/historyView'
  // import LandingPage from '@/components/pages/history'
  // import vueCal from './components/cal/vueCal'
  import eventEdit from '@/components/event/eventEdit'
  import typeEdit from '@/components/event/typeEdit'
  // import { ipcRenderer } from 'electron'
  // import filedown from '@/components/filedown'
  import fileupload from '@/components/fileupload'
  import util from '@/components/util/util'
  // import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  let addEventPanel = function () {
    this.showDialog = this.showDialog + 1
  }
  let showTypePanel = function () {
    this.showTypeDialog = this.showTypeDialog + 1
  }
  let showVueCalView = function () {

  }
  let showViewListView = function () {

  }
  let addwork = function () {
    var curTime = sessionStorage.getItem('selectedDate')
    if (curTime) {
      // curTime = new Date(curTime)
      var startDate = curTime - (curTime) % 86400 - 8 * 3600
      var endDate = curTime - (curTime) % 86400 + 16 * 3600
      var startTime = util.formatDate(new Date(startDate * 1000), 'yyyy-MM-dd hh:mm')
      var endTime = util.formatDate(new Date(endDate * 1000), 'yyyy-MM-dd hh:mm')
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
      localStorage[eventName] = [startTime, endTime, '加班', 'work']
      let setEvent = new Event('setItemEvent')
      window.dispatchEvent(setEvent)
    }
  }
  let sheet2blob = function (sheet, sheetName) {
    sheetName = sheetName || 'sheet1'
    var workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    }
    workbook.Sheets[sheetName] = sheet
    // 生成excel的配置项
    var wopts = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary'
    }
    var wbout = XLSX.write(workbook, wopts)
    var blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'})
    // 字符串转ArrayBuffer
    function s2ab (s) {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
      return buf
    }
    return blob
  }
  let openDownloadDialog = function (url, saveName) {
    if (typeof url === 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url) // 创建blob地址
    }
    var aLink = document.createElement('a')
    aLink.href = url
    aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event
    if (window.MouseEvent) event = new MouseEvent('click')
    else {
      event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    }
    aLink.dispatchEvent(event)
  }
  let exportExcel = function () {
    this.events = [['开始时间', '结束时间', '事件', '类型']]
    if (localStorage.tlEventName) {
      var tlEvent = localStorage.tlEventName.split(',')
      for (let eventName in tlEvent) {
        console.log(eventName)
        var eventData = (localStorage[tlEvent[eventName]]).split(',')
        if (eventData[0]) {
          this.events.push([
            eventData[0],
            eventData[1],
            eventData[2],
            tlEvent[eventName]
          ])
        }
      }
    }
    console.log(this.events)
    var sheet = XLSX.utils.aoa_to_sheet(this.events)
    openDownloadDialog(sheet2blob(sheet), '导出.xlsx')
    // var wbout = XLSX.write(wb, {
    //   bookType: 'xlsx',
    //   bookSST: true,
    //   type: 'array'
    // })
    // try {
    //   FileSaver.saveAs(
    //     new Blob([wbout], { type: 'application/octet-stream' }),
    //     'vuecal.xlsx'
    //   )
    // } catch (e) {
    //   if (typeof console !== 'undefined') console.log(e, wbout)
    // }
    // return wbout
  }
  let readFile = function () {
    // const fs = require('fs')
    // fs.readFile('files.json', 'utf-8', (err, dataStr) => {
    //   if (err) throw err
    //   console.log(dataStr)
    // })
  }
  let checkUpdate = function () {
    // const _this = this
    // ipcRenderer.send('checkForUpdate')
    // ipcRenderer.on('message', (event, text) => {
    //   console.log(arguments)
    //   _this.tips = text
    // })
    // ipcRenderer.on('downloadProgress', (event, progressObj) => {
    //   console.log(progressObj)
    //   _this.downloadPercent = progressObj.percent || 0
    // })
    // ipcRenderer.on('isUpdateNow', () => {
    //   ipcRenderer.send('isUpdateNow')
    // })
  }
  export default {
    name: 'electronui',
    components: {
      eventEdit,
      fileupload,
      typeEdit
      // filedown
      // LandingPage,
      // vueCal
    },
    data () {
      return {
        showDialog: 1,
        showTypeDialog: 1,
        links: [
          {
            text: '日历',
            route: '/'
          },
          {
            text: '事件',
            route: '/eventList'
          }
        ],
        events: []
      }
    },
    created: function () {
    },
    methods: {
      addEventPanel,
      checkUpdate,
      showTypePanel,
      showVueCalView,
      showViewListView,
      readFile,
      exportExcel,
      sheet2blob,
      openDownloadDialog,
      addwork
    }
  }
</script>

<style>
</style>
