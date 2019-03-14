import React, { Component } from "react";
import { Form,Modal,Input,Icon } from "antd";
import List from "../../../components/List";
import $http from "../../../common/fetch";
import { acticleUrl, loginUrl } from "../../../common/url";
import "./myarticle.css";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      show:false
    };
  }
  componentDidMount() {
    this.initData();
  }
  initData= () => {
    $http.postData(acticleUrl.mylist).then(data => {
      this.setState({
        list: data
      });
    });
  }
  add = () => {
    this.setState({
      show:true
    })
  };
  ok = () => {
    const {validateFieldsAndScroll} = this.props.form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
				$http.postData(acticleUrl.add,values).then(data => {
          this.setState({
            show:false
          },()=>{
            Modal.success({
              title:'保存成功',
              onOk:()=>{
                this.initData();
              }
            });
          })
          
        });
			}else{
				console.log(err);
			}
    });
    
  }
  cancel = () => {
    this.setState({
      show:false
    })
  }
  out = () => {
    let { history } = this.props;
    $http.postData(loginUrl.signout).then(data => {
      history.push("/");
    });
  };
  render() {
    let { list,show } = this.state;
    let {getFieldDecorator} = this.props.form;
    return (
      <div>
        <List list={list} {...this.props} initData={this.initData} auth />
        <div className="my">
          <span onClick={this.add}>发布</span>
          <span onClick={this.out}>退出</span>
        </div>
        <Modal
          title="新增"
          visible={show}
          onOk={this.ok}
          onCancel={this.cancel}
          okText="确认"
          cancelText="取消"
          destroyOnClose={true}
        >
          <Form.Item
            {...formItemLayout}
            label={'标题'}
          >
						{getFieldDecorator('title', {
							rules: [{ required: true, message: '请输入标题!' }],
						})(
							<Input placeholder="标题" />
						)}
					</Form.Item>
					<Form.Item
            {...formItemLayout}
            label={'内容'}
          >
						{getFieldDecorator('content', {
							rules: [{ required: true, message: '请输入内容!' }],
						})(
							<Input.TextArea rows={4} />
						)}
					</Form.Item>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Article);
