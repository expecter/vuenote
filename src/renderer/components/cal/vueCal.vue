<template> 
    <vue-cal 
    :events="events" 
    events-on-month-view="short"
    :disable-views="['year']"
    :on-event-click="onEventClick"
    >
    </vue-cal>
</template>
<script>
  // import LandingPage from '@/components/LandingPage/historyView'
  // import LandingPage from '@/components/pages/history'
  import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'
  export default {
    name: 'electronui',
    components: {
      // LandingPage,
      VueCal
    },
    data () {
      return {
        selectedEvent: {},
        showDialog: false,
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
    created: function () {
      if (localStorage.tlEventName) {
        var tlEvent = localStorage.tlEventName.split(',')
        for (let eventName in tlEvent) {
          console.log(eventName)
          var eventData = (localStorage[tlEvent[eventName]]).split(',')
          console.log(eventData)
          if (eventData[0]) {
            this.events.push({
              start: eventData[0],
              end: eventData[1],
              title: eventData[2]
            })
          }
        }
      }
    },
    mounted () {
    },
    methods: {
      onEventClick (event, e) {
        // this.$vDialog.alert('This is a <b>Vue</b> dialog plugin: vDialog!')
        this.selectedEvent = event
        this.showDialog = true
        // Prevent navigating to narrower view (default vue-cal behavior).
        e.stopPropagation()
      }
    }
  }
</script>

<style>
  /* CSS */
</style>