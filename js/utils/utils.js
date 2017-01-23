function getUrlWithPathAndParams(path, params) {
  var url = path
  if (params) {
      let paramsArray = []
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
      if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')
      } else {
          url += '&' + paramsArray.join('&')
      }
  }
  return url
}

module.exports = {getUrlWithPathAndParams}
