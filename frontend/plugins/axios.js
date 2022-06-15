export default ({
  $axios,
  store
}, inject) => {
  inject('axios', $axios)
}
