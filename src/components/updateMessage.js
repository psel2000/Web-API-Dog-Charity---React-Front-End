/**
 * A module to set up the update page to update data for messages
 * Allows user to change the title or content of a message 
 * @module components/updateMessage
 * @author Preeth Selvamohan
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import { withRouter } from 'react-router';
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
    { required: false, message: "Please input the title of the message", whitespace: true }
]

const paragraphRules = [
    { required: false, message: "Please input the message here", whitespace: true }
]

const user = GetDetails;

/**
 * Update form to update message data
 * @class
 */
class UpdateMessageForm extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }
  
  //When submit button is used, sends user input details to database with PUT request
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    //gets id from front end uri to pass same value in backend uri
    const id = this.props.match.params.id; // available using withRouter()
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    //sends PUT request to update message data for message chosen
    fetch(`https://comedy-mobile-3000.codio-box.uk/api/v1/messages/${id}`,{
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            authorization: 'Basic ' + ("selvamop" + ":" + "bananatree"),
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        alert("Message updated")
    })
    .catch(err => {
        alert("Error updating entry");
    });  
  };
  
  //renders form to get all updated message details if any
  render() {
    return (
      <Form {...formItemLayout} name="Alter" onFinish={this.onFinish} scrollToFirstError>    
      
        <Form.Item name="title" label="Title" rules={titleRules} >
            <Input />
        </Form.Item>
  
        <Form.Item name="paragraph" label="Content" rules={paragraphRules} >
            <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Update
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

export default withRouter(UpdateMessageForm);