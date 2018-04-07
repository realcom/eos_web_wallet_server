import React from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter, Link} from 'react-router-dom';
import {Layout, List, Card, Icon, Row, Col, Badge, Button, Modal, Input} from 'antd';
import {action, observable} from "mobx";
import agent from '../agent';
// const wallets = [
//     {
//         title: 'wallet 1',
//         balance: 1.2,
//         id: 1,
//     },
//     {
//         title: 'wallet 2',
//         balance: 22,
//         id: 2,
//
//     },
//     {
//         title: 'wallet 3',
//         balance: 31,
//         id: 3,
//
//     },
//
// ];


const {Content} = Layout;

@inject('commonStore', 'walletsStore')
@withRouter
@observer
class ListWallet extends React.Component {
    @observable createWalletModalShown = false;
    @observable walletName = null;
    componentDidMount() {
        this.props.walletsStore.loadWallets()
    }

    @action showCreateWalletModal() {
        this.createWalletModalShown = true;
    }

    async createWalletAct() {
        await agent.Wallets.createWallet(this.walletName)
        this.props.walletsStore.loadWallets()
    }

    @action hideCreateWalletModal() {
        this.createWalletModalShown = false
    }


    render() {
        const wallets = this.props.walletsStore.wallets;
        return <Layout className="default-top-layout">
            <Modal
              title="Basic Modal"
              visible={this.createWalletModalShown}
              onOk={this.createWalletAct.bind(this)}
              onCancel={this.hideCreateWalletModal.bind(this)}
            >
              <Input placeholder="wallet name" onChange={e => this.walletName = e.target.value}/>
            </Modal>
            <Content>
                <h2>wallets: </h2>
                <Row gutter={16} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>

                    {wallets.map(wallet => {
                        return <Col xs={1} sm={2} md={4} lg={4} xl={6} xxl={3} key={wallet.id}
                                    style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                            <p style={{textAlign: "center"}}><Badge status="processing"/>{wallet.walletName} </p>
                            <Badge count={"balance: " + wallet.balance} style={{backgroundColor: '#52c41a'}}/>
                            <Link to={"/send/" + wallet.title} style={{textAlign: "center"}}><Icon
                                type="retweet"/> transaction </Link>
                        </Col>
                    })}
                </Row>
                <Button onClick={this.showCreateWalletModal.bind(this)}>Create Wallet</Button>
            </Content>
        </Layout>

    }
}


export default ListWallet;
