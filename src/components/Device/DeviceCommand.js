import React, { Component, Fragment } from 'react';
import {Table,Row,Col,Button,Form,Modal, Input, Select,
  Icon,Radio} from 'antd';

const FormItem = Form.Item;
const Option  =Select.Option ;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const form = Form.form;
const CreateForm = Form.create()(props => {
  const { modalVisible,form,handleCreateCMD,handleModalVisible,serviceCapabilities,methods,method,
    handleServiceChange,onMethodChange,handleCMDType,data} = props;

  //console.log('serviceCapabilities',serviceCapabilities);
const deviceCapabilities = serviceCapabilities.deviceCapabilities;
 /* const serviceOptions = deviceCapabilities&&deviceCapabilities[0].serviceCapabilities
      .map((cur,index) => <Option key={index} value={index}>{cur.serviceType}</Option>);

  const cmdOptions =  deviceCapabilities&&deviceCapabilities[0]
    .serviceCapabilities[methods].commands.map((val,index) =>
    <Option key={val.commandName} value={index}>{val.commandName}</Option>);*/
console.log('CreateForm data',data);
  const serviceOptions = !!data.length&&data.map((cur,index) => <Option key={index} value={index}>{cur.serviceType}</Option>);

  const cmdOptions =  !!data.length&&data[methods].commands.map((val,index) =>
    <Option key={val.commandName} value={index}>{val.commandName}</Option>);
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleCreateCMD(fieldsValue);
    });
  };
  //let tip = serviceCapabilities.deviceCapabilities&&JSON.stringify(deviceCapabilities[0].serviceCapabilities[0].commands[0].paras);
/*  onHandleServiceChange = (value) =>{
   // tip=JSON.stringify(deviceCapabilities[0].serviceCapabilities[value].commands[0].paras)
    handleServiceChange(value);
  }
  onHandleMethodChange = (value) =>{
    onMethodChange(value);

  }*/
  let tip ='';

/*  if(serviceCapabilities.deviceCapabilities){
    const {paraName,dataType,min,max} = deviceCapabilities[0].serviceCapabilities[methods].commands[method].paras[0];

    let res = dataType=='int'?`取值区间:[${min}-${min}]`:'';
    tip = `命令名称：${paraName}，数据类型：${dataType}，${res}`;
  }*/
  if(data.length){
    const {paraName,dataType,min,max} = data[methods].commands[method].paras[0];

    let res = dataType=='int'?`取值区间:[${min}-${max}]`:'';

    tip = `命令名称：${paraName}，数据类型：${dataType}，${res}`;
  }
  return (
    <Modal
      title="创建命令"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="服务">
        {data.length&&
        <Select defaultValue={data[0].serviceType} onChange={handleServiceChange} style={{width:'100%',}}>
          {serviceOptions}
        </Select>}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="方法">
        <Select defaultValue={data.length&&data[0].commands[0].commandName} onChange={onMethodChange}  style={{width:'100%',}}>
          {cmdOptions}
        </Select>
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="执行类型">
        <RadioGroup defaultValue='0' onChange={handleCMDType}>
          <RadioButton key='0' value='0' >立即发送</RadioButton>
          <RadioButton key='1' value={86400*2}>缓存发送</RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="命令">

        {form.getFieldDecorator('paras', {
          rules: [{ required: true, message: '请输入命令' }],
        })(<Input placeholder="请输入命令"/>)}

      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="提示">

        {tip}

      </FormItem>
    </Modal>
  );
});
export default class DeviceCommand extends Component{
  state = {
    modalVisible:false,
    expireTime:0,
    methods :  0,
    method :  0,
    data:[],
    hasCMD:true,
  }
  componentDidMount(){
    this.props.form&&this.props.form.validateFields();

}
 /* shouldComponentUpdate(nextProps, nextState){
    //console.log('shouldComponentUpdate',nextProps.serviceCapabilities);
    //console.log('shouldComponentUpdate nextState',nextState);
    const {data,hasCMD} = this.state;
    console.log('shouldComponentUpdate flag',nextState.hasCMD&&nextState.data.length==0)
    return nextState.hasCMD&&data.length==0;
  }*/
 /* componentWillUpdate(nextProps, nextState){
    if(nextProps.serviceCapabilities.deviceCapabilities){
      const {serviceCapabilities,deviceList,appInfo,} = this.props;
      console.log('componentWillUpdate .deviceCapabilities',serviceCapabilities);
      if(serviceCapabilities.deviceCapabilities){
        const data = serviceCapabilities.deviceCapabilities[0].serviceCapabilities.filter((currentValue, index)=>currentValue.commands.length!=0);
        let hasCMD = data.length!=0;
        console.log('DeviceCommand',hasCMD);
        this.setState({ data:data ,hasCMD:hasCMD });
      }
    }

  }*/
  handleModalVisible = flag => {
    const {serviceCapabilities,deviceList,appInfo,} = this.props;
    if(flag&&serviceCapabilities.deviceCapabilities){
      console.log('componentWillUpdate .deviceCapabilities',serviceCapabilities);
      if(serviceCapabilities.deviceCapabilities){
        const data = serviceCapabilities.deviceCapabilities[0].serviceCapabilities.filter((currentValue, index)=>currentValue.commands.length!=0);
        //let hasCMD = data.length!=0;
       // console.log('DeviceCommand',hasCMD);
        this.setState({ data:data });
      }
    }
    this.setState({
      modalVisible: !!flag,
    });
  };
  handleServiceChange = (value) => {
    const {serviceCapabilities,deviceList,appInfo,} = this.props;
   // const met = serviceCapabilities.deviceCapabilities[0].serviceCapabilities[value];
   // console.log('handleServiceChange',met);
    this.setState({
      methods: value,
    });
  }

  onMethodChange = (value) => {
    console.log(value);
    this.setState({
      method: value,
    });
  }


/*缓存or立即*/
  handleCMDType = (e)=>{
    console.log('handleCMDType',e);
    this.setState({
      expireTime:e.target.value,
    });
  }
/*下发命令*/
  handleCreateCMD=(val)=>{
    console.log(val);
    const {serviceCapabilities,dispatch,param,deviceCMDSend} = this.props;
    const service = serviceCapabilities.deviceCapabilities[0].serviceCapabilities;
    const {expireTime, methods ,method ,data} = this.state;
    param.expireTime = expireTime;
    const command = {
      ...param,
      serviceId:data[methods].serviceId,
      method:data[methods].commands[method].commandName,
      paras:val.paras,
      paraName:data[methods].commands[method].paras[0].paraName,
     };
    //param.command = command;
    console.log('handleCreateCMD',command);
    deviceCMDSend(command);
    this.handleModalVisible(false);
    //console.log('handleCreateCMD',command);
  };

  onPageChange = (page, pageSize) =>{
    console.log(page);
    console.log(pageSize);
  }
/*  const pagination = {

    current:deviceHistoryData.pageNo+1,
    pageSize:10,

  };*/
  render(){
    const {tableMenu,deviceCMD,serviceCapabilities } = this.props;
    const {modalVisible,methods,method,data,hasCMD} = this.state;
   const {pagination} =deviceCMD;
  // console.log('serviceCapabilities',serviceCapabilities);
   const page = pagination&&
     {current:pagination.pageNo+1,
      total:pagination.totalSize,
       pageSize:10,
       showSizeChanger: false,
       showQuickJumper: false,
       onChange:this.onPageChange,
     };

    const parentMethods = {
      handleCreateCMD: this.handleCreateCMD,
      handleModalVisible: this.handleModalVisible,
      handleServiceChange:this.handleServiceChange,
      onMethodChange:this.onMethodChange,
      handleCMDType:this.handleCMDType,
    };
   // console.log('deviceCMD',deviceCMD);
    //console.log('tableMenu',tableMenu);
    return (<div>
      <div style={{margin:'0px 0px 15px 0px'}}>
        {hasCMD&& <Button onClick={() => this.handleModalVisible(true)} type="primary">
          <Icon type="plus" /> 创建命令
        </Button>
        }
      </div>

      <div style={{backgroundColor:'white',}}>
        <Table
          columns={tableMenu}
          dataSource={deviceCMD.data}
          pagination={page}
        />
      </div>

{/*
      <Modal
        title="创建命令"
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={() => this.handleModalVisible()}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="serviceId">
          {form&&form.getFieldDecorator('serviceId', {})(<Select>

          </Select>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="method">
          {form&&form.getFieldDecorator('method', {})(<Select>

          </Select>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="cmdtype">
            {form&&form.getFieldDecorator('radio-group')(
            <RadioGroup defaultValue='immediately'>
            <RadioButton value="immediately">立即发送</RadioButton>
            <RadioButton value="syn">缓存发送</RadioButton>
            </RadioGroup>
            )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="paras">
          {form&&form.getFieldDecorator('paras', {
            rules: [{ required: true, message: '请输入命令' }],
          })(<Input placeholder="请输入命令"/>)}
        </FormItem>
      </Modal>
*/}

      <CreateForm {...parentMethods}
                  methods={methods}
                  method={method}
                  serviceCapabilities={serviceCapabilities}
                  modalVisible={modalVisible} data={data}/>
    </div>)
  }
}
