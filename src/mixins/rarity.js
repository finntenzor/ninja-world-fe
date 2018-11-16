export default {
  // 过滤器，有兴趣自查
  filters: {
    rarityToReadable(val) {
      // 1代表N，2代表R，3代表SR，4代表SSR，5代表UR
      const map = {
        1: 'N',
        2: 'R',
        3: 'SR',
        4: 'SSR',
        5: 'UR'
      }
      return map[val] || '?'
    }
  },
  computed: {
    rarityColor() {
      // 1代表N，2代表R，3代表SR，4代表SSR，5代表UR
      const map = {
        1: '#000000',
        2: '#ea1e63',
        3: '#4cb050',
        4: '#1976d3',
        5: '#9c28b1'
      }
      return map[this.rarity] || 'grey'
    }
  }
}
