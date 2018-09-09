import Ajax from '../common/ajax'
import Fetch from '../common/fetch'

// 储存accessToken到redux
export function saveAccessToken({
    accessToken
}) {
    return dispatch => {
        dispatch({
            type: 'SAVE_ACCESS_TOKEN',
            accessToken
        })
    }
}

export function saveUserInfo({
    userinfo
}) {
    return dispatch => {
        dispatch({
            type: 'SAVE_USERINFO',
            userinfo
        })
    }
}

export function signUp({account, password, confirmPassword}) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {

            let signupURL = `http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=${account}&r_password=${password}&r_confirmPassword=${confirmPassword}`
            let signupOptions = {
                method: 'GET'
            }
            let response = await Fetch({url: signupURL, options: signupOptions});

            resolve(response);
        })
    }
}

export function signIn({account, password}) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {

            // 这里写你的登录请求，登录成功以后，将token储存到cookie，使用httpOnly(比较安全)
            // your code ...

            // 配置 fetch url, options
            let signinURL = `http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=${account}&password=${password}&r_userName=${account}&r_password=${password}&r_confirmPassword=${password}`
            let signinOptions = {
                method: 'GET'
            }

            let response = await Fetch({url: signinURL, options: signinOptions});

            if (response != null) {
                // 储存 cookie
                let [err, data] = await Ajax({
                    url: window.location.origin + '/sign/in',
                    method: 'post',
                    data: {
                        userInfo: {
                            id: response.UserId,
                            account: response.NickUserName
                        }
                    }
                })

                if (data && data.success) {
                    resolve([null, true])
                } else {
                    resolve(['sign error'])
                }
            }
            else {
                resolve(['sign error'])
            }
        })
    }
}

export function signOut() {
    return dispatch => {
        return new Promise(async (resolve, reject) => {

            let [err, data] = await Ajax({
                url: window.location.origin + '/sign/out',
                method: 'post'
            })

            if (data && data.success) {
                resolve([null, true])
            } else {
                resolve(['sign error'])
            }

        })
    }
}
