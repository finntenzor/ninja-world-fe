export default {
  methods: {
    report(err) {
      if (err) {
        if (err.data && err.data.msg) {
          this.$message.error(err.data.msg)
        } else {
          this.$message.error('服务器异常')
        }
      } else {
        this.$message.error('网络异常')
      }
    }
  }
}
