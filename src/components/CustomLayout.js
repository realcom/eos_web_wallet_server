import React from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {Layout, Menu} from "antd";

const {Header, Footer} = Layout;
const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Sign in
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Sign up
                    </Link>
                </li>

            </ul>
        );
    }
    return null;
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/editor" className="nav-link">
                        <i className="ion-compose"/>&nbsp;New Post
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                        <i className="ion-gear-a"/>&nbsp;Settings
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/@${props.currentUser.username}`}
                        className="nav-link"
                    >
                        <img src={props.currentUser.image} className="user-pic" alt=""/>
                        {props.currentUser.username}
                    </Link>
                </li>

            </ul>
        );
    }

    return null;
};

@inject('userStore', 'commonStore')
@observer
class CustomHeader extends React.Component {
    render() {
        return (
            <Header>
                <div className="logo">My Eos Wallet</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{lineHeight: '64px'}}
                >
                    {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
                    {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
                    {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                </Menu>
            </Header>
        );
    }
}

class CustomFooter extends React.Component {
    render() {
        return (
            <Footer style={{textAlign: 'center'}}>
                EOS Web Wallet ©2018 Created by Decipher x GXC
            </Footer>
        )
    }
}

export {
    CustomHeader,
    CustomFooter,
};

