import React, { Component } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip,Form,Select,Input,Button } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
const { Option } = Select;
const FormItem = Form.Item;
/*const AppForm = Form.create()(props =>{
  const {form,list,selectVisible,selectApp,handleSelectApp,handleSelectVisible} = props;
  console.log('selectVisible',selectVisible);
 const handleselectApp=list=>{
    console.log(list);
  }
  const handleselectVisible=e=>{
   //console.log(e);
  }
  return(
    <div>当前应用：
      <span >
        <Button onClick={handleselectVisible}>
          {(selectApp.appKey||list.length)? (selectApp.appKey||list[0].appKey):''}
        </Button>
        <Select style={{width:'100%'}}
                ref='myselect'
                defaultActiveFirstOption={true}>
            { list.map((value, index, array)=>{
              return (<Option value={value.appKey} key={value.appKey}>{value.appKey} </Option>)
            })}</Select>
       </span>
    </div>

);
});*/
export default class GlobalHeader extends Component {
  state={
    selectVisible:false,
    selectApp:{},
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  getNoticeData() {
    const { notices } = this.props;
    if (notices == null || notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  handleSelectApp = appKey =>{
   let {list,selectApp} = this.props;
   /*console.log(list);
   console.log(appKey);*/
  const app= list.filter((currentValue,index,arr)=>{
     return currentValue.appKey==appKey&&currentValue;
    })
    selectApp(app[0]);
  };
  render(){
      const { currentUser = {},collapsed,fetchingNotices,isMobile, logo,
      onNoticeVisibleChange,onMenuClick,onNoticeClear,list=[],} = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
       {/* <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Item key="triggerError" disabled>
          <Icon type="close-circle" />触发报错
        </Menu.Item>*/}
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
     let selectApp =this.state.selectApp;
      return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
         {/* <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="站内搜索"
            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />
          <Tooltip title="使用文档">
            <a
              target="_blank"
              href="http://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
              className={styles.action}
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
          <NoticeIcon
            className={styles.action}
            count={currentUser.notifyCount}
            onItemClick={(item, tabProps) => {
              console.log(item, tabProps); // eslint-disable-line
            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}
          >
            <NoticeIcon.Tab
              list={noticeData['通知']}
              title="通知"
              emptyText="你已查看所有通知"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['消息']}
              title="消息"
              emptyText="您已读完所有消息"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['待办']}
              title="待办"
              emptyText="你已完成所有待办"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            />
          </NoticeIcon>*/}
          {list.length&& <Select style={{width:'300px'}}
                     defaultValue={list[0].appKey} ref='myselect'
                    onChange={this.handleSelectApp}>
            { list.map((value, index, array)=>{
              return (<Option value={value.appKey} key={value.appKey}>{value.appName} </Option>)
            })}</Select>}
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
               {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />*/}
                <Icon size="small" className={styles.avatar} type="user" />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }
}
