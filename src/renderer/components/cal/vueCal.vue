<template>
<div> 
    <vue-cal
    :time="false" 
    :events="events" 
    events-on-month-view="short"
    :disable-views="['year']"
    :on-event-click="onEventClick"
    >
    </vue-cal>
    <el-dialog
          title="提示"
          :visible.sync="showDialog"
          width="30%">
          <span>{{ selectedEvent.title }}</span>
          <ul>
            <li>开始时间: {{ selectedEvent.startTime }}</li>
            <li>结束时间: {{ selectedEvent.endTime }}</li>
          </ul>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="showDialog = false">确 定</el-button>
          </span> -->
        </el-dialog>
</div>
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