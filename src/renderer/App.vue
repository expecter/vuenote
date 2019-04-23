<template>     
    <div>
        
      <el-container>
        <el-aside width="100px">
        <el-row>
          <el-button @click="addEventPanel">添加事件</el-button>
        </el-row>
        <el-row>
          <el-button @click="addEventPanel">添加分类</el-button>
        </el-row>
        <el-row>
          <el-button @click="addEventPanel">导出事件</el-button>
        </el-row>
      </el-aside>
        <el-main>
        <div height = "400px">
          <router-view></router-view>
          <!-- <filedown></filedown> -->
        </div>
      </el-main>
        <eventEdit :showDialog = showDialog></eventEdit>
      </el-container>
      
      
    </div>
  
</template>

<script>
  // import LandingPage from '@/components/LandingPage/historyView'
  // import LandingPage from '@/components/pages/history'
  // import vueCal from './components/cal/vueCal'
  import eventEdit from '@/components/event/eventEdit'
  // import { ipcRenderer } from 'electron'
  // import filedown from '@/components/filedown'
  let addEventPanel = function () {
    this.showDialog = this.showDialog + 1
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
      eventEdit
      // filedown
      // LandingPage,
      // vueCal
    },
    data () {
      return {
        showDialog: 1,
        links: [
          {
            text: '日历',
            route: '/'
          },
          {
            text: '添加',
            route: '/eventEdit'
          }
        ],
        events: []
      }
    },
    created: function () {
    },
    methods: {
      addEventPanel,
      checkUpdate
    }
  }
</script>

<style>
</style>
