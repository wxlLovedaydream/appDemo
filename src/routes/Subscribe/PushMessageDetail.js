import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from 'components/StandardTable';
import {Table,Icon,Popconfirm} from 'antd';
import { Link } from 'dva/router';
@connect(({ subscribelist ,devicelist}) => ({
  pushData:subscribelist.pushData,
  appInfo:devicelist.appInfo,
  devicePushHistory:subscribelist.devicePushHistory

}))
export default class PushMessageDetail extends Component{
  componentDidMount(){
    const { dispatch ,appInfo,devicePushHistory,match} = this.props;
    const deviceId = match.params.deviceId;
    const param = {
      deviceId:deviceId,
      appId:appInfo.appKey,
    };
    dispatch({
      type: 'subscribelist/fetchDevicePushHistory',
      payload: param,
    });
/*    this.setState({
      deviceDetail:this.props.devicePushHistory
    });*/
  }
render(){
  const columns = [
    {
      title: '设备id',
      dataIndex: 'deviceId',
      key: 'deviceId',
     /* render:(text)=><Link to={`/subscribe/detail/${text}`}>{text}</Link>,*/
    },{
      title: '服务ID',
      dataIndex: 'service.serviceId',
      key: 'service.serviceId',
      render:val=><span>{ JSON.stringify(val)}</span>
    },{
      title: '数据',
      dataIndex: 'service.data',
      key: 'service.data',
      render:val=><span>{ JSON.stringify(val)}</span>
    },{
      title: '时间',
      dataIndex: 'service.eventTime',
      key: 'eventTime',
      render:val=><span>{moment(val).format('YYYY-MM-DD HH:mm:ss')||'— —'}</span>
    },];
  const {devicePushHistory} = this.props;
  // deviceDetail:this.props.devicePushHistory

  const data  = devicePushHistory.map((item)=>{

    return {...item,service:JSON.parse(item.service)};
  });
  const page ={pageSize:10,current:1,}
    return (
      <PageHeaderLayout title="数据推送详情">
        <Table pagination={page} dataSource={data} columns={columns}/>
      </PageHeaderLayout>
    );
}
}
