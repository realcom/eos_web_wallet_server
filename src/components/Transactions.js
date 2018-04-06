import React from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import {Layout,Table} from 'antd';

const columns = [{
  title: 'Transactions',
  dataIndex: 'tx',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Time',
  dataIndex: 'time',
}, {
  title: 'from',
  dataIndex: 'from',
}, {
  title: 'to',
  dataIndex: 'to',
}, {
  title: 'amount',
  dataIndex: 'amount',
}
];
const data = [ {
    key:'1',
    tx:"0f11",
    time:"2017-01-01",
    from:'you',
    to:'me',
    amount:'1'
},{
    key:'2',
    tx:"0f22",
    time:"2017-02-01",
    from:'you',
    to:'me',
    amount:''
}]


const { Content } = Layout;
@inject('commonStore')
@withRouter
@observer
class Balance extends React.Component {

    render() {
        return <Layout className="default-top-layout">
            <Content className="">
            <h1> wallet transactions </h1>
                <Table columns={columns} dataSource={data}/>
            </Content>
        </Layout>

    }
}


export default Balance;
