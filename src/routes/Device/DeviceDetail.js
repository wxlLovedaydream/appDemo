import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Link,routerRedux } from 'dva/router';
import { Tabs ,Button,Icon} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DeviceBasic from '../../components/Device/DeviceBasic';
import DeviceCommand from '../../components/Device/DeviceCommand';
import HistoryData from '../../components/Device/HistoryData';
const TabPane = Tabs.TabPane;

@connect(({ devicelist }) => ({
  appInfo:devicelist.appInfo,
  deviceList:devicelist.deviceList,
  deviceDetail:devicelist.deviceDetail,
  deviceCMD:devicelist.deviceCMD,
  serviceCapabilities:devicelist.serviceCapabilities,
  deviceHistoryData:devicelist.deviceHistoryData,
}))

export default class DeviceList extends Component{
  state={
    deviceDetail:{},
  }
  componentDidMount(){
    const { dispatch ,appInfo,deviceList,match} = this.props;
    const index = match.params.index;
   // console.log(index);
    //console.log('deviceList',deviceList);
    const param = {
      deviceId:deviceList.devices[index].deviceId,
      gatewayId:deviceList.devices[index].gatewayId,
      appId:appInfo.appKey,
      accessToken:appInfo.accessToken,
      refreshToken:appInfo.refreshToken,
    };
    //console.log('param',param);
    dispatch({
      type: 'devicelist/queryDeviceDetail',
      payload: param,
    });
    this.setState({
      deviceDetail:this.props.deviceDetail
    });
  // console.log('deviceDetail',this.props.deviceDetail);
  }
 /* getDeviceCapabilities = () =>{
    const { dispatch ,appInfo,deviceList,match} = this.props;
    const index = match.params.index;
    // console.log(index);
    //console.log('deviceList',deviceList);
    const param = {
      deviceId:deviceList.devices[index].deviceId,
      gatewayId:deviceList.devices[index].gatewayId,
      appId:appInfo.appKey,
      accessToken:appInfo.accessToken,
      refreshToken:appInfo.refreshToken,
    };
    dispatch({
      type: 'devicelist/queryDeviceCapabilities',
      payload: param,
    });
  }*/
  getDeviceDetail = () =>{
    const { dispatch ,appInfo,deviceList,match} = this.props;
    const index = match.params.index;
    const param = {
      deviceId:deviceList.devices[index].deviceId,
      appId:appInfo.appKey,
      accessToken:appInfo.accessToken,
      refreshToken:appInfo.refreshToken,
    };
    dispatch({
      type: 'devicelist/add',
      payload: {}
    });
  };
  getDeviceHistory = () =>{
    const { dispatch } = this.props;

  }
 /* getDeviceCmd = () =>{
    const { dispatch } = this.props;
    dispatch()
  }*/
  callback=(key)=> {
    console.log(key);
    const { dispatch ,appInfo,deviceList,match} = this.props;
    const index = match.params.index;
    const param = {
      deviceId:deviceList.devices[index].deviceId,
      gatewayId:deviceList.devices[index].gatewayId,
      appId:appInfo.appKey,
      accessToken:appInfo.accessToken,
      refreshToken:appInfo.refreshToken,
    };
    switch (key){
      case 'basic':
        break;
      case 'history':
        dispatch({
          type:'devicelist/fetchDeviceHistoryData',
          payload:param,
        });
      break;
      case 'cmd':
       // console.log(key);
        dispatch({
          type:'devicelist/queryDeviceCMD',
          payload:param,
        });
        dispatch({
          type: 'devicelist/queryDeviceCapabilities',
          payload: param,
        });
      break;
    }

  }
  deviceCMDSend=(val)=>{

    const { dispatch ,appInfo,deviceList,match} = this.props;
    const index = match.params.index;
    const param = {
      deviceId:deviceList.devices[index].deviceId,
      gatewayId:deviceList.devices[index].gatewayId,
      appId:appInfo.appKey,
      accessToken:appInfo.accessToken,
      refreshToken:appInfo.refreshToken,
    };
  /*  dispatch({
      type:'devicelist/sendDeviceCMD',
      payload:param,
    });*/
  let sendDeviceCMD= this.sendDeviceCMD(val);
    sendDeviceCMD.next(param);
    sendDeviceCMD.next();
  }
  *sendDeviceCMD (val){
    const { dispatch } = this.props;
    dispatch({
      type:'devicelist/sendDeviceCMD',
      payload:val,
    });
    yield  dispatch({
      type:'devicelist/queryDeviceCMD',
      payload:val,
    });
  }
  backToDeviceList = () =>{
    console.log('backToDeviceList');
    routerRedux.replace({
      pathname: '/device/devicelist',
    })
  }
render(){
  const {deviceDetail,deviceCMD,serviceCapabilities,appInfo,
    deviceList,match,deviceHistoryData} = this.props;
  const index = match.params.index;
  // console.log(index);
  //console.log('deviceList',deviceList);
  const param = {
    deviceId:deviceList.devices[index].deviceId,
    appId:appInfo.appKey,
    accessToken:appInfo.accessToken,
    refreshToken:appInfo.refreshToken,
  };
  /*状态	命令ID	命令创建时间	命令内容*/
  /* DEFAULT 表示未下发
 EXPIRED 表示命令已经过期
 SUCCESSFUL 表示命令已经成功执行
 FAILED 表示命令执行失败
 TIMEOUT 表示命令下发执行超时
 CANCELED 表示命令已经被撤销执行*/
  const cmdStatus = {
    'DELIVERED':'已送达',
    'DEFAULT':'未下发',
    'EXPIRED':'缓存超期',
    'SUCCESSFUL':'执行成功',
    'FAILED':'执行失败',
    'TIMEOUT':'执行超时',
    'CANCELED':'命令取消',
    'PENDING':'等待下发',
    'SENT':'已发送',
  }
  const tableMenu =[
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text => <span>{cmdStatus[text]||text}</span>,
    },{
      title: '命令ID',
      dataIndex: 'commandId',
      key: 'commandId',
    },{
      title: '命令创建时间',
      dataIndex: 'creationTime',
      key: 'creationTime',
      render:val=><span>{moment(val).format('YYYY-MM-DD HH:mm:ss')||'— —'}</span>
    },{
      title: '命令内容',
      dataIndex: 'command',
      key: 'command',
      render:val=><span>{ JSON.stringify(val)}</span>
    },
  ];
  const columns =[
    {
      title:'设备信息',
      key:'basic',
      component:<DeviceBasic deviceDetail={deviceDetail}/>
    },
    {
      title:'历史数据',
      key:'history',
      component:<HistoryData  deviceHistoryData={deviceHistoryData}/>
    },
    {
      title:'设备命令',
      key:'cmd',
      component:<DeviceCommand  tableMenu={tableMenu} param={param}
                                deviceCMDSend={this.deviceCMDSend}
                                {...this.props}/>
    },

  ];
  return (
    <PageHeaderLayout title="设备详情">
{/*      <Button onClick={this.backToDeviceList}>
        <Icon type="left" />返回
        </Button>*/}
      <Tabs defaultActiveKey="basic" onChange={this.callback}>
        {columns.map((curr)=> <TabPane tab={curr.title} key={curr.key}>{curr.component}</TabPane>)}
      </Tabs>
    </PageHeaderLayout>
  )
}
}
