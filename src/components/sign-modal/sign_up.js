import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { signIn, signUp } from '../../actions/user';
// styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';



export class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.signup = this.signup.bind(this);
      }

    async signup(event) {
        event.preventDefault();

        const {account, password, confirmPassword, submit} = this.refs;
        const { signIn, signUp } = this.props;

        if (!account.value) {
            account.focus();
            return false;
        }
        if (!password.value) {
            password.focus();
            return false;
        }
        if (!confirmPassword.value) {
            confirmPassword.focus();
            return false;
        }

        if (password.value != confirmPassword.value) {
            password.focus();
            return false;
        }

        submit.value = '注册中...';
        submit.disabled = true;

        // 注册
        if (!(await signUp({ account: account.value, password: password.value }))) {
            submit.value = '注册';
            submit.disabled = false;
            alert('注册失败');
        }

        // 登录
        submit.value = '注册成功, 登录中...';
        let [err, success] = await signIn({ account: account.value, password: password.value });

        if (success) {
            // 登录成功跳转到首页
            //alert('登录成功');
            window.location.href = '/';
        }
        else {
            submit.value = '注册';
            submit.disabled = false;
            alert('注册失败');
        }
        return false;
    }

    render() {

        return (
            <form onSubmit={this.signup} className="form-group">
                <div>
                    <input type="text" className="form-control" ref="account" placeholder="请输入您的账号" />
                </div>
                <div>
                    <input type="password" className="form-control my-2" ref="password" placeholder="请输入您的密码" onFocus={(e)=>{ e.target.value = ''; }}/>
                </div>
                <div>
                    <input type="password" className="form-control mb-2" ref="confirmPassword" placeholder="请再次输入您的密码" onFocus={(e)=>{ e.target.value = ''; }}/>
                </div>
                <div>
                    <input type="submit" ref="submit" className="btn btn-primary btn-block" value="注册"/>
                </div>
            </form>
        )
    }
}

SignUp = CSSModules(SignUp, styles);

SignUp.propTypes = {
    signIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
    signUp: bindActionCreators(signUp, dispatch)
  }
}

SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUp;
