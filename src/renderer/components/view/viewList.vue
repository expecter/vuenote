<template>
<div>
  <el-container>
  <el-header height = "20px">
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.type"
      :label="item.type"
      :value="item.type">
    </el-option>
  </el-select>
  <el-select v-model="value2" placeholder="请选择">
    <el-option
      v-for="item in options2"
      :key="item.val"
      :label="item.type"
      :value="item.val">
    </el-option>
  </el-select>
  </el-header>
  </el-container>
  <el-container>
  <el-main>
<el-table
    :data="tableData"
    style="width: 100%"
    height = "380px"
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
     <el-table-column
      fixed="right"
      label="操作"
      width="100">
    <template slot-scope="scope">
    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
    </template>
    </el-table-column>
  </el-table>
  <eventEdit :showDialog = showDialog :eventId=eventId></eventEdit>
  </el-main>
  </el-container>
</div>
</template>

<script>
import eventEdit from '@/components/event/eventEdit'
import typeCache from '@/obj/typeCache'
import util from '@/util/util'
export default {
  components: {
    eventEdit
  },
  data () {
    return {
      tableData: [],
      options: [],
      options2: [
        {type: '所有', val: 'all'},
        {type: '当天', val: 'today'},
        {type: '过期', val: 'expire'},
        {type: '未过期', val: 'unexpire'},
        {type: '未定期', val: 'untime'}],
      value: '所有',
      value2: 'all',
      showDialog: 0,
      eventId: ''
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
    },
    value2 () {
      this.updateVueCal()
    }
  },
  methods: {
    updateVueType: function () {
      this.options = [{type: '所有'}]
      this.options = this.options.concat(typeCache.workData())
    },
    handleClick: function (row) {
      this.eventId = row.eventId
      this.showDialog = this.showDialog + 1
    },
    updateVueCal: function () {
      this.tableData = []
      if (localStorage.tlEventName) {
        var tlEvent = localStorage.tlEventName.split(',')
        for (let eventName in tlEvent) {
          var eventData = (localStorage[tlEvent[eventName]]).split(',')
          var isAdd = false
          if (this.value === '所有') {
            isAdd = true
          } else if (this.value === eventData[3]) {
            isAdd = true
          }
          if (isAdd) {
            // 根据所属时间区分
            var addTime = false
            if (this.value2 === 'all') {
              addTime = true
            }
            var timeType = eventData[4] ? eventData[4] : 'datetimerange'
            var startTime = eventData[0]
            var endTime = eventData[1]
            var eventTime = ''
            if (timeType === 'dates') {
              var dates = (eventData[0]).split('|')
              var tlStartTime = []
              for (var index in dates) {
                eventTime = new Date(dates[index])
                tlStartTime.push(util.formatDate(eventTime, 'yyyy-MM-dd'))
              }
              startTime = tlStartTime.join(',')
            }
            if (timeType === 'date') {
              eventTime = new Date(startTime)
              startTime = util.formatDate(eventTime, 'yyyy-MM-dd')
            }
            if (timeType === 'month') {
              eventTime = new Date(startTime)
              startTime = util.formatDate(eventTime, 'yyyy-MM')
            }
            if (timeType === 'year') {
              eventTime = new Date(startTime)
              startTime = util.formatDate(eventTime, 'yyyy')
            }
            if (addTime) {
              this.tableData.push({
                start: startTime,
                end: endTime,
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
