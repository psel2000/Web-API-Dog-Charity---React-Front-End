/**
 * A module to set up the login page
 * Takes in user input for username and password
 * Checks login details with database
 * If valid, stores user details in context
 * @module components/login
 * @author Preeth Selvamohan
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { Redirect } from 'react-router-dom';

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const usernameRules = [
    { required: true, message: 'Please input your username!', whitespace: true }
]

/**
 * Login form component for app signup.
 */
class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    state = {redirect: null}

    static contextType = UserContext;
    
  //Retrieves username and password input by user
  //Sends this data back in the body of post request to validate user from database
    login(values) {
        const {username, password} = values;
        console.log(`logging in user: ${username}`)
        fetch('https://comedy-mobile-3000.codio-box.uk/api/v1/users/login', {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            }        
        })
        .then(status)
        .then(json)
        .then(user => {
            //If user is signed in successfully, this is stored in context
            console.log('Logged in successfully');
            user.password = password;  // store in context for future API calls
            this.context.login(user);
            this.setState({redirect:'/'});
        })
        .catch(error => {
            // TODO: show nicely formatted error message
            console.log('Login failed');
        });  
    }
  //renders all user input forms
  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }    
    return (
        <Form {...formItemLayout} name="login" onFinish={this.login} scrollToFirstError >
            <Form.Item name="username" label="Username" rules={usernameRules} >
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
        </Form>
    );
  };
};

export default LoginForm;
