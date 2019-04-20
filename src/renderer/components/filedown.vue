<template>
  <div>
    <h1>download view</h1>
    <el-button class="mdi mdi-export"  @click="exportExcel">导出</el-button>
    <el-table :data="tableData" id="download" title="title">
      <el-table-column prop="1" label="编号"></el-table-column>
      <el-table-column prop="2" label="姓名"></el-table-column>
      <el-table-column prop="3" label="年龄"></el-table-column>
      <el-table-column prop="4" label="性别"></el-table-column>
      <el-table-column prop="5" label="职称"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      title: '职工表',
      tableData: [
        {1: 1, 2: 'a', 3: 18, 4: '男', 5: '员工'},
        {1: 2, 2: 'b', 3: 19, 4: '男', 5: '组长'},
        {1: 3, 2: 'c', 3: 18, 4: '女', 5: '员工'},
        {1: 4, 2: 'd', 3: 19, 4: '男', 5: '员工'},
        {1: 5, 2: 'e', 3: 28, 4: '男', 5: '部门经理'},
        {1: 6, 2: 'f', 3: 18, 4: '女', 5: '员工'},
        {1: 7, 2: 'g', 3: 16, 4: '男', 5: '员工'},
        {1: 8, 2: 'h', 3: 17, 4: '男', 5: '员工'},
        {1: 9, 2: 'i', 3: 21, 4: '女', 5: '销售经理'},
        {1: 10, 2: 'j', 3: 30, 4: '男', 5: '经理'}
      ]
    }
  },
  methods: {
    exportExcel () {
      var wb = XLSX.utils.table_to_book(
        document.querySelector('#download')
      )
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          this.title + '.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    }
  }
}
</script>