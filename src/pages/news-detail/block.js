import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {loadNewsContent} from '../../actions/news';
import {getNewsByUniqueKey} from '../../reducers/news';

import Meta from '../../components/meta';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

export class Block extends React.Component {

    static propTypes = {
        // 要获取的新闻的id
        id: PropTypes.string.isRequired,

        // 列表数据
        news: PropTypes.object.isRequired,
        // 加载列表的方法
        loadNewsContent: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {}
    };

    async componentWillMount() {
        await this.props.loadNewsContent({uniquekey: this.props.id})
    };

    render() {
        const {news} = this.props;

        return (<div className="p-3 border rounded">
            <Meta title={news.title}/>
            {
                typeof(news.pagecontent) == undefined ? <div>新闻正在加载中...</div> : <div dangerouslySetInnerHTML={{__html:news.pagecontent}} />
            }
        </div>)

    }

}

Block = CSSModules(Block, styles);

const mapStateToProps = (state, props) => {
    return {
        news: getNewsByUniqueKey(state, props.id)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadNewsContent: bindActionCreators(loadNewsContent, dispatch)
    }
}

Block = connect(mapStateToProps, mapDispatchToProps)(Block);

export default Block;
