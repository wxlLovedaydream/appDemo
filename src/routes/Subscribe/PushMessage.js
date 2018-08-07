import {Component} from 'react';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from 'components/StandardTable';
import {Table,} from 'antd';
import { Link } from 'dva/router';
@connect(({ subscribelist ,devicelist}) => ({

}))
export default class PushMessage extends Component{
  render(){
    return(<PageHeaderLayout title="数据接收">nfdhovejvb</PageHeaderLayout>);
  }
}
