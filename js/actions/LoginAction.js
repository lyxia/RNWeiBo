import ActionTypes from '../actions/ActionTypes'
import {access_token, get_token_info, getUid,getUserInfo} from '../server/API' 

//使用code，就用code去请求token登陆
//不使用code，就从本地拉取token登陆
export function login(code) {
    return (dispatch)=>{
        //发送开始登陆的消息
        dispatch({
            type:ActionTypes.LOGIN_START
        })

        fetchUserInfo(code)
        .then((userInfo)=>{
            //登陆成功
            console.log(`登陆成功---token:${userInfo.access_token}--uid:${userInfo.uid}--info:${JSON.stringify(userInfo.userInfo)}`)
            saveUserInfo(userInfo)
            dispatch({
                type:ActionTypes.LOGIN_SUCCESS,
                userInfo
            })
        })
        .catch((error)=>{
            console.log(error)
            //登陆失败
            removeUserInfo()
            dispatch({
                type:ActionTypes.LOGIN_FAILURE
            })
        })
    }
}

export function loginOut() {
    return (dispatch)=>{
        removeUserInfo()
        .then(()=>{
            dispatch({
                type:ActionTypes.LOGIN_OUT
            })
        })
    }
}

async function fetchUserInfo(code) {
    //拿到合法的token
    let token = null
    if(code) {
        token =  await access_token(code)
    } else {
        const {access_token} = await storage.load({key:'userInfo'})
        const responseJson = await get_token_info(access_token)
        token = {...responseJson, access_token}
    }
    //使用token拿到userInfo
    const {uid} = await getUid(token.access_token)
    const userInfo = await getUserInfo(token.access_token, uid)
    return {access_token:token.access_token, uid, userInfo}
}

async function saveUserInfo(info) {
    try {
        storage.save({
            key:'userInfo',
            rawData: info
        })
    } catch (error) {
        console.log(error)
    }
}

async function removeUserInfo() {
    try {
        storage.remove({key:'userInfo'})
    } catch (error) {
        console.log(error)
    }
}