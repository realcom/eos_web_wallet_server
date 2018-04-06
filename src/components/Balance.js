import React from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import {Layout,List,Card} from 'antd';

const data = [
  {
    title: 'wallet 1',
      balance: 1
  },
  {
    title: 'wallet 2',
    balance: 2

  },
  {
    title: 'wallet 3',
          balance: 3

  },

];


const { Content } = Layout;
@inject('commonStore')
@withRouter
@observer
class Balance extends React.Component {

    render() {
        return <Layout className="default-top-layout">
            <Content className="">
                <p> username:</p>
                <p>wallet: </p>
                    <List
                     grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                     dataSource={data}
                     renderItem={item => (
                  <List.Item>
                    <Card title={item.title}>balance: {item.balance} EOS                      <button>Send</button></Card>
                  </List.Item>
                )}
              />
                <button>Status</button>
            </Content>
        </Layout>

    }
}


export default Balance;
