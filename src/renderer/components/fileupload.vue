<template>
<el-dialog
  title="提示"
  :visible.sync="mgshowDialog"
  width="60%">
  <div>
      <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handleAvatarSuccess"
  :before-remove="beforeRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
</el-upload>
  </div>
</el-dialog>
</template>
<script>
// import XLSX from 'xlsx'
export default {
  data () {
    return {
      mgshowDialog: false,
      fileList: []
    }
  },
  props: ['showUploadDialog'],
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      console.log(fileList)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除${file.name}？`)
    },
    handleAvatarSuccess (res, file) {
      console.log('hahahah', file)
      const fs = require('fs')
      fs.readFile(file.raw.path, 'utf-8', (err, dataStr) => {
        if (err) throw err
        console.log(dataStr)
      })
      // var XLSX = require('xlsx')
      // let obj = XLSX.parse(file.raw.path)
      // console.log(obj)
    }
  },
  watch: {
    fileList (data) {
      console.log(data)
    },
    showUploadDialog () {
      this.mgshowDialog = true
    }
  }
}
</script>