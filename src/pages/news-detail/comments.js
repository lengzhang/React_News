import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {loadNewsComments} from '../../actions/news';
import {getUserInfo} from '../../reducers/user';

import Card from '../../components/bootstrap/card';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

// Material-UI
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbar from '../../components/material-ui/snackbars';

export class Comments extends React.Component {

    static propTypes = {
        // 要获取的新闻的id
        id: PropTypes.string.isRequired,
        userinfo: PropTypes.object.isRequired,
        // 加载列表的方法
        loadNewsComments: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            collection_alert: false,
            collection_alert_message: '收藏成功'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addUserCollection = this.addUserCollection.bind(this);
    };

    async componentDidMount() {
        let res = await this.props.loadNewsComments({uniquekey: this.props.id})
        this.setState({comments: res});
    };

    async handleSubmit(event) {
        event.preventDefault();

        const {submit, submitComment} = this.refs;
        if (!submitComment.value) {
            submitComment.focus();
            return false;
        }

        submit.value = '提交评论中...';
        submit.disabled = true;

        var options = {
            method: 'GET'
        };

        let res = await fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${this.props.userinfo.id}&uniquekey=${this.props.id}&commnet=${submitComment.value}`, options).then(response => response.json()).then(resJSON => {
            if (resJSON) {
                submit.value = '评论成功';
                submit.disabled = true;
            } else {
                submit.value = '评论失败';
                submit.disabled = true;
                alert("评论失败")
            }
        }).then(() => {
            setTimeout(() => {
                submit.value = '提交评论';
                submit.disabled = false;
                this.componentDidMount();
            }, 1000)
        })
        console.log(`res - ${res}`);
    }

    async addUserCollection() {
        var options = {
            method: 'GET'
        };
        await fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${this.props.userinfo.id}&uniquekey=${this.props.id}`, options)
        .then(response => response.json())
        .then(json => {
            if (json) {
                this.setState({collection_alert_message: '收藏成功'})
            }
            else {
                this.setState({collection_alert_message: '收藏失败'})
            }
            this.setState({collection_alert: true});
        })
    }

    collectionClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({collection_alert: false});
    }

    render() {
        const {comments, collection_alert} = this.state;
        const {userinfo} = this.props;
        const commentsList = (<div>
            {
                comments.map((comment, index) => {
                    let head = (<div className="row">
                        <div className="col-6 text-left">{comment.UserName}</div>
                        <div className="col-6 text-right">{comment.datetime}</div>
                    </div>)
                    return (<div key={index} className="mb-2"><Card header={head} text={comment.Comments}/></div>)
                })
            }
        </div>)

        const yourComment = (<div>
            <form onSubmit={this.handleSubmit} className="form-group m-0">
                <textarea className="form-control mb-2" ref="submitComment" rows="3"></textarea>

                <input type="submit" ref="submit" className="btn btn-primary btn-block" value="提交评论"/>
                <input type="button" className="btn btn-primary btn-block" onClick={this.addUserCollection} value="收藏该文章"/>
            </form>
        </div>)

        return (<div className="my-3">
            <div className="my-3">
                {
                    userinfo.account == null
                        ? <div className="border rounded text-center py-2">请登录</div>
                        : <Card header="您的评论" text={yourComment}/>
                }
            </div>
            <div className="my-3">
                {
                    comments.length > 0
                        ? <Card header={`评论 (${comments.length})`} text={commentsList}/>
                        : <div className="border rounded text-center py-2">没有加载到任何评论</div>
                }
            </div>
            <MySnackbar vertical='bottom' horizontal='center' open={this.state.collection_alert} autoHideDuration={2000} message={<span>{this.state.collection_alert_message}</span>} onClose={this.collectionClose} variant='success'/>

        </div>)

    }

}

Comments = CSSModules(Comments, styles);

const mapStateToProps = (state, props) => {
    return {userinfo: getUserInfo(state)}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadNewsComments: bindActionCreators(loadNewsComments, dispatch)
    }
}

Comments = connect(mapStateToProps, mapDispatchToProps)(Comments);

export default Comments;
