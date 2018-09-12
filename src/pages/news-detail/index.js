import React from 'react';
import PropTypes from 'prop-types';
import {loadNewsContent} from '../../actions/news';
import { getNewsByUniqueKey } from '../../reducers/news';

// http://blog.csdn.net/ISaiSai/article/details/78094556
import {withRouter} from 'react-router-dom';

// 壳组件
import Shell from '../../components/shell';
import Meta from '../../components/meta';
import NewsBlock from './block';
import CommentsBlock from './comments';

import Card from '../../components/bootstrap/card'

import MediaQuery from 'react-responsive';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

// Material UI
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const sty = theme => ({
    root: {
        flexGrow: 1,
    }
})

export class NewsDetail extends React.Component {

    // 服务端渲染
    // 加载需要在服务端渲染的数据
    static loadData({store, match}) {
        return new Promise(async function(resolve, reject) {

            /* 敲黑板～ 这里是重点～～～～～～～～～～～（为了引起你的注意，我写了这句话） */

            /*
             * 这里的 loadPostsList 方法，是在服务端加载 posts 数据，储存到 redux 中。
             * 这里对应的组件是 PostsList，PostsList组件里面也有 loadPostsList 方法，但它是在客户端执行。
             * 然后，服务端在渲染 PostsList 组件的时候，我们会先判断如果redux中，是否存在该条数据，如果存在，直接拿该数据渲染
             */

            const { id } = match.params;
            await loadNewsContent({uniquekey: id})(store.dispatch, store.getState);
            resolve({code: 200});
        })
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {id} = this.props.match.params;
        const { classes } = this.props;
        return (<div>

            <Meta title="新闻"/>

            <div className={classes.root}>
                <Grid container direction='row' spacing={0} className="mt-2">
                    <Grid item xs sm></Grid>
                    <Grid item xs={11} sm={6}>
                        <NewsBlock id={id} />
                        <CommentsBlock id={id} />
                    </Grid>
                    <Grid item xs sm></Grid>
                </Grid>
            </div>

            {/*<MediaQuery query='(min-device-width: 1224px)'>
                <div className="container mt-3" styleName="container">
                    <NewsBlock id={id} />
                    <CommentsBlock id={id} />
                </div>

            </MediaQuery>
            <MediaQuery query='(max-device-width: 1224px)'>
                <div className="container mt-3">手机新闻</div>
                    <NewsBlock id={id} />
                    <CommentsBlock id={id} />
            </MediaQuery>*/}
        </div>)
    }

}

NewsDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

NewsDetail = CSSModules(NewsDetail, styles);

NewsDetail = withStyles(sty)(NewsDetail);

NewsDetail = withRouter(NewsDetail);

export default Shell(NewsDetail);
