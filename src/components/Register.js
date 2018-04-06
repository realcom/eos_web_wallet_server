import {Link} from 'react-router-dom';
import React from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Checkbox, Form, Icon, Input, Layout} from 'antd';
const { Content } = Layout;
const FormItem = Form.Item;

@inject('authStore')
@observer
class Register extends React.Component {

    componentWillUnmount() {
        this.props.authStore.reset();
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            this.props.authStore.setEmail(values.email);
            this.props.authStore.setUsername(values.username);
            this.props.authStore.setPassword(values.password);
            try {
                this.props.authStore.register()
                .then(() => this.props.history.replace('/'));
            } catch (error) {
                console.log(error);
            }
        })

    }

    render() {
        const {values, errors, inProgress} = this.props.authStore;
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout className="default-top-layout">
            <Content className="">
                <Form onSubmit={this.handleSubmit.bind(this)} className="signup-form">
                    <FormItem>
                      {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('username', {
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

                    <Button type="primary" htmlType="submit" className="login-form-button">
                          Sign up
                    </Button>

                  </Form>
            </Content>
        </Layout>
        );
    }
}

export default Form.create()(Register);
