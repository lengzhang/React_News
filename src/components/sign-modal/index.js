import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// components
import Modal from '../bootstrap/modal';
import SignIn from './sign_in';
import SignUp from './sign_up';

// styles
import CSSModules from 'react-css-modules';
import styles from './style.scss';

@CSSModules(styles)
export default class SignModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'sign-in'
        }
        this.displayComponent = this.displayComponent.bind(this)
    }

    displayComponent() {
        this.setState({
            type: this.state.type == 'sign-up'
                ? 'sign-in'
                : 'sign-up'
        })
    }

    componentDidMount() {

        const self = this;

        $('#sign').on('show.bs.modal', function(e) {
            self.setState({
                type: e.relatedTarget['data-type'] || e.relatedTarget.getAttribute('data-type') || 'sign-in'
            });
        });

    }

    render() {
        const {type} = this.state;

        const title = (type == 'sign-in') ? '登录' : '注册';

        const body = (<div>
            {type == 'sign-in'
            ? <SignIn displayComponent={this.displayComponent}/>
            : <SignUp displayComponent={this.displayComponent}/>}
        </div>);

        const footer = (
            <div>
                {type == 'sign-in'
                ? <div>没有账号？ <a href="javascript:void(0)" onClick={this.displayComponent}>注册</a></div>
                : <div>已经有账号了？ <a href="javascript:void(0)" onClick={this.displayComponent}>登录</a></div>}
            </div>
        );

        return (<div>
            <Modal id="sign" title={title} body={body} footer={footer}/>
        </div>)
    }
}
