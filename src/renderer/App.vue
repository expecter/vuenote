<template>     
    <div>
        
      <el-container>
        <el-aside width="100px">
        <ul>
          <li v-for="item in links"><a @click="$goRoute(item.route)">{{item.text}}</a></li>
        </ul>
      </el-aside>
        <el-main>
        <div height = "400px">
          <router-view></router-view>
        </div>        
      </el-main>
      </el-container>
      
      
    </div>
  
</template>

<script>
  // import LandingPage from '@/components/LandingPage/historyView'
  // import LandingPage from '@/components/pages/history'
  // import vueCal from './components/cal/vueCal'
  export default {
    name: 'electronui',
    components: {
      // LandingPage,
      // vueCal
    },
    data () {
      return {
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
    }
  }
</script>

<style>
</style>
