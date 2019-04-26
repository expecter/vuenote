<template>
<el-dialog
  title="提示"
  :visible.sync="mgshowDialog"
  width="60%">
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动类型">
        <el-select v-model = 'locale' placeholder="请选择活动区域" style="width: 100%;">
          <el-option  v-for="item in localesList" :label="item.name" :value="item.type" :key="item.type"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</el-dialog>
</template>
<script>
import config from '@/components/config/config'
export default {
  data () {
    return {
      localesList: config.workData(),
      mgshowDialog: false,
      locale: '',
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