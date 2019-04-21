<script>
export default {
  workData: function () {
    this.tlWork = [
      {name: '工作', type: 'work', color: 'leisure'},
      {name: '健康', type: 'health', color: 'health'},
      {name: '运动', type: 'sport', color: 'sport'}
    ]
    if (localStorage.tlNewWorkType) {

    }
    return this.tlWork
  }
}
</script>
