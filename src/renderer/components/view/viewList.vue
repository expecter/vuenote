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
      label="标题">
    </el-table-column>
  </el-table>
</template>

<script>
import config from '@/components/config/config'
export default {
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
          console.log(eventName)
          var eventData = (localStorage[tlEvent[eventName]]).split(',')
          console.log('testhhh', eventData)
          if (eventData[3]) {
            for (var index in config.workData()) {
              var item = config.workData()[index]
              if (item.type === eventData[3]) {
                console.log(item)
              }
            }
          }
          console.log(eventData)
          if (eventData[0]) {
            this.tableData.push({
              start: eventData[0],
              end: eventData[1],
              title: eventData[2],
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
