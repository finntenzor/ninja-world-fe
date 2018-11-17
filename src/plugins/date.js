function fixNumber(x) {
  return x < 10 ? `0${x}` : `${x}`
}

function dateToReadable(date) {
  const y = fixNumber(date.getFullYear())
  const M = fixNumber(date.getMonth() + 1)
  const d = fixNumber(date.getDate())
  const h = fixNumber(date.getHours())
  const m = fixNumber(date.getMinutes())
  const s = fixNumber(date.getSeconds())
  return `${y}-${M}-${d} ${h}:${m}:${s}`
}

Date.prototype.toReadable = function () {
  return dateToReadable(this)
}
