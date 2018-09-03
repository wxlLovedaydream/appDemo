import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from 'components/StandardTable';
import {Table,Icon,Popconfirm} from 'antd';
import { Link } from 'dva/router';
@connect(({ devicelist }) => ({
  appInfo:devicelist.appInfo,
  deviceList:devicelist.deviceList,
  }))
export default class DeviceList extends Component{
  componentDidMount(){
    const {dispatch,appInfo,deviceList} = this.props;
    //const {appInfo} = devicelist;
    console.log('appInfo',appInfo);
    dispatch({
      type:'devicelist/fetch',
      payload:appInfo,
    });
}
  handleStandardTableChange=(pagination, filtersArg, sorter)=>{
    //console.log(e);
  };
  onPageChange = (page, pageSize) =>{
    console.log(page);
    console.log(pageSize);
  }
  handleDeleteDevice = deviceId =>{
    // console.log(item);

    const {dispatch,appInfo,deviceList} = this.props;
    const param = {...appInfo,deviceId}
    //const {appInfo} = devicelist;
    console.log('appInfo',appInfo);
    dispatch({
      type:'devicelist/deleteSingleDevice',
      payload:param,
    });
  }

  render(){
    const {  deviceList, } = this.props;
    const datas = {
      data:deviceList.devices,
      pagination:deviceList.pagination,
      onChange :this.onPageChange
    };
    const devicestatus = {
        'ONLINE':'在线',
        'OFFLINE':'离线',
        'ABNORMAL':'异常',
    }
    //console.log(appInfo);
    const columns = [
      {
        title: '状态',
        dataIndex: 'deviceInfo.status',
        render:value=><span >{devicestatus[value]}</span>

      },{
        title:'名称',
        dataIndex:'deviceInfo.name',
        render:(text, record, index)=><Link to={`/device/devicedetail/${index}`}>{text||'— —'}</Link>,
      },/*{
      title:'设备ID',
        dataIndex:'deviceId',
    },*/{
        title:'设备识别码',
        dataIndex:'deviceInfo.nodeId',
        render:val=><span>{val||'— —'}</span>,
      },{
      title:'厂商名称',
        dataIndex:'deviceInfo.manufacturerName',
        render:val=><span>{val||'— —'}</span>,
      },{
      title:'厂商ID',
        dataIndex:'deviceInfo.manufacturerId',
        render:val=><span>{val||'— —'}</span>,
      },{
      title:'协议',
        dataIndex:'deviceInfo.protocolType',
        render:val=><span>{val||'— —'}</span>,
      },{
        title:'创建时间',
        dataIndex:'createTime',
         render:val => <span>{moment(val).format('YYYY-MM-DD ')||'— —'}</span>,

      },
      {
        title:'操作',
        dataIndex:'deviceId',
        key:'deviceInfo',
        render:(val) => <Popconfirm title="确定删除该设备吗？"  onConfirm={()=>this.handleDeleteDevice(val)}>  <Icon type="delete" /> </Popconfirm> ,

      },

    ];
    return (
      <PageHeaderLayout title="设备列表">
        <StandardTable
          columns={columns}
          data={datas}
        />
      </PageHeaderLayout>
    );
  }
}
