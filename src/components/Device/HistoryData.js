import React, { Component, Fragment } from 'react';
import {Table,Row,Col} from 'antd';
import moment from 'moment';
export default class HistoryData extends Component{
  componentDidMount(){
    /*const fetchHistoryData = this.props;
    fetchHistoryData();*/
  }
  render(){
    const {deviceHistoryData} = this.props;
    console.log(deviceHistoryData);
  // const {deviceDataHistoryDTOs} = deviceHistoryData;
    const tableMenu =[
      {
        title: '服务ID',
        dataIndex: 'serviceId',
        key: 'serviceId',
        /* render: text => <a href="javascript:;">{text}</a>,*/
      },{
        title: '数据',
        dataIndex: 'data',
        key: 'data',
        render:val=><span>{ JSON.stringify(val)}</span>
      },{
        title: '时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render:val=><span>{moment(val).format('YYYY-MM-DD HH:mm:ss')||'— —'}</span>
      },
    ];
    return (<div style={{backgroundColor:'white',}}>
      <Table
        columns={tableMenu}
       dataSource={deviceHistoryData&&deviceHistoryData.deviceDataHistoryDTOs}
      />
    </div>)
  }
}
