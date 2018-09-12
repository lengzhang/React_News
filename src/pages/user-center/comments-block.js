import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {loadUserComments} from '../../actions/user';
import {getUserComments} from '../../reducers/user';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardMedia } from '@material-ui/core';

const sty = theme => ({
    button: {
        margin: theme.spacing.unit*2,
    },
    card: {
        display: 'flex'
    },
    header: {
        width: 100,
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto'
    },
    cover: {
        width: 151,
        height: 151,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

export class CommentsBlock extends React.Component {

    static propTypes = {
        // 列表数据
        comments: PropTypes.array.isRequired,
        // 加载列表的方法
        loadUserComments: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {}
    };

    async componentWillMount() {
        await this.props.loadUserComments()
    };

    render() {
        const { classes } = this.props;
        const {comments} = this.props;

        return (
            <Grid container direction='column' spacing={16} >
                {
                    comments.map((item, index) => {
                        return (
                            <Grid item key={index}>
                                <Card className={classes.card}>
                                    {/*<CardHeader title={index+1} className={`${classes.header} border-right`}/>*/}
                                    <CardContent className={`${classes.content} p-1`}>
                                        <Typography variant='title' component="div" className="my-2">{item.Comments}</Typography>
                                        <Typography variant='body1' component="div">评论于 {item.datetime} </Typography>
                                    </CardContent>

                                    <Link to={`/news/${item.uniquekey}`} styleName='link'>
                                        <Button variant="contained" className={classes.button} >查看评论的文章</Button>
                                    </Link>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }

}

CommentsBlock = CSSModules(CommentsBlock, styles);

const mapStateToProps = (state, props) => {
    return {
        comments: getUserComments(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadUserComments: bindActionCreators(loadUserComments, dispatch)
    }
}

CommentsBlock = connect(mapStateToProps, mapDispatchToProps)(CommentsBlock);

export default withStyles(sty)(CommentsBlock);
