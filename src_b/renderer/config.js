let workData = function () {
  if (localStorage.tlNewWorkType) {

  }
  return this.tlWork
}
export default {
  data () {
    return {
      tlWork: [
        {name: '工作', type: 'work', color: ''}
      ]
    }
  },
  workData: function () {
    if (localStorage.tlNewWorkType) {

    }
    return this.tlWork
  },
  methods: {
    workData
  }
}
  