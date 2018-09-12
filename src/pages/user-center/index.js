import React from 'react';
import PropTypes from 'prop-types';
import {loadUserComments, loadUserCollections} from '../../actions/user';
import {getUserCollections} from '../../reducers/user';

// http://blog.csdn.net/ISaiSai/article/details/78094556
import {withRouter} from 'react-router-dom';

// 壳组件
import Shell from '../../components/shell';
import Meta from '../../components/meta';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

// Material UI
import { AppBar, Tab, Tabs } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentsBlock from './comments-block';
import CollectionsBlock from './collections-block';

const sty = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    }
})

export class UserCenter extends React.Component {

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

            await loadUserComments()(store.dispatch, store.getState);
            await loadUserCollections()(store.dispatch, store.getState);
            //console.log(await getUserCollections(store.getState()));

            resolve({code: 200});
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            tabSelect: 0,
        }
    }



    handleChange = (event, value) => {
        this.setState({ tabSelect: value });
    }

    handleChangeIndex = index => {
        this.setState({ tabSelect: index });
    };

    render() {
        const { classes, theme } = this.props;
        return (<div>

            <Meta title="ReactNews-用户中心"/>

            <div className={classes.root}>
                <Grid container direction='row' spacing={0} className="mt-5">
                    <Grid item xs sm></Grid>
                    <Grid item xs={11} sm={7} className='border border-top-0 rounded'>
                        <AppBar position="static" color="inherit">
                            <Tabs
                                value={this.state.tabSelect}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                fullWidth
                                centered
                                >
                                <Tab label="评论" />
                                <Tab label="收藏" />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.tabSelect}
                            onChangeIndex={this.handleChangeIndex}
                            >
                            <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                                <CommentsBlock/>
                            </Typography>
                            <Typography component="div" dir={theme.direction} style={{ padding: 8 * 3 }}>
                                <CollectionsBlock />
                            </Typography>
                        </SwipeableViews>
                    </Grid>
                    <Grid item xs sm></Grid>
                </Grid>
            </div>


        </div>)
    }

}

UserCenter.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

UserCenter = CSSModules(UserCenter, styles);

UserCenter = withRouter(UserCenter);

export default Shell(withStyles(sty, { withTheme: true })(UserCenter));
