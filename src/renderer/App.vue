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
            <el-button @click="addEventPanel" round>导出事件</el-button>
            <el-button @click="addEventPanel" round>导入事件</el-button>
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
      readFile
    }
  }
</script>

<style>
</style>
