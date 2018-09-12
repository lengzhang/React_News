import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {signOut} from '../../actions/user';
import {getUserInfo} from '../../reducers/user';

import SignModal from '../sign-modal';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

import MediaQuery from 'react-responsive';

// Material UI
import {
    AppBar,
    Button,
    Collapse,
    Fade,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Popper,
    Toolbar,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountBox from '@material-ui/icons/AccountBox';
import {withStyles} from '@material-ui/core/styles';

const sty = theme => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 0
    },
    icon: {
        width: 48,
    }
})

export class Head extends React.Component {

    static propTypes = {
        userinfo: PropTypes.object.isRequired,
        signOut: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
        this.state = {
            folded: false,
            anchorElUserMenu: null,
            userMenuOpen: false,
        }
    }

    async signOut() {
        let [err, success] = await this.props.signOut();
        if (success) {
            // 退出成功跳转到首页
            window.location.href = '/';
            //window.location.href = `${this.props.location.pathname}`;

        } else {
            alert('退出失败');
        }
    }

    handleFolded = () => {
        this.setState(state => ({ folded: !state.folded}));
    }

    handleUserMenu = (event) => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorElUserMenu: currentTarget,
            userMenuOpen: !this.state.userMenuOpen,
        }));
    }

    render() {
        const navBarItemsArr = [
            {
                path: "/",
                title: "头条"
            }, {
                path: "/NewsPage/shehui",
                title: "社会"
            }, {
                path: "/NewsPage/guonei",
                title: "国内"
            }, {
                path: "/NewsPage/guoji",
                title: "国际"
            }, {
                path: "/NewsPage/yule",
                title: "娱乐"
            }, {
                path: "/NewsPage/tiyu",
                title: "体育"
            }, {
                path: "/NewsPage/shishang",
                title: "时尚"
            }
        ]

        const {userinfo} = this.props
        const {classes} = this.props;

        // 用户已登录
        const userBtn = (<div className="btn-group" role="group" aria-label="Basic example">
            <Link to={`/UserCenter`} className="btn btn-outline-primary">{userinfo.account}</Link>
            <button type="button" className="btn btn-outline-primary" onClick={this.signOut}>退出</button>
        </div>)

        const {userMenuOpen, anchorElUserMenu} = this.state;
        const userMenuID = userMenuOpen ? 'user-menu-popper' : null;
        const materialUser = (
            <div>
                <IconButton
                    aria-describedby={userMenuID}
                    onClick={this.handleUserMenu}
                    >
                    <AccountBox/>
                </IconButton>
                <Popper id={userMenuID} open={userMenuOpen} anchorEl={anchorElUserMenu} placement='bottom' transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                         {/*<Paper className='mt-5'><Typography>The content of the Popper.</Typography></Paper>*/}
                         <Paper>
                             <List>
                                 <Link to='/UserCenter'>
                                     <ListItem button onClick={this.handleUserMenu}>
                                         <ListItemText primary={userinfo.account} />
                                     </ListItem>
                                 </Link>
                                 <ListItem
                                     button
                                     onClick={this.signOut}
                                     >
                                     <ListItemText primary='退出' />
                                 </ListItem>
                             </List>
                         </Paper>
                        </Fade>
                      )}
                </Popper>
            </div>
        )

        // 用户未登录
        const signBtn = (<div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#sign" data-type="sign-up">注册</button>
            <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#sign" data-type="sign-in">登录</button>
        </div>)

        return (<header className="container">

            <MediaQuery query='(min-device-width: 1224px)'>
                <nav className="container-fluid navbar fixed-top navbar-expand navbar-light bg-light" styleName="NavBar">
                    <NavLink className="navbar-brand nav-link ml-5" to="/" styleName="logo">
                        <div className="m-0" styleName="icon"></div>
                        <div>ReactNews</div>
                    </NavLink>
                    <div className="navbar-nav mr-auto ml-5">
                        {navBarItemsArr.map((item, index) => (<NavLink key={index} styleName="NavBarItem" className="nav-item nav-link mr-auto" exact={true} to={item.path}>{item.title}</NavLink>))}
                    </div>
                    <div className="mr-5">{
                            userinfo.account
                                ? userBtn
                                : signBtn
                        }</div>
                </nav>
            </MediaQuery>
            <MediaQuery query='(max-device-width: 1224px)'>
                {/*<nav className="navbar fixed-top navbar-expand navbar-light bg-light" styleName="NavBar">
                    <NavLink className="navbar-brand nav-link pl-0 mr-auto" to="/" styleName="logo">
                        <div className="m-0" styleName="icon"></div>
                        <div>ReactNews</div>
                    </NavLink>
                    {userinfo.account ? userBtn : signBtn}
                </nav>*/
                }
                <div className={classes.root}>
                    <AppBar position="fixed" color='default'>
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleFolded}>
                                <MenuIcon/>
                            </IconButton>



                            <Typography variant="title" color="inherit" className={classes.grow}>
                                <Link to='/' styleName="NavBarItem">
                                    <img src='https://s3-us-west-1.amazonaws.com/lengbase/ReactNews/logo.png' className={classes.icon}/> ReactNews
                                </Link>
                            </Typography>
                            {userinfo.account ? materialUser : signBtn}
                        </Toolbar>
                        {/* Material UI 折叠 */}
                        <Collapse in={this.state.folded}  className='border'>
                            <List component='nav'>
                                {navBarItemsArr.map((item, index) => (
                                    <Link key={index} styleName="NavBarItem" to={item.path}>
                                        <ListItem
                                            button
                                            selected={this.props.location.pathname === item.path}
                                            onClick={this.handleFolded}
                                            >
                                            <ListItemText primary={item.title} />
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </Collapse>
                    </AppBar>
                </div>
            </MediaQuery>
            <SignModal path={this.props.location.pathname}/>
        </header>)

    }

}

Head.propTypes = {
    classes: PropTypes.object.isRequired
};

Head = CSSModules(Head, styles);

Head = withStyles(sty)(Head);

const mapStateToProps = (state, props) => {
    return {userinfo: getUserInfo(state)}
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: bindActionCreators(signOut, dispatch)
    }
}

Head = connect(mapStateToProps, mapDispatchToProps)(Head);

export default Head;
