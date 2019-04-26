<script>
export default {
  workData: function () {
    this.tlWork = [
      {type: 'work', color: 'leisure'},
      {type: 'health', color: 'health'},
      {type: 'sport', color: 'sport'}
    ]
    if (localStorage.tlNewWorkType) {

    }
    return this.tlWork
  }
}
</script>
