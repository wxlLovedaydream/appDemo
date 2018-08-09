import {Component} from 'react';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from 'components/StandardTable';
import {Modal,Card, Icon,List,Button,Form,Input,} from 'antd';
import { Link } from 'dva/router';
import styles from './SubscribeList.less'
const Meta = Card.Meta;
const FormItem = Form.Item;
const CreateForm = Form.create()(
  props => {
    const { modalVisible, form, handleSubscribe, handleModalVisible } = props;
  //  console.log(handleModalVisible);
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleSubscribe(fieldsValue);
      });
    };
    return (
      <Modal
        title="订阅数据"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible({flag:false})}>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="回调地址">
          {form.getFieldDecorator('callbackurl', {
            rules: [{ required: true, message: '请输入正确的回调地址...' }],
          })(<Input addonBefore="http://" placeholder="callbackurl:port"/>)}
        </FormItem>
      </Modal>
    );
  }
);
@connect(({ subscribelist,devicelist }) => ({
  sendSubscribeNotifyType:subscribelist.sendSubscribeNotifyType,
  appInfo:devicelist.appInfo,
}))
export default class SubscribeList extends Component{
  state = {
    modalVisible:false,
    notifyType:'',
  };
  handleModalVisible = (val,e) =>{
    console.log(val);
    const {flag ,notifyType}= val;
    this.setState({
      modalVisible:!!flag,
    });
if(notifyType){this.setNotifyType(notifyType);}

  };
  setNotifyType = (notifyType) =>{
    this.setState({
      notifyType:notifyType,
    });
  }
  handleSubscribe = (fields) =>{
   // console.log(fields);
    const {dispatch,appInfo} = this.props;
    const {notifyType} = this.state;
    this.setState({
      modalVisible:false,
    })
    const param = {
      callbackurl:`http://${fields.callbackurl}/PushDeviceDataChanged`,
      appId:appInfo.appKey,
      accessToken:appInfo.accessToken,
      notifyType:notifyType,
    }
    console.log('handleSubscribe',param);
    dispatch({
      type:'subscribelist/sendSubscribeNotifyType',
      payload:param,
    });
  };
  render(){
    const cardData = [
      {
        title:'设备数据变化',
        description:'IoT平台接收到设备数据变化（动态变化，如，服务属性值的变化），IoT平台使用该接口功能将该信息通知给Application。',
        notifyType:'deviceDataChanged',
      },
    ];
    const {modalVisible} = this.state;
    const parentMethod = {
      handleSubscribe:this.handleSubscribe,
      handleModalVisible:this.handleModalVisible,
    }
    return(<PageHeaderLayout title="应用订阅">
      <div className={styles.cardList}>

        <List
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={cardData}
          renderItem={item => (
            <List.Item>
              <Card hoverable title={item.title}
                    extra={<Button type="primary" onClick={
                      e => {this.handleModalVisible({flag:true,notifyType:item.notifyType})}} >
                      <Icon type="plus"/>订阅</Button>}
                    className={styles.card} >
                <Meta description={ item.description}/>
              </Card>
            </List.Item>
          )}
        />
      </div>
    <CreateForm modalVisible={modalVisible}
                {...parentMethod}/>
    </PageHeaderLayout>);
  }
}
