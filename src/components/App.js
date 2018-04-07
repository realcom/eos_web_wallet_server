import {CustomFooter, CustomHeader} from './CustomLayout';
import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import PrivateRoute from './PrivateRoute';

import Article from './Article';
import Editor from './Editor';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import Settings from './Settings';
import ListWallet from './ListWallet';
import Send from './Send';
import Transactions from './Transactions';

import 'antd/dist/antd.css';
import '../styles/main.scss';
import CreateWallet from './CreateWallet';
import Welcome from './Welcome';

@inject('userStore', 'commonStore')
@withRouter
@observer
export default class App extends React.Component {

    componentWillMount() {
        if (!this.props.commonStore.token) {
            this.props.commonStore.setAppLoaded();
        }
    }

    componentDidMount() {
        if (this.props.commonStore.token) {
            this.props.userStore.pullUser()
                .finally(() => this.props.commonStore.setAppLoaded());
        }
    }

    render() {
        if (this.props.commonStore.appLoaded) {
            return (
                <div>
                    <CustomHeader/>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/editor/:slug?" component={Editor}/>
                        <Route path="/article/:id" component={Article}/>
                        <Route path="/send/" component={Send}/>
                        <Route path="/transactions" component={Transactions}/>
                        <Route path="/wallet/create" component={CreateWallet}/>
                        <Route path="/wallet/list" component={ListWallet}/>
                        <Route path="/welcome" component={Welcome}/>
                        <PrivateRoute path="/settings" component={Settings}/>
                        <Route path="/@:username" component={Profile}/>
                        <Route path="/@:username/favorites" component={Profile}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                    <CustomFooter/>
                </div>
            );
        }
        return (
            <CustomHeader/>
        );
    }
}
