import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {  Row, Col,  Card, Form, Input, Select,Alert,
  Icon,  Button, Dropdown, Menu, InputNumber, DatePicker,
  Modal, message, Badge, Divider,List,Popconfirm} from 'antd';
import Ellipsis from 'components/Ellipsis';
const FormItem = Form.Item;
import styles from './Appinfos.less';
const CreateForm = Form.create()(props => {
  //console.log(props);
  const { modalVisible, form, handleAdd, handleModalVisible,config,type,editapp,handleEditComfirm } = props;
  console.log('CreateForm',type);
  console.log('CreateForm',editapp);
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if(type=='add'){
          handleAdd(fieldsValue);
        }else{
          handleEditComfirm(fieldsValue);
        }

      });
    };
  return (
    <Modal
      title="新建应用"
      visible={modalVisible}
      onOk={okHandle}

      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="应用名称">
        {form.getFieldDecorator('appName', {
          rules: [{ required: true, message: '请输入应用名称' }],
          initialValue:type==='edit'?editapp.appName:undefined,
        })(<Input placeholder="请输入应用的名称"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="应用ID">
        {form.getFieldDecorator('appKey', {
          rules: [{ required: true, message: '请输入正确的应用ID...' }],
          initialValue:type==='edit'?editapp.appKey:undefined,
        })(<Input placeholder="请输入应用的ID"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} label="应用Secret">
        {form.getFieldDecorator('appSecret', {
          rules: [{ required: true, message: '请输入正确的secret...' }],
          initialValue:type==='edit'?editapp.appSecret:undefined,
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
      type:'',
      editapp:{},
      username:'',

    };

  componentDidMount(){
    const { dispatch ,appinfoLists} = this.props;
    const {username}=appinfoLists;
  console.log('appinfoLists/fetch',appinfoLists);

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
      type: 'add',
      editapp:{}
    },()=>{
      this.setState({
        modalVisible: !!flag,
      });
    });

  /*  this.setState({
      modalVisible: !!flag,
    });*/
  };
  handleAdd = fields => {
    const { dispatch } = this.props;
    console.log('handleAdd',fields);
   // console.log('handleAdd username',this.state.username);
    dispatch({
      type: 'appinfoLists/add',
      payload: {
        ...fields,
      },
    });
    this.setState({
      modalVisible: false,
      type:'',
      editapp:{},
    });
  };
  handleEditApp = val =>{
    this.setState({
      type: 'edit',
      editapp:val
    },()=>{
      this.setState({
        modalVisible: true,
      });
    });
  }
  handleEditComfirm = fields =>{
    console.log('handleEditComfirm',fields);
    this.setState({
      modalVisible: false,
      type:'',
      editapp:{},
    });
  }
  handleDeleteApp = (app) =>{
    // console.log(app);
    const {dispatch} = this.props;
    const { appKey, appSecret } = app;
    // console.log(app);
    dispatch({
      type: 'devicelist/loginoutReset',
    });
    dispatch({
      type: 'appinfoLists/loginoutReset',
    });
    dispatch({
      type: 'subscribelist/loginoutReset',
    });
     dispatch({
      type: 'appinfoLists/delete',
      payload: { appKey, appSecret }
    });
  };
 /* *delete(app) {
    const { dispatch } = this.props;
    const { appKey, appSecret } = app;
    console.log(app);
    yield dispatch({
      type: 'appinfoLists/delete',
      payload: { appKey, appSecret }
    });

    // console.log('fetchSubscribe',val);

  }*/
  render(){
    const {appinfoLists}=this.props;
    const {  modalVisible,type,editapp } = this.state;
    //console.log(this.props);
    const{list} = appinfoLists;
    const content = (
      <div className={styles.pageHeaderContent}>
        <Alert
          message=" 应用删除仅是在北向应用服务中删除，不会在平台上删除，如果需要在DMP平台中删除，请在DMP平台上操作！"
          type="warning"
          showIcon
        />
      </div>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleEditComfirm:this.handleEditComfirm
    };
    {/* <Popconfirm title="Are you sure？"> <a href="#"><Icon type="edit" /></a></Popconfirm>  <a href="#"><Icon type="delete" /></a> */}

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
                    <Card hoverable className={styles.card}
                          extra={
                            <span>
                             {/* <a href="javascript:void();" onClick={()=>this.handleEditApp(item)}><Icon type="edit" /></a>*/}
                              <Popconfirm title="确定删除吗？" onConfirm={()=>this.handleDeleteApp(item)}> <Icon type="delete" /></Popconfirm>
                            </span>
                            }

                          title={`应用名称：${item.appName}`}
                            >
                      <Card.Meta
                        description={
                          <Ellipsis className={styles.item} lines={5}>
                            <Row><Col span={4}> key:</Col><Col span={20}>{item.appKey}</Col></Row>
                            <Row><Col span={4}> secret:</Col><Col  span={20}>{item.appSecret}</Col></Row>
                            <Row><Col span={4}> token:</Col><Col span={20}>{item.accessToken}</Col></Row>
                            <Row><Col span={4}> refresh:</Col><Col span={20}>{item.refreshToken}</Col></Row>
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
        <CreateForm {...parentMethods}
            modalVisible={modalVisible} editapp={editapp}
            type={type}/>
      </PageHeaderLayout>
    )
  }
}
