/**
 * A module to set up the card holding dog information
 * Creates cards by dog id and shows dog name and breed
 * @module components/postcard
 * @author Preeth Selvamohan
 */
import React from 'react';
import { Card, Form, Button } from 'antd';
import NavImage from './navimage';
import { status, json } from '../utilities/requestHandlers';

const { Meta } = Card;

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

/**
 * A class to create a list of cards with dog information on them
 * @class
 */
class PostCard extends React.Component {

  constructor(props) {
    super(props);
  }
  //If submit button is used, sends post request to backend with post id to add to user favourites
   onFinish = () => {
    //gets dog id
    const postID = this.props.ID;
    //gets user id
    const userID = 9
    //Sends both user and dog id to database
    fetch(`https://comedy-mobile-3000.codio-box.uk/api/v1/favourites/${userID}`,{
        method: "POST",
        headers: {
            userID, postID
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        // TODO: display success message and/or redirect
        alert("Added to Favourites")
    })
    .catch(err => {
        // TODO: show nicely formatted error message and clear form
        alert("Unable to add to Favourites");
    });  
  };

  //renders all dogs in a card by id.
  //Stores the dog name, breed and image
  render() {
    const postID = this.props.ID;
    return (
      <Card
        style={{ width: 320 }}
        cover={<NavImage alt={`Post ${postID}`} src={this.props.imageURL} to={`/post/${postID}`} />}
        hoverable={true}
        actions={[
        ]}>
        
        <Meta title={this.props.name} description={this.props.breed} />
        <Form {...tailFormItemLayout} name="Alter" onFinish={this.onFinish} scrollToFirstError >
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Add to Favourites
              </Button>
            </Form.Item>
          </Form>
      </Card>
    );
  }
}

export default PostCard; 
