export default () => {
  const token = process.env.userback
  if (token) {
    window.Userback = window.Userback || {}
    Userback.access_token = token;
    (function (d) {
      const s = d.createElement('script'); s.async = true
      s.src = 'https://static.userback.io/widget/v1.js';
      (d.head || d.body).appendChild(s)
    })(document)
  }
}
