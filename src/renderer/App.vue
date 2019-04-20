<template>     
    <div>
        
      <el-container>
        <el-aside width="100px">
          <el-button @click="addEventPanel">添加事件</el-button>
      </el-aside>
        <el-main>
        <div height = "400px">
          <!-- <router-view></router-view> -->
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
  // import filedown from '@/components/filedown'
  let addEventPanel = function () {
    this.showDialog = this.showDialog + 1
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
        events: [
          {
            start: '2019-04-15 10:35',
            end: '2019-04-15 11:30',
            title: '测试'
          },
          {
            start: '2019-04-15 10:35',
            end: '2019-04-15 23:30',
            title: '测试22'
          },
          {
            start: '2019-04-15 10:35',
            end: '2019-04-15 11:30',
            title: '测试33'
          },
          {
            start: '2018-11-19 18:30',
            end: '2018-11-19 19:15',
            title: 'Dentist appointment'
          }
        ]
      }
    },
    methods: {
      addEventPanel
    }
  }
</script>

<style>
</style>
