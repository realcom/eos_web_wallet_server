
import React from 'react';
import {inject, observer} from 'mobx-react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Checkbox, Form, Icon, Input, Layout} from 'antd';
const { Content } = Layout;
const FormItem = Form.Item;
@inject('commonStore')
@withRouter
@observer
class Home extends React.Component {
    componend
    render() {
        const { getFieldDecorator } = this.props.form;
        return <Layout className="default-top-layout">
            <Content className="">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                      })(
                        <Checkbox>Remember me</Checkbox>
                      )}
                      <a className="login-form-forgot" href="">Forgot password</a>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                      </Button>
                        Or <Link to="/register">Register</Link>
                    </FormItem>
                  </Form>
            </Content>
        </Layout>

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
