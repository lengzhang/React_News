import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadNewsList } from '../../../actions/news';
import { getNewsListByNewsType } from '../../../reducers/news';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

export class NewsList extends React.Component {

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
        console.log("constructor");
    }

    async componentWillMount() {


        await this.props.loadNewsList({
            newsType: this.props.type,
            count: this.props.count
        })

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
        const newsList = (
            <div>{list.map((item, index) => {
                    return (
                        <a href="#" key={index}>{item.title}</a>
                    )
                })}</div>
        )
        return (
            <div>
                {console.log("in news/index render")}
                <div>
                    {newsList}
                </div>
            </div>
        )

    }

}

NewsList = CSSModules(NewsList, styles);

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

NewsList = connect(mapStateToProps, mapDispatchToProps)(NewsList);

export default NewsList;
