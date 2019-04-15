<template>  
  <div id="app">
    <vue-cal 
    :events="events" 
    events-on-month-view="short"
    :disable-views="['year']"
    :on-event-click="onEventClick"
    >
    </vue-cal>
    <button id="information-dialog">Choose a directory</button>
    <!-- <AddButton :items=events /> -->
    <!-- <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title>
          <v-icon>{{ selectedEvent.icon }}</v-icon>
          <span>{{ selectedEvent.title }}</span>
          <v-spacer/>
          <strong>{{ selectedEvent.startDate }}</strong>
        </v-card-title>
        <v-card-text>
          <p v-html="selectedEvent.contentFull"/>
          <strong>Event details:</strong>
          <ul>
            <li>Event starts at: {{ selectedEvent.startTime }}</li>
            <li>Event ends at: {{ selectedEvent.endTime }}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog> -->
  </div>
  
</template>

<script>
  // import LandingPage from '@/components/LandingPage/historyView'
  // import LandingPage from '@/components/pages/history'
  import VueCal from 'vue-cal'
  import AddButton from './components/AddButton'
  import 'vue-cal/dist/vuecal.css'
  export default {
    name: 'electronui',
    components: {
      // LandingPage,
      VueCal,
      AddButton
    },
    data () {
      return {
        selectedEvent: {},
        showDialog: false,
        events: [
          {
            start: '2019-04-15 10:35',
            end: '2019-04-15 11:30',
            title: 'Doctor appointment'
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
      // window.localStorage.setItem('hou', 'aaaaaaa')
      var data2 = localStorage.getItem('hou')
      console.log(data2)
      const dialog = require('electron').remote.dialog
      dialog.showErrorBox('title', 'Error')
    },
    methods: {
      onEventClick (event, e) {
        this.$vDialog.alert('This is a <b>Vue</b> dialog plugin: vDialog!')
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
