<template>
<el-table
    :data="tableData"
    style="width: 100%"
    height = "400px"
    :default-sort = "{prop: 'start', order: 'descending'}"
    >
    <el-table-column
      prop="start"
      label="开始时间"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="end"
      label="结束时间"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="事件">
    </el-table-column>
    <el-table-column
      prop="eventType"
      label="类型">
    </el-table-column>
    
  </el-table>
</template>

<script>
// import config from '@/components/config/config'
import eventEdit from '@/components/event/eventEdit'
export default {
  components: {
    eventEdit
  },
  data () {
    return {
      tableData: []
    }
  },
  created: function () {
    let self = this
    window.addEventListener('setItemEvent', function (e) {
      self.updateVueCal()
    })
    this.updateVueCal()
  },
  methods: {
    updateVueCal: function () {
      this.tableData = []
      if (localStorage.tlEventName) {
        var tlEvent = localStorage.tlEventName.split(',')
        for (let eventName in tlEvent) {
          var eventData = (localStorage[tlEvent[eventName]]).split(',')
          // if (eventData[3]) {
          //   for (var index in config.workData()) {
          //     var item = config.workData()[index]
          //     if (item.type === eventData[3]) {
          //       console.log(item)
          //     }
          //   }
          // }
          if (eventData[0]) {
            this.tableData.push({
              start: eventData[0],
              end: eventData[1],
              title: eventData[2],
              eventType: eventData[3],
              eventId: tlEvent[eventName]
            })
          }
        }
      }
    },
    formatter (row, column) {
      return row.address
    }
  }
}
</script>

<style>

</style>
