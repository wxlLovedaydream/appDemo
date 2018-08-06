import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {  Row, Col,  Card, Form, Input, Select,
  Icon,  Button, Dropdown, Menu, InputNumber, DatePicker,
  Modal, message, Badge, Divider,List} from 'antd';
import Ellipsis from 'components/Ellipsis';
const FormItem = Form.Item;
import styles from './Appinfos.less';
const CreateForm = Form.create()(props => {
  //console.log(props);
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
      });
    };
  return (
    <Modal
      title="新建应用"
      visible={modalVisible}
      onOk={okHandle}

      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="appKey">
        {form.getFieldDecorator('appKey', {
          rules: [{ required: true, message: '请输入正确的key...' }],
        })(<Input placeholder="请输入应用的key"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="appSecret">
        {form.getFieldDecorator('appSecret', {
          rules: [{ required: true, message: '请输入正确的secret...' }],
        })(<Input placeholder="请输入应用的secret"/>)}
      </FormItem>
    </Modal>
  );
});
@connect(({ appinfoLists, loading }) => ({
  appinfoLists,
  loading: loading.effects['appinfoLists/fetch'],
}))
// @Form.create()
export default class Appinfos extends Component{
    state={
      appList: [],
      modalVisible:false,
      username:'',
    };

  componentDidMount(){
    const { dispatch ,appinfoLists} = this.props;
    const {username}=appinfoLists;
   // console.log('appinfoLists/fetch',appinfoLists);

      this.setState({
        username: username,
      });
      dispatch({
        type: 'appinfoLists/fetch',
        payload: {username},
      });
  }


  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  handleAdd = fields => {
    const { dispatch } = this.props;
    console.log('fields',fields);
    console.log('username',this.state.username);
    dispatch({
      type: 'appinfoLists/add',
      payload: {
        appKey:fields.appKey,
        appSecret:fields.appSecret,
        username:this.state.username,
      },
    });
    this.setState({
      modalVisible: false,
    });
  };
  render(){
    const {appinfoLists}=this.props;
    const {  modalVisible } = this.state;
    //console.log(this.props);
    const{list} = appinfoLists;
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          展示了应用的信息
        </p>
      </div>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="应用列表" content={content} >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            /*loading={loading}*/
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...list]}
            renderItem={item =>
              item ? (

                  <List.Item key={item.appKey} data-secret={item.appSecret}>
                    <Card hoverable className={styles.card} >
                      <Card.Meta
                        title={<a href="#">应用信息</a>}
                        description={
                          <Ellipsis className={styles.item} lines={6}>
                            <span> key</span>: {item.appKey}<br/>
                             <span>secret</span>: {item.appSecret}<br/>
                            <span>token</span>:{item.accessToken}<br/>
                            <span>refresh</span>:{item.refreshToken}<br/>
                            <span>expiresIn</span>: {item.expiresIn}<br/>
                          </Ellipsis>
                        }
                      />
                    </Card>
                  </List.Item>) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton} onClick={() => this.handleModalVisible(true)}>
                            <Icon type="plus" /> 新增应用
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    )
  }
}
