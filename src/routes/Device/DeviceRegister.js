import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from 'components/StandardTable';
import { Steps ,Form,Input,Select,Button,message,Alert} from 'antd';
import { Link } from 'dva/router';
const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;
import styles from './../Home/Appinfos.less';
@connect(({ devicelist }) => ({
  appInfo:devicelist.appInfo,
}))
@Form.create()
export default class DeviceRegister extends Component{
  state = {};
  componentDidMount() {
    // To disabled submit button at the beginning.
    //this.props.form.validateFields();
  }
  hasErrors = (fieldsError) => {
   // console.log('hasErrors',Object.keys(fieldsError).some(field => fieldsError[field]));
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };
  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch,appInfo } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      const { prefix } = this.state;

      if (!err) {
        console.log('validateFields',values);
        dispatch({
          type: 'devicelist/registerDevice',
          payload: {
            appInfo:appInfo,
            device:values,
          },
        });
      }
    });
  };

  render(){
    const { form, } = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
    const content = (
      <div className={styles.pageHeaderContent}>
         {/*// 在平台进行设备信息注册*/}
          <Alert
          message="注意:设备的厂商名称，厂商ID和设备类型要与平台上对应的profile的厂商名称，厂商ID和设备类型一一对应！"
          type="warning"
          showIcon
          />


      </div>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span:8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const buttonItemLayout = {
      wrapperCol: { span: 14, offset: 8 },
    };
    return (
      <PageHeaderLayout title="注册设备" content={content}>
      <Form>
        <FormItem {...formItemLayout} label="设备名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入设备名称...' }],
          })(
            <Input size="large" placeholder="设备名称" />
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label="设备标识码">
          {getFieldDecorator('verifyCode', {
            rules: [{ required: true, message: '请输入设备的IMEI，MAC等' }],
          })(
            <Input size="large" placeholder="设备的IMEI，MAC..." />
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label="设备类型">
          {getFieldDecorator('deviceType', {
            rules: [{ required: true, message: '请输入设备类型' }],
          })(
            <Input size="large" placeholder="设备类型." />
          )}
        </FormItem>
        <FormItem  {...formItemLayout}  label="厂商名称">
        {getFieldDecorator('manufacturerName', {
          rules: [{ required: true, message: '请输入设备的厂商名称' }],
        })(
          <Input size="large" placeholder="设备的厂商名称" />
        )}
      </FormItem>
        <FormItem  {...formItemLayout}  label="厂商ID">
          {getFieldDecorator('manufacturerId', {
            rules: [{ required: true, message: '请输入设备的厂商ID' }],
          })(
            <Input size="large" placeholder="设备的厂商ID" />
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label="设备型号">
          {getFieldDecorator('model', {
            rules: [{ required: true, message: '请输入设备的型号' }],
          })(
            <Input size="large" placeholder="设备的型号" />
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label="协议类型">
          {getFieldDecorator('protocolType', {
            rules: [{ required: true, message: '请输入设备的协议类型' }],
            initialValue:"COAP",
          })(
            <Select size="large">
              <Option value="COAP">COAP</Option>
            </Select>
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label="组织">
          {getFieldDecorator('organization', {
            rules: [{ required: true, message: '请输入设备的组织' }],
          })(
            <Input size="large" placeholder="设备所属的公司，用户..." />
          )}
        </FormItem>
        {/*Asia/Beijing*/}
 {/*       <FormItem  {...formItemLayout} label="时区">
          {getFieldDecorator('timezone', {
            rules: [{ required: true, message: '请输入设备的时区' }],
            initialValue:"Asia/Chongqing",
          })(
            <Select size="large">
              <Option value="Asia/Chongqing">北京时区（Asia/Beijing）</Option>
            </Select>
          )}
        </FormItem>*/}
        <FormItem  {...formItemLayout}  label="区域">
          {getFieldDecorator('region', {
            rules: [{ required: true, message: '请输入设备的区域' }],
          })(
            <Input size="large" placeholder="设备所在区域" />
          )}
        </FormItem>
        <FormItem  {...formItemLayout} label="地址">
          {getFieldDecorator('location', {
            rules: [{ required: true, message: '设备的所在位置' }],
          })(
            <Input size="large" placeholder="设备的所在位置" />
          )}
        </FormItem>
        <FormItem {...buttonItemLayout}>
        <Button type="primary"
                htmlType="submit"
               /* disabled={this.hasErrors(getFieldsError())}*/
                onClick = {this.handleSubmit} >
          注册设备
        </Button>
        </FormItem>
      </Form>
    </PageHeaderLayout>);
  }

}
