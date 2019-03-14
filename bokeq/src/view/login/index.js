import React, { Component } from "react";
import {Form,Input,Icon,Button} from 'antd';
import $http from '../../common/fetch';
import { loginUrl } from '../../common/url'
import './index.css';
class Login extends Component {
  constructor(props) {
    super(props);
	}
	submit = () => {
		const {validateFieldsAndScroll} = this.props.form;
		const {history} = this.props;
		validateFieldsAndScroll((err, values) => {
      if (!err) {
				$http.postData(loginUrl.signin,values).then(data => {
					history.push('/main');
				})
			}else{
				console.log(err);
			}
    });
	}
  render() {
		const {getFieldDecorator} = this.props.form;
    return (
      <div className="login">
        <div className="login_title">登录MY博客</div>
        <div className="login_body">
					<Form.Item>
						{getFieldDecorator('account', {
							rules: [{ required: true, message: '请输入用户名!' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码!' }],
						})(
							<Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
						)}
					</Form.Item>
					<Button type="primary" onClick={this.submit}>
            登 录
          </Button>
				</div>
      </div>
    );
  }
}
export default Form.create()(Login);
