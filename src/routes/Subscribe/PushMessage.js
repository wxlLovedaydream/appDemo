import {Component} from 'react';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from 'components/StandardTable';
import {Table,List,Card,Button,} from 'antd';
import { Link } from 'dva/router';
import styles from '../Home/Appinfos.less';
import Ellipsis from 'components/Ellipsis';
@connect(({ subscribelist ,devicelist}) => ({
  pushData:subscribelist.pushData,
  appInfo:devicelist.appInfo,
  deviceDataChanged:subscribelist.deviceDataChanged

}))
export default class PushMessage extends Component{
  componentDidMount(){
    const {dispatch,appInfo} = this.props;
    dispatch({
      type:'subscribelist/fetchDeviceDataChanged',
      payload:appInfo,
    });
  }
  refreshData = () =>{
    const {dispatch,appInfo} = this.props;
    dispatch({
      type:'subscribelist/fetchDeviceDataChanged',
      payload:appInfo,
    });
  }
  render(){
    const {deviceDataChanged} = this.props;
    return(<PageHeaderLayout title="数据推送">
      <Button type="primary" onClick={()=>this.refreshData()}>刷新</Button>
      <div className={styles.cardList} style={{marginTop:'10px'}}>
        <List
          rowKey="id"
          /*loading={loading}*/
          grid={{ gutter: 24, lg:2, md: 2, sm: 1, xs: 1 }}
          dataSource={deviceDataChanged}
          renderItem={item =>
              <List.Item key={item.appKey} >
                <Card hoverable className={styles.card} >
                  <Card.Meta
                    title={<span>设备数据</span>}
                    description={
                      <Ellipsis className={styles.item} lines={5}>
                        <span> 应用key</span>: {item.appKey}<br/>
                        <span>设备id </span> : {item.deviceId}<br/>
                        <span>服务</span> : {JSON.parse(item.service).serviceId}<br/>
                        <span>数据</span> : {JSON.stringify(JSON.parse(item.service).data)}<br/>
                        <span>时间</span> : {moment(JSON.parse(item.service).eventTime).format('YYYY-MM-DD HH:mm:ss')}
                      </Ellipsis>
                    }
                  />
                </Card>
              </List.Item>
          }
        />
      </div>
    </PageHeaderLayout>);
  }
}
