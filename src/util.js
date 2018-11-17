export function timePeriodToReadble(val) {
  let left = val
  const second = left % 60
  left = parseInt(left / 60)
  const minute = left % 60
  left = parseInt(left / 60)
  const hour = left % 24
  left = parseInt(left / 24)
  const day = left
  let str = day > 0 ? day + '天' : ''
  str += hour > 0 ? hour + '时' : ''
  str += minute > 0 ? minute + '分' : ''
  str += second > 0 ? second + '秒' : ''
  return str
}
