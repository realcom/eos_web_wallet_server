import React from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter,Link} from 'react-router-dom';
import {Layout,List,Card, Icon, Row, Col,Badge} from 'antd';

const wallets = [
  {
    title: 'wallet 1',
      balance: 1.2
  },
  {
    title: 'wallet 2',
    balance: 22

  },
  {
    title: 'wallet 3',
          balance: 31

  },

];


const { Content } = Layout;
@inject('commonStore')
@withRouter
@observer
class ListWallet extends React.Component {

    render() {
        return <Layout className="default-top-layout">
            <Content >
                <h2>wallets: </h2>
                    <Row gutter={16} style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        
                            {wallets.map(wallet => {
                                return <Col xs={1} sm={2} md={4} lg={4} xl={6} xxl={3} style={{display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
                                  <p style={{textAlign:"center"}}><Badge status="processing"/>{wallet.title} </p>
                                  <Badge count={"balance: "+wallet.balance} style={{ backgroundColor: '#52c41a' }}/>
                                  <Link to={"/send/"+wallet.title} style={{textAlign:"center"}}><Icon type="retweet" /> transaction </Link>
                                </Col>
                            })}
                    </Row>
            </Content>
        </Layout>

    }
}


export default ListWallet;
