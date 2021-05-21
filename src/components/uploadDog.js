/**
 * A module to set up the upload page to upload data a new dog
 * Takes user input of dog details and adds to database if valid
 * @module components/uploadDog
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
const nameRules = [
    { required: true, message: "Please input the dog's name!", whitespace: true }
]

const breedRules = [
    { required: true, message: "Please input the dog's breed!", whitespace: true }
]

const imageRules = [
    { required: false, message: "Upload an image (Optional)", whitespace: true }
]

const Twitter = require("twitter")
const dotenv = require("dotenv")
dotenv.config()

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

/**
 * Upload form to upload new dog
 * @class
 */
class UploadDogForm extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }
  
  //When submit button is used, sends all user input details to backend to update new entry into database
  onFinish = (values) => {
    const user = UserContext;
    console.log(user);
    console.log('Received values of form: ', values);
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    //Sends POST request to backend with new dog data in body to post data to database
    //Only posts is user has sufficient access
    fetch('https://comedy-mobile-3000.codio-box.uk/api/v1/dogs', {
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
        alert("Dog added")
    })
    .catch(err => {
        alert("Error adding entry");
    });
    //Sends tweet with new dog data
    //Should be in backend, only here to demonstrate inability to use API with CORS
    client.post("statuses/update", { status: data }, function(error, tweet, response) {
      if (error) {
        console.log(error)
      } else {
        console.log(tweet)
      }
    })
  };
  
  //renders form to get all required dog details
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
                Upload
            </Button>
        </Form.Item>
      </Form>
    );
  };
};

export default UploadDogForm;


  

