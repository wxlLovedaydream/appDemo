import React, { Component, Fragment } from 'react';
import {Table,Row,Col} from 'antd';
import styles from './DeviceBasic.less';
export default  class DevicBasic extends Component{
  state = {
    deviceDetail:{},
  }
  render(){
    const {deviceDetail} = this.props;
    //{console.log('deviceDetail',deviceDetail)}

    return (
      <div className='container' className={styles.device }  style={{width:'100%'}}>
        <Row className='row'><Col className='col' span={12}>设备名称<p>{deviceDetail.deviceInfo&&deviceDetail.deviceInfo.name}</p></Col>
          <Col span={12}>设备ID<p>{deviceDetail.deviceId}</p></Col></Row>
        <Row><Col span={12}>厂商名称<br/>{deviceDetail.deviceInfo&&deviceDetail.deviceInfo.manufacturerName}</Col>
          <Col span={12}>厂商ID<br/>{deviceDetail.deviceInfo&&deviceDetail.deviceInfo.manufacturerId}</Col></Row>
      </div>

    )
  }
}
