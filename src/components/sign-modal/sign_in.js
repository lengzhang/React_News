import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { signIn } from '../../actions/user';
// styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';



export class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.signin = this.signin.bind(this);
      }

    async signin(event) {
        event.preventDefault();

        const {account, password, submit} = this.refs;
        const { signIn } = this.props;

        if (!account.value) {
            account.focus();
            return false;
        }
        if (!password.value) {
            password.focus();
            return false;
        }

        submit.value = '登录中...';
        submit.disabled = true;

        let [err, success] = await signIn({ account: account.value, password: password.value });

        if (success) {
          // 登录成功跳转到首页
            window.location.href = '/';
        } else {
            submit.value = '登录';
            submit.disabled = false;
            alert('登录失败');
        }
        return false;
    }

    render() {

        return (
            <form onSubmit={this.signin} className="form-group">
                <div>
                    <input type="text" className="form-control" ref="account" placeholder="请输入您的账号" />
                </div>
                <div>
                    <input type="password" className="form-control my-2" ref="password" placeholder="请输入您的密码" onFocus={(e)=>{ e.target.value = ''; }}/>
                </div>
                <div>
                    <input type="submit" ref="submit" className="btn btn-primary btn-block" value="登录"/>
                </div>
            </form>
        )
    }
}

SignIn = CSSModules(SignIn, styles);

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: bindActionCreators(signIn, dispatch)
  }
}

SignIn = connect(mapStateToProps,mapDispatchToProps)(SignIn);

export default SignIn;
