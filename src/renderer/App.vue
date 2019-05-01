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
        <fileupload :showUploadDialog = showUploadDialog></fileupload>
        <el-footer>
            <el-button @click="addEventPanel" round>添加事件</el-button>
            <el-button @click="showTypePanel" round>添加分类</el-button>
            <el-button @click="exportExcel" round>导出excel</el-button>
            <el-button @click="exportJson" round>导出json</el-button>
            <el-button @click="showUploadPanel" round>导入json</el-button>
            <!-- <el-button @click="addEventPanel" round>事件追踪</el-button> -->
        </el-footer>
        </el-container>
      </el-container>
      
      
    </div>
  
</template>

<script>
  import eventEdit from '@/components/event/eventEdit'
  import typeEdit from '@/components/event/typeEdit'
  // import { ipcRenderer } from 'electron'
  // import filedown from '@/components/filedown'
  import fileupload from '@/components/fileupload'
  // import {formatDate} from '@/util/util'
  import FileSaver from 'file-saver'
  import localCache from '@/obj/localCache'
  import {myFun} from '@/obj/eventObj'
  import XLSX from 'xlsx'
  let addEventPanel = function () {
    this.showDialog = this.showDialog + 1
  }
  let showTypePanel = function () {
    this.showTypeDialog = this.showTypeDialog + 1
  }
  let showUploadPanel = function () {
    this.showUploadDialog = this.showUploadDialog + 1
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
    var events = [['开始时间', '结束时间', '事件', '类型']]
    events = events.concat(localCache.getTlEvent())
    var sheet = XLSX.utils.aoa_to_sheet(events)
    openDownloadDialog(sheet2blob(sheet), 'export.xlsx')
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
  let exportJson = function () {
    var events = localCache.getTlEvent()
    const data = JSON.stringify(events)
    const blob = new Blob([data], {type: ''})
    FileSaver.saveAs(blob, 'export.json')
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
        showUploadDialog: 1,
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
      console.log(myFun())
      // console.log('AAAAAAA', util.getCurDayZeroTime())
    },
    methods: {
      addEventPanel,
      checkUpdate,
      showTypePanel,
      readFile,
      exportExcel,
      exportJson,
      sheet2blob,
      openDownloadDialog,
      showUploadPanel
    }
  }
</script>

<style>
</style>
