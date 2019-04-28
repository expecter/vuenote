<template>
<div>
    <vue-cal class="vuecal--green-theme"
    xsmall
    
    :events="events"
    editable-events
    locale="zh-cn"
    style="height: 400px"
    :disable-views="['years']"
    :no-event-overlaps="true"
    :on-event-click="onEventClick"
    @cell-focus="onCellClick"
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
  import config from '@/components/config/config'
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
      onCellClick (event, e) {
        console.log(event, e)
      },
      updateVueCal () {
        this.events = []
        if (localStorage.tlEventName) {
          var tlEvent = localStorage.tlEventName.split(',')
          for (let eventName in tlEvent) {
            // console.log(eventName)
            var eventData = (localStorage[tlEvent[eventName]]).split(',')
            var color = 'leisure'
            if (eventData[3]) {
              for (var index in config.workData()) {
                var item = config.workData()[index]
                if (item.type === eventData[3]) {
                  color = item.color
                }
              }
            }
            if (eventData[0]) {
              this.events.push({
                start: eventData[0],
                end: eventData[1],
                title: eventData[2],
                class: color,
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
  /* .vuecal__cell-events-count {
    width: 18px;
    height: 2px;
    color: transparent;
  }

  .vuecal__cell-events-count {
    width: 4px;
    height: 4px;
    color: transparent;
  }

  .vuecal__cell--has-events {background-color: #fffacd;}
  .vuecal__cell-events-count {display: none;} */
  .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
  .vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
  .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}
</style>