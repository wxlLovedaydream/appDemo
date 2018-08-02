import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
@connect(({ devicelist }) => ({
  devicelist
}))
export default class DeviceList extends Component{

  render(){
    return <div></div>
  }
}
