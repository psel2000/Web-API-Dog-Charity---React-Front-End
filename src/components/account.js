/**
 * A module to set up the account route view
 * Outputs to user, user account information
 * @module components/account
 * @author Preeth Selvamohan
 */
import React from 'react';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import {Typography, Form, Input, Button  } from 'antd'
import { status, json } from '../utilities/requestHandlers';

const {Paragraph } = Typography;

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

/**
 * Function to get all relevant data that a user can view
 * First checks if user is logged in, if not does not return any user data
 * @params {object} Passes user context to function
 * @returns {string} User username, email and role 
 */
function Account(props) {
  const context = useContext(UserContext);
  const user = context.user;
  console.log("current user in UserContext is", user);

  const [profile, setProfile] = React.useState({});

  if (!user.loggedIn) {
    return "Please log in"
  }

  if (!profile.username) {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

    fetch(user.links.self, {headers:headers})
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.text());
      }
    })
    .then(data => {
      setProfile(data);
    })
    .catch(err => console.error(err));  
  }
  console.log(profile);

  return (
    <div >
      <h1>Account</h1>
      <ul>
        <li><Paragraph>Username : {profile.username}</Paragraph></li>
        <li><Paragraph>user email : {profile.email}</Paragraph></li>
        <li><Paragraph>user id : {profile.id}</Paragraph></li>
        <li><Paragraph>user role : {profile.role}</Paragraph></li>
      </ul>
      <Form {...formItemLayout} name="Upload new entry"  scrollToFirstError >
        <Form.Item name="password" label="Input New password here" >
            <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Update
            </Button>
        </Form.Item>
      </Form>
    </div>
  );
}


export default Account;
