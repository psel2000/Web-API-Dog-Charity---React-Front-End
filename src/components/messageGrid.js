/**
 * A module to set up the grid view to display messages
 * Outputs to user, message information accessible to them
 * @module components/messageGrid
 * @author Preeth Selvamohan
 */
import React from 'react';
import { Col, Row, Form, Button } from 'antd';
import MessageCard from './messageCard';
import { status, json } from '../utilities/requestHandlers';
import { Link } from "react-router-dom";
import UserContext from '../contexts/user';
import {useContext} from 'react';

const user = GetDetails;

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

/**
 * A class to create a grid hosting all message posts
 * Fetches posts from database, maps them and renders them
 * @class
 */
class MessageGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  
  //Checks if all components have been rendered properly
  componentDidMount() {
    //calls a get request to backend message uri with authorization in the header
    //This allows us to only retrieve messages the user has access to
    fetch('https://comedy-mobile-3000.codio-box.uk/api/v1/messages', {
      headers: {
            authorization: 'Basic ' + btoa("selvamop" + ":" + "bananatree"),
            "Content-Type": "application/json"
        }
    })
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ posts: data })
    })
    .catch(err => console.log("Error fetching articles"));
  }
  
  //Checks if all components have been rendered properly
  render() {
    if (!this.state.posts.length) {
      return (
      <Row type="flex" justify="space-around">
        <Form {...tailFormItemLayout} name="Alter" scrollToFirstError >
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                <Link to={"/messages/upload"}>Send Message</Link>
            </Button>
          </Form.Item>
        </Form>
      </Row>
      );
    }
    //renders all posts as cards by passing data to messageCard module
    const cardList = this.state.posts.map(post => {
      return (
        <div style={{padding:"10px"}} key={post.ID}>
          <Col span={6}>
            <MessageCard {...post} />
          </Col>
        </div>
      )
    });
    //Renders user input forms to allow them to send a message
    //Redirects user to message upload page
    return (
      <Row type="flex" justify="space-around">
        {cardList}
        <Form {...tailFormItemLayout} name="Alter" scrollToFirstError >
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                <Link to={"/messages/upload"}>Send Message</Link>
            </Button>
          </Form.Item>
        </Form>
      </Row>
    );
  }
}

/**
 * Function to get user context data
 * @returns {object} All user context data
 */
function GetDetails(){
  const context = useContext(UserContext);
  const user = context.user;
  return user;
}

export default MessageGrid;
