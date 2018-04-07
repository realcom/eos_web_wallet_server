import React from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import {Layout,Button} from 'antd';


const { Content } = Layout;
@inject('commonStore')
@withRouter
@observer
class CreateWallet extends React.Component {
    state = {
        loading: false,
        iconLoading: false,
      }
    
      enterLoading = () => {
        this.setState({ loading: true });
      }

    render() {
        return <Layout className="default-top-layout create-wallet" >
            <Content className="" style={{margin:"0 auto",display:"flex",flexDirection:"column"}}>
              <h1> you have no wallet!!  </h1>
              <Button style={{justifyContent:"center"}}  type="primary" loading={this.state.loading} onClick={this.enterLoading}>
Create Wallet        </Button>

            </Content>
        </Layout>

    }
}


export default CreateWallet;