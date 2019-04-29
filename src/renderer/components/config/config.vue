<script>
export default {
  workData: function () {
    this.tlWork = [
      {type: '加班', color: 'leisure'}
    ]
    if (localStorage.tlNewWorkType) {
      var tlEvent = localStorage.tlNewWorkType.split(',')
      for (let event in tlEvent) {
        var needAdd = true
        for (let index in this.tlWork) {
          if (this.tlWork[index].type === tlEvent[event]) {
            needAdd = false
            break
          }
        }
        if (needAdd) {
          this.tlWork.push({type: tlEvent[event], color: 'leisure'})
        }
      }
    }
    return this.tlWork
  },
  addWorkData: function (val) {
    if (localStorage.tlNewWorkType) {
      var tlEvent = localStorage.tlNewWorkType.split(',')
      if (tlEvent.indexOf(val) !== -1) {
        return
      }
      tlEvent.push(val)
      localStorage.tlNewWorkType = tlEvent
    } else {
      localStorage.tlNewWorkType = val
    }
  },
  delWorkData: function (val) {
    if (localStorage.tlNewWorkType) {
      var tlEvent = localStorage.tlNewWorkType.split(',')
      if (tlEvent.indexOf(val) !== -1) {
        tlEvent.splice(tlEvent.indexOf(val), 1)
      }
      localStorage.tlNewWorkType = tlEvent
    }
  }
}
</script>
