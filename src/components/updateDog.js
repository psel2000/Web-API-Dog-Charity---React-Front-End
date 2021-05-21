/**
 * A module to set up the update page to update data for dogs
 * Allows user to change the name, breed of image associated with a dogs ID
 * @module components/updateDog
 * @author Preeth Selvamohan
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import { withRouter } from 'react-router';
import UserContext from '../contexts/user';
import {useContext} from 'react';

const user = GetDetails;


// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const nameRules = [
    { required: false, message: "Please input the dog's name!", whitespace: true }
]

const breedRules = [
    { required: false, message: "Please input the dog's breed!", whitespace: true }
]

const imageRules = [
    { required: false, message: "Upload an image (Optional)", whitespace: true }
]

/**
 * Update form to update dog data
 * @class
 */
class UpdateDogForm extends React.Component {

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
    //sends PUT request to update dog data for dog chosen
    fetch(`https://comedy-mobile-3000.codio-box.uk/api/v1/dogs/${id}`,{
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            authorization: 'Basic ' + btoa("dave10" + ":" + "pencil"),
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        alert("Dog entry updated")
    })
    .catch(err => {
        alert("Error updating entry");
    });  
  };
  
  //renders form to get all updated dog details if any
  render() {
    return (
      <Form {...formItemLayout} name="Upload new entry" onFinish={this.onFinish} scrollToFirstError >
        
        <Form.Item name="name" label="name" rules={nameRules} >
            <Input />
        </Form.Item>
  
        <Form.Item name="breed" label="breed" rules={breedRules} >
            <Input />
        </Form.Item>

        <Form.Item name="imageURL" label="image" rules={imageRules} >
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

export default withRouter(UpdateDogForm);