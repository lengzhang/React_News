import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, Redirect} from 'react-router-dom';
import MediaQuery from 'react-responsive';

// 生成异步加载组件
import {asyncRouteComponent} from '../components/generateAsyncComponent.js';

import Head from '../components/head';

/**
 * 创建路由
 * @param  {Object} userinfo 用户信息，以此判断用户是否是登录状态，并控制页面访问权限
 * @return {[type]}
 */
export default(user) => {

    const triggerEnter = (Layout, props) => {
        return <Layout {...props}/>
    }

    // 路由数组
    const routeArr = [
        {
            path: '/',
            exact: true,
            head: Head,
            component: asyncRouteComponent({
                loader: () => import ('../pages/home')
            }),
            enter: triggerEnter
        }
    ]

    let router = () => (<div>

        <Switch>
            {routeArr.map((route, index) => (<Route key={index} path={route.path} exact={route.exact} component={route.head}/>))}
        </Switch>
        {
        <Switch>
            {
                routeArr.map((route, index) => {
                    if (route.component) {
                        return (<Route key={index} path={route.path} exact={route.exact} component={props => route.enter(route.component, props)}/>)
                    }
                })
            }
        </Switch>

        }
    </div>)

    return {list: routeArr, dom: router}
}
