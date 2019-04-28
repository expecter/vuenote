import Vue from 'vue'
import Router from 'vue-router'
import vueCal from '@/components/cal/vueCal'
import eventList from '@/components/view/viewList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: vueCal
    },
    {
      path: '/vueCal',
      name: 'vueCal',
      component: vueCal
    },
    {
      path: '/eventList',
      name: 'eventList',
      component: eventList
    }
  ]
})
