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
</div>
</template>

<script>
import config from '@/components/config/config'
import eventEdit from '@/components/event/eventEdit'
export default {
  components: {
    eventEdit
  },
  data () {
    return {
      tableData: [],
      options: [],
      value: 'all'
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
    updateVueCal: function () {
      this.tableData = []
      if (localStorage.tlEventName) {
        var tlEvent = localStorage.tlEventName.split(',')
        for (let eventName in tlEvent) {
          var eventData = (localStorage[tlEvent[eventName]]).split(',')
          if (this.value === 'all') {
            if (eventData[0]) {
              this.tableData.push({
                start: eventData[0],
                end: eventData[1],
                title: eventData[2],
                eventType: eventData[3],
                eventId: tlEvent[eventName]
              })
            }
          } else {
            if (eventData[0] && this.value === eventData[3]) {
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
