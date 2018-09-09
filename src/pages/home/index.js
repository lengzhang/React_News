import React from 'react';
import PropTypes from 'prop-types';
import {loadNewsList} from '../../actions/news';

// http://blog.csdn.net/ISaiSai/article/details/78094556
import {withRouter} from 'react-router-dom';

// 壳组件
import Shell from '../../components/shell';
import Meta from '../../components/meta';

import Carousel from '../../components/bootstrap/carousel'

import NewsList from '../../components/news/list';
import ImageNews from '../../components/news/image';

import MediaQuery from 'react-responsive';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

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
            await console.log("loadData in home");
            resolve({code: 200});
        })
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
            await console.log("componentDidMount in home");
    }

    render() {
        const carousel_images = [
            'https://s3-us-west-1.amazonaws.com/lengbase/ReactNews/carousel_1.jpg',
            'https://s3-us-west-1.amazonaws.com/lengbase/ReactNews/carousel_2.jpg',
            'https://s3-us-west-1.amazonaws.com/lengbase/ReactNews/carousel_3.jpg',
            'https://s3-us-west-1.amazonaws.com/lengbase/ReactNews/carousel_4.jpg'
        ]

        return (<div>

            <Meta title="首页"/>
            {console.log("in home")}

            <MediaQuery query='(min-device-width: 1224px)'>
                <div className="container-fluid mt-3" styleName="container">
                    <div className="row">
                        <div className="col-4">
                            <Carousel id="lunbo" images={carousel_images} interval="3000"/>
                            <ImageNews type="guoji" title="国际头条" count={9} />
                        </div>
                        <div className="col-5">
                            <NewsList type={'top'} count={3} />
                        </div>
                        <div className="col-3">
                            <NewsList type={'yule'} count={3} />
                        </div>
                    </div>
                </div>

            </MediaQuery>
            <MediaQuery query='(max-device-width: 1224px)'>
                <div className="container mt-3">手机首页</div>
            </MediaQuery>
        </div>)
    }

}

Home = CSSModules(Home, styles);

Home = withRouter(Home);

export default Shell(Home);
