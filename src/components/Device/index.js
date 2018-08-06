import React, { PureComponent, Fragment } from 'react';

import styles from './index.less';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

callback=(key)=> {
  console.log(key);
}

class TabPanel extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      columns :props.columns ,
      deviceInfo,
    };
  }
  render(){
    const columns =[
      {
        title:'',
        component:()=>{}
      }
    ];
    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
      </Tabs>

    );
  }
}
