import Vue from 'vue'
import Router from 'vue-router'
import vueCal from '@/components/cal/vueCal'
import eventEdit from '@/components/event/eventEdit'

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
      path: '/eventEdit',
      name: 'eventEdit',
      component: eventEdit
    }
  ]
})
