/**
 * A module to set up the registration page
 * Allows user to input their details
 * Adds details to database if details are valid
 * @module components/register
 * @author Preeth Selvamohan
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' }
];

const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const confirmRules = [
    { required: true, message: 'Please confirm your password!' },
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
        }
    })
];

const usernameRules = [
    { required: true, message: 'Please input your username!', whitespace: true }
];

const staffRules = [
    { required: false, message: 'Input staff code if applicable', whitespace: true },
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (value == "Yn7=2Br") {
          return Promise.resolve();
          }
      return Promise.reject('Enter a valid staff code or leave field empty')
    }
  })
];


/**
 * Registration form component for app signup.
 * @class
 */
class RegistrationForm extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }
  
  //When submit button is used, sends values from form to database
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    //If user is able to correctly input staff code
    //user role is updated to staff
    //if not then user role stays as user
    if (data.role == "Yn7=2Br") {
      data.role = "staff"
    } else {
      data.role = "user"
    };
    //sends post request to backend with user input data
    //Will then add this data to database
    fetch('https://comedy-mobile-3000.codio-box.uk/api/v1/users', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        alert("User added")
    })
    .catch(err => {
        alert("Error adding user");
    });  
  };
  
  //renders user form to get all required user details
  render() {
    return (
      <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
        
        <Form.Item name="email" label="E-mail" rules={emailRules} >
            <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
            <Input.Password />
        </Form.Item>

        <Form.Item name="confirm" label="Confirm Password" dependencies={['password']}
            hasFeedback rules={confirmRules}>
            <Input.Password />
        </Form.Item>

        <Form.Item name="username" label="Username" rules={usernameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="role" label="Staff Code" >
            <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Register
            </Button>
        </Form.Item>
      </Form>
    );
  };
};

export default RegistrationForm;
