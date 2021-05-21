/**
 * A module to set up the upload page to upload data a new message
 * Takes user input of message details and adds to database if valid
 * @module components/uploadMessage
 * @author Preeth Selvamohan
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import {useContext} from 'react';

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const titleRules = [
    { required: false, message: "Input change to message title here", whitespace: true }
]

const paragraphRules = [
    { required: false, message: "Input change to message content here", whitespace: true }
]

const usernameRules = [
    { required: true, message: "Input the user sending the message's username!", whitespace: true }
]

const useridRules = [
    { required: true, message: "Input the user sending the message's id!", whitespace: true }
]

const user = GetDetails;

/**
 * Upload form to upload new message
 * @class
 */
class UploadMessageForm extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }
  
  //When submit button is used, sends all user input details to backend to update new entry into database
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    //Sends POST request to backend with new message data in body to post data to database
    fetch('https://comedy-mobile-3000.codio-box.uk/api/v1/messages', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            authorization: 'Basic ' + btoa("selvamop" + ":" + "bananatree"),
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        alert("Message sent ")
    })
    .catch(err => {
        alert("Error sending message");
    });  
  };

  //renders form to get all required message details
  render() {
    return (
      <Form {...formItemLayout} name="Upload new entry" onFinish={this.onFinish} scrollToFirstError >
        
        <Form.Item name="title" label="Title" rules={titleRules} >
            <Input />
        </Form.Item>
  
        <Form.Item name="paragraph" label="Content" rules={paragraphRules} >
            <Input />
        </Form.Item>

        <Form.Item name="username" label="Username" rules={usernameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="userID" label="User ID" rules={useridRules} >
            <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Upload
            </Button>
        </Form.Item>
      </Form>
    );
  };
};

/**
 * Function to get user context data
 * @returns {object} All user context data
 */
function GetDetails(){
  const context = useContext(UserContext);
  const user = context.user;
  return user;
}



export default UploadMessageForm;


  

