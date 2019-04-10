<template>
<div>
  <el-container>
    <el-button type="primary" @click.native="handleSubmit" >提交</el-button>
    <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value1"
      format="yyyy-MM-dd" 
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期"
      @change="logTimeChange">
    </el-date-picker>
  </div>
  </el-container>    
    <el-table :data="rows"  border style="width: 100%" height = '480' v-loading="pageLoading">
    <el-table-column label="期数" prop = "preDrawIssue"></el-table-column>
    <el-table-column label="时间" prop = "preDrawTime"></el-table-column>
    <el-table-column label="1" prop = "0"></el-table-column>
    <el-table-column label="2" prop = "1"></el-table-column>
    <el-table-column label="3" prop = "2"></el-table-column>
    <el-table-column label="4" prop = "3"></el-table-column>
    <el-table-column label="5" prop = "4"></el-table-column>
    <el-table-column label="6" prop = "5"></el-table-column>
    <el-table-column label="7" prop = "6"></el-table-column>
    <el-table-column label="8" prop = "7"></el-table-column>
    <el-table-column label="9" prop = "8"></el-table-column>
    <el-table-column label="10" prop = "9"></el-table-column>
    <el-table-column label="冠亚和" prop = "sumFS"></el-table-column>
    <el-table-column label="大小" prop = "sumBigSamll"></el-table-column>
    <el-table-column label="单双" prop = "sumSingleDouble"></el-table-column>
    <el-table-column label="龙虎1" prop = "firstDT"></el-table-column>
    <el-table-column label="龙虎2" prop = "secondDT"></el-table-column>
    <el-table-column label="龙虎3" prop = "thirdDT"></el-table-column>
    <el-table-column label="龙虎4" prop = "fourthDT"></el-table-column>
    <el-table-column label="龙虎5" prop = "fifthDT"></el-table-column>
    </el-table>
    
</div>
</template>

<script>
let logTimeChange = function (val) {
  this.changeVal = val
}
let handleSubmit = function () {
  console.log('AAAA' + this.changeVal)
  // var date =
  this.pageLoading = true
  this.$http.get('https://api.api68.com/pks/getPksHistoryList.do?date=' + this.changeVal + '&lotCode=10001')
    .then((res) => {
      this.rows = []
      var tlData = res.data.result.data
      for (let i in tlData) {
        var rowData = tlData[i]
        var strs = tlData[i].preDrawCode.split(',')
        for (let j in strs) {
          rowData[j] = strs[j]
        }
        rowData['sumBigSamll'] = rowData['sumBigSamll'] > 0 ? '小' : '大'
        rowData['sumSingleDouble'] = rowData['sumSingleDouble'] > 0 ? '双' : '单'
        rowData['firstDT'] = rowData['firstDT'] > 0 ? '虎' : '龙'
        rowData['secondDT'] = rowData['secondDT'] > 0 ? '虎' : '龙'
        rowData['thirdDT'] = rowData['thirdDT'] > 0 ? '虎' : '龙'
        rowData['fourthDT'] = rowData['fourthDT'] > 0 ? '虎' : '龙'
        rowData['fifthDT'] = rowData['fifthDT'] > 0 ? '虎' : '龙'
        strs = tlData[i].preDrawTime.split(' ')
        rowData['preDrawTime'] = strs[1]
        this.rows.push(rowData)
      }
      console.log(this.rows)
      this.pageLoading = false
    })
}
export default {
  name: 'landing-page',
  components: {},
  data () {
    return {
      priod: null,
      pageLoading: false,
      input: '',
      value1: '',
      changeVal: '',
      rows: []
    }
  },
  methods: {
    handleSubmit,
    logTimeChange
  }
}
</script>

<style>
</style>
