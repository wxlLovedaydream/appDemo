import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip, Dropdown, Menu } from 'antd';

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';
import styles from './Appinfos.less';
