import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {signOut} from '../../actions/user';
import {getUserInfo} from '../../reducers/user';

import SignModal from '../sign-modal';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

import MediaQuery from 'react-responsive';

export class PCHead extends React.Component {

    static propTypes = {
        userinfo: PropTypes.object.isRequired,
        signOut: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    async signOut() {
        let [err, success] = await this.props.signOut();
        if (success) {
            // 退出成功跳转到首页
            window.location.href = '/';
        } else {
            alert('退出失败');
        }
    }

    render() {
        const navBarItemsArr = [
            {
                path: "/",
                title: "头条"
            }, {
                path: "/shehui",
                title: "社会"
            }, {
                path: "/guonei",
                title: "国内"
            }, {
                path: "/guoji",
                title: "国际"
            }, {
                path: "/yule",
                title: "娱乐"
            }, {
                path: "/tiyu",
                title: "体育"
            }, {
                path: "/shishang",
                title: "时尚"
            }
        ]

        const {userinfo} = this.props

        // 用户已登录
        const userBtn = (<div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-outline-primary">{userinfo.account}</button>
            <button type="button" className="btn btn-outline-primary" onClick={this.signOut}>退出</button>
        </div>)

        // 用户未登录
        const signBtn = (<div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#sign" data-type="sign-up">注册</button>
            <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#sign" data-type="sign-in">登录</button>
        </div>)

        return (<header className="container">

            <MediaQuery query='(min-device-width: 1224px)'>
                <nav className="navbar fixed-top navbar-expand navbar-light bg-light" styleName="NavBar">
                    <NavLink className="navbar-brand nav-link" to="/" styleName="logo">
                        <div className="m-0" styleName="icon"></div>
                        <div>ReactNews</div>
                    </NavLink>
                    <div className="navbar-nav mr-auto ml-5">
                        {navBarItemsArr.map((item, index) => (<NavLink key={index} styleName="NavBarItem" className="nav-item nav-link mr-auto" exact={true} to={item.path}>{item.title}</NavLink>))}
                    </div>
                    {userinfo.account ? userBtn : signBtn}
                </nav>
            </MediaQuery>
            <MediaQuery query='(max-device-width: 1224px)'>
                <nav className="navbar fixed-top navbar-expand navbar-light bg-light" styleName="NavBar">
                    <NavLink className="navbar-brand nav-link pl-0 mr-auto" to="/" styleName="logo">
                        <div className="m-0" styleName="icon"></div>
                        <div>ReactNews</div>
                    </NavLink>
                    {userinfo.account ? userBtn : signBtn}
                </nav>
            </MediaQuery>
            <SignModal/>
        </header>)

    }

}

PCHead = CSSModules(PCHead, styles);

const mapStateToProps = (state, props) => {
    return {userinfo: getUserInfo(state)}
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: bindActionCreators(signOut, dispatch)
    }
}

PCHead = connect(mapStateToProps, mapDispatchToProps)(PCHead);

export default PCHead;
