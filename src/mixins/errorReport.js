export default {
  methods: {
    report(err) {
      if (err && err.data && err.data.msg) {
        this.$message.error(err.data.msg)
      } else if (err && err.message) {
        this.$message.error(err.message)
      } else if (err && err.data && err.ret) {
        this.$message.error('服务器错误')
      } else {
        this.$message.error('未知错误')
      }
    }
  }
}
