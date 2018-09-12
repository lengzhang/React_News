import Ajax from '../common/ajax'
import {
    getNewsListByNewsType
} from '../reducers/news'
import Fetch from '../common/fetch'

import nodeFetch from 'node-fetch'

export function loadNewsList({
    newsType,
    count = 20
}) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${newsType}&count=${count}`
            let options = {
                method: 'GET'
            }
            let response = await nodeFetch(url, options).then(response => response.json());
            await dispatch({
                type: 'SET_NEWS_LIST_BY_TYPE',
                newsType,
                data: response
            });
            resolve(null)
        })
    }
}

export function loadNewsContent({
    uniquekey
}) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {

            let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
            let options = {
                method: 'GET'
            }
            let response = await nodeFetch(url, options).then(response => response.json());
            await dispatch({
                type: 'SET_NEWS_BY_UNIQUEKEY',
                uniquekey,
                data: response
            });
            resolve(null)
        })
    }
}

export function loadNewsComments({
    uniquekey
}) {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {

            let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
            let options = {
                method: 'GET'
            }
            let response = await nodeFetch(url, options).then(response => response.json());
            //await dispatch({ type: 'SET_NEWS_BY_UNIQUEKEY', uniquekey, data: response });
            resolve(response)
        })
    }
}
