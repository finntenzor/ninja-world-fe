module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://develop.tiaozhan.com/',
        changeOrigin: true
      }
    }
  }
}
