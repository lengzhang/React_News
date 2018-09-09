import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {loadNewsList} from '../../../actions/news';
import {getNewsListByNewsType} from '../../../reducers/news';

import Card from '../../bootstrap/card';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

export class ImageNews extends React.Component {

    static propTypes = {
        // 要获取的新闻的type
        type: PropTypes.string.isRequired,
        // 要获取的新闻的title
        title: PropTypes.string.isRequired,
        // 要获取的新闻的count
        count: PropTypes.number.isRequired,

        // 列表数据
        list: PropTypes.array.isRequired,
        // 加载列表的方法
        loadNewsList: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {}
        console.log("constructor");
    }

    async componentWillMount() {

        await this.props.loadNewsList({newsType: this.props.type, count: this.props.count})

        console.log("newsList");
        //console.log(`list type - ${list}`);
        console.log(this.props.list);
        //console.log(list["top"]);
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    render() {
        const {list} = this.props;
        const imageNewsBlocks = (<div styleName="block_container">
            {
                list.map((item, index) => {
                    let title = (
                        <div styleName="title">{item.title}</div>
                    )
                    return (
                        <div className="p-1" styleName="block">
                            <a href="#" key={index}>
                                <Card image={item.thumbnail_pic_s} subtitle={<div styleName="title">{item.title}</div>} text={<div styleName="title">{item.author_name}</div>}/>
                            </a>
                        </div>
                    )})
            }
        </div>)
        return (<div className="mt-3">
            {console.log("in news/image render")}
            <Card header={this.props.title} text={imageNewsBlocks}/>
        </div>)

    }

}

ImageNews = CSSModules(ImageNews, styles);

const mapStateToProps = (state, props) => {
    return {
        list: getNewsListByNewsType(state, props.type)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadNewsList: bindActionCreators(loadNewsList, dispatch)
    }
}

ImageNews = connect(mapStateToProps, mapDispatchToProps)(ImageNews);

export default ImageNews;
