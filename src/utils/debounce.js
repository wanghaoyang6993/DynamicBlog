export default function debounce(fun, delay) {
  let timer = null
  return function(...args) {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fun(...args)
    }, delay);
  }
}