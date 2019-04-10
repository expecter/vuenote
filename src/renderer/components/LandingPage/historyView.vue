<template>
<div>
<el-container>
  <el-main>
      <el-container>
          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="审批人">
                <el-input placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select placeholder="活动区域">
                <el-option label="区域一" ></el-option>
                <el-option label="区域二" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" >查询</el-button>
            </el-form-item>
            </el-form>
      </el-container>
  <el-container>
      
    <el-table
    :data="balls"
    border
    style="width: 100%">
    <el-table-column
      prop="0"
      label=""
      width="60">
    </el-table-column>
    <el-table-column
      prop="1"
      label=""
      width="50">
    </el-table-column>
    <el-table-column
      prop="2"
      label=""
      width="50">
    </el-table-column>
    <el-table-column
      prop="3"
      label=""
      width="50">
    </el-table-column>
    <el-table-column
      prop="4"
      label=""
      width="50">
    </el-table-column>
    <el-table-column
      prop="5"
      label=""
      width="50">
    </el-table-column>
    <el-table-column
      prop="6"
      label=""
      width="50">
    </el-table-column>
    <el-table-column
      prop="7"
      label=""
      width="50">
    </el-table-column>
    <el-table-column
      prop="8"
      label=""
      width="50">
    </el-table-column>
    <el-table-column
      prop="9"
      label=""
      width="50">
    </el-table-column>
    <el-table-column
      prop="10"
      label=""
      width="50">
    </el-table-column>
    </el-table>
    
  </el-container>
  </el-main>
  </el-container>
</div>
</template>

<script>
  export default {
    name: 'landing-page',
    components: {},
    data () {
      return {
        priod: null,
        input: '',
        balls: (function () {
          var tlBalls = []
          for (var i = 0; i < 10; i++) {
            tlBalls[i] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
          }
          return tlBalls
        }())
      }
    },
    methods: {
      open (link) {
        require('electron').shell.openExternal(link)
      }
    },
    created: function () {
      this.$http.get('https://api.api68.com/pks/getPksHistoryList.do?date=2019-03-21&lotCode=10001')
        .then((res) => {
          // var priod = res.data.current.period
          var tlData = res.data.result.data
          for (let i in tlData) {
            var data = tlData[i]
            var strs = data.preDrawCode.split(',')
            // this.balls[i] = []
            for (let j in strs) {
              console.log(i + ' ' + j)
              if (this.balls[i]) {
                this.balls[i][j] = strs[j]
              }
            }
          }
          console.log(this.balls)
        })
    }
  }
</script>

<style>
</style>
