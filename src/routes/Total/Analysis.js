import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {  Row,  Col,  Icon,  Card,  Tabs,  Table,
  Radio,  DatePicker,  Tooltip,  Menu,  Dropdown,} from 'antd';
import numeral from 'numeral';
import {  ChartCard,  yuan,  MiniArea,  MiniBar,
  MiniProgress,  Field,  Bar,  Pie,  TimelineChart,} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
export default class Analysis extends Component {
  render (){
    return (  <PageHeaderLayout title="统计信息">
    fefegege
    </PageHeaderLayout>);
  }
}
