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
import typeCache from '@/obj/typeCache'
import localCache from '@/obj/localCache'
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
      const fs = require('fs')
      fs.readFile(file.raw.path, 'utf-8', (err, dataStr) => {
        if (err) throw err
        localStorage.clear()
        var jsonObj = JSON.parse(dataStr)
        for (let index in jsonObj) {
          var objData = jsonObj[index]
          if (objData[3]) {
            typeCache.addWorkData(objData[3])
          }
          localCache.addEvent(objData)
          let setEvent = new Event('setTypeEvent')
          window.dispatchEvent(setEvent)
        }
        this.mgshowDialog = false
      })
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