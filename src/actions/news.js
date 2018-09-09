import Ajax from '../common/ajax'
import { getNewsListByNewsType } from '../reducers/news'
import Fetch from '../common/fetch'

import nodeFetch from 'node-fetch'

export function loadNewsList({ newsType, count = 20 }) {
  return (dispatch, getState) => {
      return new Promise(async (resolve, reject) => {
          /*
          console.log("loadNewsList");
          let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=2`
          let options = {
              method: 'GET'
          }
          let response = await Fetch({url: url, options: options});
          console.log(response);
          //resolve(response);
          console.log(`newsType - ${newsType}`);
          dispatch({ type: 'SET_NEWS_LIST_BY_TYPE', newsType, data: response })
          await console.log("Got");
          resolve(response);
          */
          await console.log("in loadNewsList");
          let list = [];

          let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${newsType}&count=${count}`
          let options = {
              method: 'GET'
          }
          console.log(url);
          let response = await nodeFetch(url, options).then(response => response.json());
          await console.log(response);
          await dispatch({ type: 'SET_NEWS_LIST_BY_TYPE', newsType, data: response });
          await console.log("in loadNewsList done");
          resolve(null)
      })
  }
}
