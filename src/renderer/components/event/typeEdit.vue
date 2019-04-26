<template>
<el-dialog
  title="提示"
  :visible.sync="mgshowDialog"
  width="60%">
  <div>
    <el-form ref="form" :model="form" label-width="80px">    
    </el-form>
  </div>
</el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        mgshowDialog: false,
        form: {}
      }
    },
    props: ['showTypeDialog'],
    watch: {
      showTypeDialog () {
        this.mgshowDialog = true
      }
    },
    methods: {
      onSubmit () {
      }
    }
  }
</script>