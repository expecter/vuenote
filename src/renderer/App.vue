<template>  
  <div id="app">    
      <el-container>
      <el-aside width="200px">
        <ul>
          <li v-for="item in links"><a @click="$goRoute(item.route)">{{item.text}}</a></li>
        </ul>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
  
</template>

<script>
  // import LandingPage from '@/components/LandingPage/historyView'
  // import LandingPage from '@/components/pages/history'
  import vueCal from './components/cal/vueCal'
  export default {
    name: 'electronui',
    components: {
      // LandingPage,
      vueCal
    },
    data () {
      return {
        links: [
          {
            text: '胡萝卜',
            route: '/'
          },
          {
            text: '大白菜',
            route: '/vueCal'
          },
          {
            text: '水蜜桃',
            route: '/eventEdit'
          }
        ]
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
