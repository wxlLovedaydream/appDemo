import {Component} from 'react';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from 'components/StandardTable';
import {Table,Icon,Popconfirm } from 'antd';

@connect(({ subscribelist ,devicelist}) => ({
  subscribeUrl:subscribelist.subscribeUrl,
  appInfo :devicelist.appInfo,
}))
export default class SubscribeCallbackUrl extends Component{
  componentDidMount(){
    const {dispatch,appInfo} = this.props;
    /*const param = {appId:appInfo.appKey,accessToken:};*/
    console.log(appInfo);
    dispatch({
      type:'subscribelist/fetchSubscribeNotifyType',
      payload:appInfo,
    })
  };
  handleDeleteSubscribe = val =>{
    const {dispatch,appInfo} = this.props;
    console.log(val);
    const param ={...appInfo,subscriptionId:val};
    //param.subscriptionId = val;
    dispatch({
      type:'subscribelist/deleteSubscribeUrl',
      payload:param,
    });
    dispatch({
      type:'subscribelist/fetchSubscribeNotifyType',
      payload:appInfo,
    })

  };
  onSelectRow = selectedRows =>{
    console.log('selectedRows',selectedRows);
  };
  render(){
    const {subscribeUrl} = this.props;
    const {subscriptions=[]} = subscribeUrl;
    console.log(subscriptions);
    const columns = [
      {
        title: '订阅消息',
        dataIndex: 'notifyType',
        /* render:value=><Link >{value}</Link>*/
      },{
        title: '订阅地址',
        dataIndex: 'callbackUrl',
      },{
      title:'操作',
        dataIndex: 'subscriptionId',
        render:(val)=><Popconfirm title="确定删除该订阅吗？"
                               okText="是" cancelText="否"
                               onConfirm={()=>this.handleDeleteSubscribe(val)}>
          <Icon type='delete'/></Popconfirm>,
      }
    ];
  const datas = {data:subscriptions};
    return(<PageHeaderLayout title="订阅接口列表">

        <StandardTable
          columns={columns}
          data={datas}
        />
      {/*  <Table columns={columns}    dataSource={subscriptions}/>*/}


    </PageHeaderLayout>);
  }
}
