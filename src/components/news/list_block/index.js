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

export class ListBlock extends React.Component {

    static propTypes = {
        // 要获取的新闻的type
        type: PropTypes.string.isRequired,
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
    }

    async componentWillMount() {
        await this.props.loadNewsList({newsType: this.props.type, count: this.props.count})
    }

    render() {
        const {list} = this.props;

        const newsListBlocks = (<div>
            {
                list.map((item, index) => {

                    return (
                        index < this.props.count ?
                        <div className="mb-2" styleName="title" key={index}>
                            <Link to={`/news/${item.uniquekey}`}>{item.title}</Link>
                        </div>
                        : null
                    )})
            }
        </div>)
        return (<div className="mt-3">
            <Card text={newsListBlocks}/>
        </div>)

    }

}

ListBlock = CSSModules(ListBlock, styles);

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

ListBlock = connect(mapStateToProps, mapDispatchToProps)(ListBlock);

export default ListBlock;
