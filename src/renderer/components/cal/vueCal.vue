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
    <eventEdit :showDialog = showDialog :eventId=eventId></eventEdit>
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
        showDialog: 0,
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
        this.showDialog = this.showDialog + 1
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