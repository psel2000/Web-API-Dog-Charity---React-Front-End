/**
 * A module to set up the message route view
 * Outputs to user, Message information as well as options to delete or update message
 * @module components/messagePost
 * @author Preeth Selvamohan
 */
import React from 'react';
import { withRouter } from 'react-router';
import { Row, Col, Typography } from 'antd'
import { status, json } from '../utilities/requestHandlers';
import { Form, Button } from 'antd';
import { Link } from "react-router-dom";
import UserContext from '../contexts/user';
import {useContext} from 'react';


const { Title, Paragraph } = Typography;

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const user = GetDetails;

/**
 * A class to create a page with all message information by id
 * Fetches post from database renders stored data
 * @class
 */
class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: undefined
    }
  }
  
  //Checks if all components have been rendered properly
  componentDidMount() {
    //gets id from front end uri to pass same value in backend uri
    const id = this.props.match.params.id; // available using withRouter()
    //calls a get request to backend message uri for all message posts by user id
    //or all posts if user is staff or admin
    fetch(`https://comedy-mobile-3000.codio-box.uk/api/v1/messages/${id}`,{
      headers: {
            authorization: 'Basic ' + btoa("selvamop" + ":" + "bananatree"),
            "Content-Type": "application/json"
        }
    })
    .then(status)
    .then(json)
    .then(post => {
      this.setState({post:post})
    })
    .catch(err => {
      console.log(`Fetch error for post ${id}`)
    });
  }

  //Runs when form submit (delete) button is used
  onFinish = () => {
    //gets id from front end uri to pass same value in backend uri
    const id = this.props.match.params.id; // available using withRouter()
    console.log(id);
    //calls a delete request to backend message uri to delete message specified by id
    fetch(`https://comedy-mobile-3000.codio-box.uk/api/v1/messages/${id}`,{
        method: "DELETE",
        headers: {
            authorization: 'Basic ' + btoa("dave10" + ":" + "pencil"),
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        console.log(data);
        alert("Message deleted")
    })
    .catch(err => {
        alert("Error deleting Message");
    });  
  };
  
  //renders all post with message data
  render() {
    if (!this.state.post) {
      return <h3>Loading post...</h3>
    }
    const post = this.state.post;
    //Renders message title and content
    //Renders user input forms to allow them to choose to update or delete message
    //If user chooses to update message, redirected to message update page
    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={12}>
            <Title>{post.title}</Title>
            <Paragraph>{post.paragraph}</Paragraph>
          </Col>
          <Col span={6} align="center">
          </Col>
        </Row>
        <Form {...tailFormItemLayout} name="Alter" scrollToFirstError >
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                <Link to={`/messages/update/${this.props.match.params.id}`}>Update</Link>
            </Button>
        </Form.Item>
        </Form>
        <Form {...tailFormItemLayout} name="Alter" onFinish={this.onFinish} scrollToFirstError >
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Delete
            </Button>
        </Form.Item>
        </Form>
      </div>
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

export default withRouter(Post);
