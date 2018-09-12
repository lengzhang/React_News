import React from 'react';
import PropTypes from 'prop-types';
import {loadNewsList} from '../../actions/news';

// http://blog.csdn.net/ISaiSai/article/details/78094556
import {withRouter} from 'react-router-dom';

// 壳组件
import Shell from '../../components/shell';
import Meta from '../../components/meta';

import Carousel from '../../components/bootstrap/carousel'

import ImageNews from '../../components/news/image';
import ListBlock from '../../components/news/list_block';
import Products from '../../components/products';
import NewsList from '../../components/news/list'

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

export class Home extends React.Component {

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

            await loadNewsList({newsType: 'top', count: 2})(store.dispatch, store.getState);
            await loadNewsList({newsType: 'yule', count: 2})(store.dispatch, store.getState);
            resolve({code: 200});
        })
    }

    constructor(props) {
        super(props);
    }

    render() {

        const carousel_images = [
            'https://s3-us-west-1.amazonaws.com/lengbase/ReactNews/carousel_1.jpg',
            'https://s3-us-west-1.amazonaws.com/lengbase/ReactNews/carousel_2.jpg',
            'https://s3-us-west-1.amazonaws.com/lengbase/ReactNews/carousel_3.jpg',
            'https://s3-us-west-1.amazonaws.com/lengbase/ReactNews/carousel_4.jpg'
        ]
        const { classes } = this.props;
        return (<div>

            <Meta title="ReactNews-头条"/>

            <MediaQuery query='(min-device-width: 1224px)'>
                <div className="container-fluid mt-3" styleName="container">
                    <div className="row">

                        <div className="col-4">
                            {/* 轮播图 */}
                            <Carousel id="lunbo" images={carousel_images} interval="3000"/>
                            {/* 图片新闻 */}
                            <ImageNews type="guoji" title="国际头条" count={9} width="33.33%"/>
                        </div>
                        <div className="col-5">
                            {/* 新闻列表 */}
                            <nav>
                                <div className="nav nav-tabs justify-content-center" id="nav-news-list-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-top-tab" data-toggle="tab" href="#nav-top" role="tab" aria-controls="nav-top" aria-selected="true">头条</a>
                                    <a className="nav-item nav-link" id="nav-guoji-tab" data-toggle="tab" href="#nav-guoji" role="tab" aria-controls="nav-guoji" aria-selected="false">国际</a>
                                </div>
                                </nav>
                                    <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-top" role="tabpanel" aria-labelledby="nav-top-tab">
                                        <ListBlock type={'top'} count={25} />
                                    </div>
                                    <div className="tab-pane fade" id="nav-guoji" role="tabpanel" aria-labelledby="nav-guoji-tab">
                                        <ListBlock type={'guoji'} count={25} />
                                    </div>
                            </div>
                        </div>
                        <div className="col-3">
                            {/* ReactNews 产品 */}
                            <nav>
                              <div className="nav nav-tabs justify-content-center" id="nav-prducts-tab" role="tablist">
                                <a className="nav-item nav-link active" id="ReactNewsProducts-tab" data-toggle="tab" href="#ReactNewsProducts" role="tab" aria-controls="ReactNewsProducts" aria-selected="true">ReactNews 产品</a>
                              </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                              <div className="tab-pane fade show active" id="ReactNewsProducts" role="tabpanel" aria-labelledby="ReactNewsProducts-tab">
                                  <Products/>
                              </div>
                            </div>
                        </div>
                    </div>
                    {/* 图片新闻 */}
                    <div className="row container-fluid"><ImageNews type="guonei" title="国内新闻" count={20}  width="100px"/></div>
                    {/* 图片新闻 */}
                    <div className="row container-fluid"><ImageNews type="yule" title="娱乐新闻" count={16 }  width="100px"/></div>

                </div>

            </MediaQuery>
            <MediaQuery query='(max-device-width: 1224px)'>
                <div className={classes.root}>
                    <Grid container direction='row' spacing={0} className="mt-5">
                        <Grid item xs sm></Grid>
                        <Grid item xs={11} sm={7}>
                            <NewsList type='top' count={20} />
                        </Grid>
                        <Grid item xs sm></Grid>
                    </Grid>
                </div>
            </MediaQuery>
        </div>)
    }

}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};


Home = CSSModules(Home, styles);

Home = withStyles(sty)(Home);

Home = withRouter(Home);

export default Shell(Home);
