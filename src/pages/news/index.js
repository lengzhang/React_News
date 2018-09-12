import React from 'react';
import PropTypes from 'prop-types';
import {loadNewsContent} from '../../actions/news';
import { getNewsByUniqueKey } from '../../reducers/news';

// http://blog.csdn.net/ISaiSai/article/details/78094556
import {withRouter} from 'react-router-dom';

// 壳组件
import Shell from '../../components/shell';
import Meta from '../../components/meta';

import NewsList from '../../components/news/list'

import CSSModules from 'react-css-modules';
import styles from './style.scss';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const sty = theme => ({
    root: {
        flexGrow: 1,
    }
})

export class NewsPage extends React.Component {

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

            await loadNewsList({newsType: `${match.params.type}`, count: 2})(store.dispatch, store.getState);
            resolve({code: 200});
        })
    }

    constructor(props) {
        super(props);
        console.log(`props.match.params.id - ${props.match.params.id}`);
        this.state = {
            title: () => {

                switch(props.match.params.type) {
                    case 'shehui': return '社会';
                        break;
                    case 'guonei': return '国内';
                        break;
                    case 'guoji': return '国际';
                        break;
                    case 'yule': return '娱乐';
                        break;
                    case 'tiyu': return '体育';
                        break;
                    case 'shishang': return '时尚';
                        break;
                    default: return '新闻';
                }
            }
        }
    }

    render() {
        const {id} = this.props.match.params;
        const { classes } = this.props;
        return (<div>

            <Meta title={`ReactNews-${this.state.title()}`}/>
            <div className={classes.root}>
                <Grid container direction='row' spacing={0} className="mt-5">
                    <Grid item xs sm></Grid>
                    <Grid item xs={11} sm={7}>
                        <NewsList type={this.props.match.params.type} count={20} />
                    </Grid>
                    <Grid item xs sm></Grid>
                </Grid>
            </div>
        </div>)
    }

}

NewsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

NewsPage = CSSModules(NewsPage, styles);
NewsPage = withRouter(NewsPage);

export default Shell(withStyles(sty)(NewsPage));
