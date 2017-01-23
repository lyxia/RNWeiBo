import {getUrlWithPathAndParams} from '../utils/utils'
import url from 'url'
import {tokenInfo, removeToken} from '../actions/TokenAction'
import {dispatch} from '../stores/configureStore'

const baseUrl = 'https://api.weibo.com/'
const redirect_uri = 'https://api.weibo.com/oauth2/default.html'
const client_id = '2616702839'
const client_secret ='f9367dbf58e427f1d270013aa83e8782'

const oauth2Url = baseUrl + 'oauth2/'
//获取授权url
export function getAuthURL() {
  let path = oauth2Url + "authorize"
  return getUrlWithPathAndParams(path, {
    client_id:client_id,
    redirect_uri:redirect_uri,
    forcelogin: true
  })
}

//获取请求access_token的code
export function getCode(navState) {
  var urlObj = url.parse(navState.url, true);
  if (urlObj.pathname == url.parse(redirect_uri).pathname) {
    // 获取code
    return urlObj.query.code;
  }
  return 0
}

//获取access_token
export function access_token(code) {
  let path = oauth2Url + 'access_token'
  let url = getUrlWithPathAndParams(path, {
    client_id: client_id,
    client_secret: client_secret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirect_uri
  })
  return sendPostRequest(url, {})
}

//查询用户access_token的授权相关信息，包括授权时间，过期时间和scope权限。
export function get_token_info(token) {
  let path = oauth2Url + 'get_token_info'
  let url = getUrlWithPathAndParams(path,{
    access_token: token
  })
  return sendPostRequest(url, {})
}

//------------------------------------------用户信息----------------------------
const accountUrl = baseUrl + '2/account/'
export function getUid() {
  let path = accountUrl + 'get_uid.json'
  return sendGetRequest(path,{
    access_token: tokenInfo.access_token
  })
}

//--------------------------------------------信息接口API------------------------------------------
//获取主页列表信息
const statusesUrl = baseUrl + '2/statuses/'
export function home_timeline(page, count) {
  let path = statusesUrl + 'home_timeline.json'
  return sendGetRequest(path,{
    access_token: tokenInfo.access_token,
    page: page,
    count: count
  })
}

//转发一条微博
export function repost(id){
  let path = statusesUrl + 'repost.json'
  let url = getUrlWithPathAndParams(path,{
    access_token: tokenInfo.access_token,
    id
  })
  return sendPostRequest(url, {})
}

//添加一条收藏
const favoritesUrl = baseUrl + '2/favorites/'
function favorites_create(id) {
  let path = favoritesUrl + 'create.json'
  let url = getUrlWithPathAndParams(path, {
    access_token: tokenInfo.access_token,
    id
  })
  return sendPostRequest(url, {})
}
//删除一条收藏
export function favorites_destroy(id) {
  let path = favoritesUrl + 'destroy.json'
  let url = getUrlWithPathAndParams(path,{
    access_token: tokenInfo.access_token,
    id
  })
  return sendPostRequest(url,{})
}

//评论
const commentsUrl = baseUrl + '2/comments/'
export function comment_create(comment, id) {
  let path = commentsUrl + 'create.json'
  let url = getUrlWithPathAndParams(path,{
    access_token: tokenInfo.access_token,
    comment,
    id
  })
  return sendPostRequest(url, {})
}

//获取评论列表
export function comment_show(page, count, args){
  let path = commentsUrl + 'show.json'
  return sendGetRequest(path, {
    access_token: tokenInfo.access_token,
    page,
    count,
    id:args.id
  })
}

//-------------------------------------Get/Post请求-----------------------------------------

function sendPostRequest(url, body, headers=null) {
  return request(url, {
    method: 'Post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

function sendGetRequest(url, params, headers=null) {
  return request(getUrlWithPathAndParams(url, params), {
    method: 'Get',
    headers: {
      'Accept': 'application/json'
    }
  })
}

class APIError extends Error {
    constructor(message, code, origin) {
    super(message);
    this.code = code;
    this.origin = origin;
  }
}

//不用捕获异常，就是让外部处理异常
async function request(url, options) {
    console.log(`start request url=${url}`)
    const response = await fetch(url, options)
    const responseJson = await response.json()
    if(response.status != 200) {
      if(responseJson.error_code == 21332) {
        //token失效
        dispatch(removeToken())
        throw new APIError(responseJson.error, responseJson.error_code, responseJson)
      }
      throw new APIError(responseJson.error, responseJson.error_code, responseJson)
    }
    return responseJson
}
