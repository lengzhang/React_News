import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {loadUserCollections} from '../../actions/user';
import {getUserCollections} from '../../reducers/user';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardMedia, Hidden } from '@material-ui/core';

const sty = theme => ({
    button: {
        margin: theme.spacing.unit,
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

export class CollectionsBlock extends React.Component {

    static propTypes = {
        // 列表数据
        collections: PropTypes.array.isRequired,
        // 加载列表的方法
        loadUserCollections: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {}
    };

    async componentWillMount() {
        await this.props.loadUserCollections()
    };

    render() {
        const { classes } = this.props;
        const {collections} = this.props;

        return (
            <Grid container direction='column' spacing={16} >
                {
                    collections.map((item, index) => {
                        return (
                            <Grid item key={index}>
                                <Card className={classes.card}>
                                    {/*<CardHeader title={index+1} className={`${classes.header} border-right`}/>*/}
                                    <Hidden smDown>
                                        <CardContent className={`${classes.content} p-2`}>
                                            <Typography variant='title' component="div" className="my-2">{item.Title}</Typography>
                                        </CardContent>
                                    </Hidden>
                                    <Hidden smUp>
                                        <Typography variant='title' component="div" className="my-2">{item.Title}</Typography>
                                    </Hidden>

                                    <Link to={`/news/${item.uniquekey}`} styleName='link'>
                                        <Button variant="contained" className={classes.button} >查看收藏的文章</Button>
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

CollectionsBlock = CSSModules(CollectionsBlock, styles);

const mapStateToProps = (state, props) => {
    return {
        collections: getUserCollections(state)
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadUserCollections: bindActionCreators(loadUserCollections, dispatch)
    }
}

CollectionsBlock = connect(mapStateToProps, mapDispatchToProps)(CollectionsBlock);

export default withStyles(sty)(CollectionsBlock);
