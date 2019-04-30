<template>
<div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.type"
        :label="item.type"
        :value="item.type">
      </el-option>
    </el-select>
    <vue-cal class="vuecal--green-theme"
    xsmall
    
    :events="events"
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
  let padLeftZero = function (str) {
    return ('00' + str).substr(str.length)
  }
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
        selectedDate: '',
        value: 'all',
        events: [],
        options: []
      }
    },
    created: function () {
      let self = this
      window.addEventListener('setItemEvent', function (e) {
        self.updateVueCal()
      })
      this.updateVueCal()
      window.addEventListener('setTypeEvent', function (e) {
        self.updateVueType()
      })
      this.updateVueType()
    },
    mounted () {
    },
    watch: {
      value () {
        this.updateVueCal()
      }
    },
    methods: {
      updateVueType: function () {
        this.options = [{type: 'all'}]
        this.options = this.options.concat(config.workData())
      },
      onEventClick (event, e) {
        // this.$vDialog.alert('This is a <b>Vue</b> dialog plugin: vDialog!')
        this.selectedEvent = event
        this.eventId = this.selectedEvent.eventId
        this.showDialog = this.showDialog + 1
        // Prevent navigating to narrower view (default vue-cal behavior).
        e.stopPropagation()
      },
      onCellClick (event) {
        console.log(event, 'testAAAA')
        self.selectedDate = event
        sessionStorage.setItem('selectedDate', event.getTime() / 1000)
      },
      formatDate (date, fmt) {
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        }
        for (let k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
          }
        }
        return fmt
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
            var eventTime = new Date(eventData[1])
            if (eventTime.getHours() === 0 && eventTime.getMinutes() === 0) {
              eventTime = new Date((eventTime.getTime() / 1000 - 60) * 1000)
            }
            var endTime = this.formatDate(eventTime, 'yyyy-MM-dd hh:mm')
            if (this.value === 'all') {
              if (eventData[0]) {
                this.events.push({
                  start: eventData[0],
                  end: endTime,
                  title: eventData[2],
                  class: color,
                  eventId: tlEvent[eventName]
                })
              }
            } else {
              if (eventData[0] && this.value === eventData[3]) {
                this.events.push({
                  start: eventData[0],
                  end: endTime,
                  title: eventData[2],
                  class: color,
                  eventId: tlEvent[eventName]
                })
              }
            }
          }
        }
        // this.events.push({
        //   start: '2019-04-19 00:00',
        //   end: '2019-04-23 00:00',
        //   title: '哈哈哈哈',
        //   // content: '<i class="v-icon material-icons">local_hospital</i>',
        //   class: 'health'
        // })
        console.log(this.events)
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