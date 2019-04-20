<template>
<div> 
    <vue-cal
    :time="false" 
    :events="events" 
    events-on-month-view="short"
    events-count-on-year-view
    :disable-views="['year']"
    :on-event-click="onEventClick"
    >
    </vue-cal>
    <el-dialog
          title="提示"
          :visible.sync="showDialog"
          width="60%">
          <span>{{ selectedEvent.title }}</span>
          <!-- <ul>
            <li>开始时间: {{ selectedEvent.startTime }}</li>
            <li>结束时间: {{ selectedEvent.endTime }}</li>
          </ul> -->
          <eventEdit :eventId=eventId></eventEdit>
        </el-dialog>
</div>
</template>
<script>
  // import LandingPage from '@/components/LandingPage/historyView'
  // import LandingPage from '@/components/pages/history'
  import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'
  import eventEdit from '@/components/event/eventEdit'
  export default {
    name: 'electronui',
    components: {
      // LandingPage,
      eventEdit,
      VueCal
    },
    data () {
      return {
        selectedEvent: {},
        showDialog: false,
        eventId: '',
        events: [
        ]
      }
    },
    created: function () {
      let self = this
      window.addEventListener('setItemEvent', function (e) {
        self.updateVueCal()
      })
      this.updateVueCal()
    },
    mounted () {
    },
    methods: {
      onEventClick (event, e) {
        // this.$vDialog.alert('This is a <b>Vue</b> dialog plugin: vDialog!')
        this.selectedEvent = event
        this.eventId = this.selectedEvent.eventId
        this.showDialog = true
        // Prevent navigating to narrower view (default vue-cal behavior).
        e.stopPropagation()
      },
      updateVueCal () {
        this.events = []
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
                title: eventData[2],
                eventId: tlEvent[eventName]
              })
            }
          }
        }
      }
    }
  }
</script>

<style>
  /* CSS */
</style>