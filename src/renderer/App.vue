<template>  
  <el-container>
    
    <el-aside width="200px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @select="handleSelect"
      @close="handleClose">
      <div v-for="item in navigations" :key="item.index">
      <el-menu-item :index= item.index >
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.text}}</span>
      </el-menu-item>
      </div>
      </el-menu>
    </el-aside>
    <el-main>
      <div id="app">    
        <landing-page></landing-page>
        <!-- <div>
        <ul>
          <li v-for="item in links"><a @click="$goRoute(item.route)">{{item.text}}</a></li>
        </ul>
        <router-view></router-view>
      </div> -->
      </div>
    </el-main>
  </el-container>
</template>

<script>
  // import LandingPage from '@/components/LandingPage/historyView'
  import LandingPage from '@/components/pages/history'

  export default {
    name: 'electronui',
    components: {
      LandingPage
    },
    data () {
      return {
        links: [
          {
            text: '胡萝卜',
            route: '/home'
          },
          {
            text: '大白菜',
            route: '/page01'
          },
          {
            text: '水蜜桃',
            route: '/page02'
          }
        ],
        navigations: [
          {
            text: 'item122',
            index: '1'
          },
          {
            text: 'item2',
            index: '2'
          },
          {
            text: 'item3',
            index: '3'
          }
        ]
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
