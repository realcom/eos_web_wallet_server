
import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link, withRouter,Redirect} from 'react-router-dom';
import {Button, Checkbox, Form, Icon, Input, Layout} from 'antd';
const { Content } = Layout;
const FormItem = Form.Item;
@inject('userStore', 'commonStore')
@withRouter
@observer
class Home extends React.Component {
    componentDidMount() {
        if(this.props.userStore.currentUser) {
            this.props.history.replace('/balance');
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {currentUser } = this.props.userStore;

        if (currentUser)
          return (
            <Redirect to="/wallet/list"/>
           )
        else
            return (
              <Redirect to="/welcome" />
            )
     

    }
}


export default Form.create()(Home);




// export default class Home extends React.Component {
//     componentDidMount() {
//         this.props.commonStore.loadTags();
//     }
//
//     render() {
//         const {tags, token, appName} = this.props.commonStore;
//         return (
//             <div className="home-page">
//
//
//                 <Banner token={token} appName={appName}/>
//
//                 <div className="container page">
//                     <div className="row">
//                         <MainView/>
//
//                         <div className="col-md-3">
//                             <div className="sidebar">
//
//                                 <p>Popular Tags</p>
//
//                                 <Tags
//                                     tags={tags}
//                                 />
//
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//             </div>
//         );
//     }
// }
