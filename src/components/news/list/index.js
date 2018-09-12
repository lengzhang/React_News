import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadNewsList } from '../../../actions/news';
import { getNewsListByNewsType } from '../../../reducers/news';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

import { Hidden, Grid, Paper, Typography } from '@material-ui/core';
import { Card, CardContent, CardMedia} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const sty = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 100,
    }
})

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
    }

    async componentWillMount() {

        await this.props.loadNewsList({
            newsType: this.props.type,
            count: this.props.count
        })

    }

    render() {
        const {list} = this.props;
        const { classes } = this.props;
        const newsList = (
            list.length ?
            list.map((item, index) => {
                return (
                    <Grid item key={index}>
                        <Link to={`/news/${item.uniquekey}`} styleName='link'>
                            <Card className={classes.card}>
                                <Hidden smDown>
                                    <CardMedia className={classes.cover} image={item.thumbnail_pic_s} title={item.title} />
                                </Hidden>

                                <div className={`${classes.details} w-100`}>
                                    <CardContent className={`${classes.content} py-3`}>
                                        <Typography variant="headline">{item.title}</Typography>
                                            <Grid container direction='row'>
                                                <Grid item xs>
                                                    <Typography variant="subheading" color="textSecondary" align='left'>来源: {item.author_name}</Typography>
                                                </Grid>
                                                <Grid item xs>
                                                    <Typography variant="subheading" color="textSecondary" align='right'>{item.date}</Typography>
                                                </Grid>
                                            </Grid>
                                    </CardContent>
                                </div>
                            </Card>
                        </Link>
                    </Grid>
                )
            })
            :
            <Grid item>
                <Paper className={classes.paper} elevation={1}>
                    <Typography variant="headline" component="h3" align='center'>
                        没有加载到任何新闻
                    </Typography>
                </Paper>
            </Grid>

        )
        return (
            <Grid container direction="column" spacing={32}>
                {newsList}
            </Grid>
        )

    }

}

NewsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

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

export default withStyles(sty)(NewsList);
