<template>
<el-dialog
  title="提示"
  :visible.sync="mgshowDialog"
  width="60%">
  <div>
    <el-tag
    :key="data.type"
    v-for="data in dynamicTags"
    closable
    :disable-transitions="false"
    @close="handleClose(data)">
    {{data.type}}
  </el-tag>
  <el-input
    class="input-new-tag"
    v-if="inputVisible"
    v-model="inputValue"
    ref="saveTagInput"
    size="small"
    @keyup.enter.native="handleInputConfirm"
  >
  </el-input>
  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</el-dialog>
</template>
<script>
import typeCache from '@/obj/typeCache'
export default {
  data () {
    return {
      localesList: typeCache.workData(),
      mgshowDialog: false,
      locale: '',
      msg: '',
      form: {},
      dynamicTags: typeCache.workData(),
      inputVisible: false,
      inputValue: ''
    }
  },
  props: ['showTypeDialog'],
  watch: {
    showTypeDialog () {
      this.mgshowDialog = true
    }
  },
  methods: {
    handleClose (tag) {
      typeCache.delWorkData(tag.type)
      this.dynamicTags = typeCache.workData()
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      // if (inputValue) {
      //   this.dynamicTags.push(inputValue)
      // }
      typeCache.addWorkData(inputValue)
      this.dynamicTags = typeCache.workData()
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>