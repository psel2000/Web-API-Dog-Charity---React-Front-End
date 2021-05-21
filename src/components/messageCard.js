/**
 * A module to set up the card holding message information
 * Creates cards by message id and shows message title and content
 * @module components/messageCard
 * @author Preeth Selvamohan
 */
import React from 'react';
import { Card } from 'antd';
import NavImage from './navimage';

const { Meta } = Card;

/**
 * A class to create a list of cards with message information on them
 * @class
 */
class MessageCard extends React.Component {

  constructor(props) {
    super(props);
  }
  
  //renders all messages in a card by id.
  //Stores the message title and content
  render() {
    const postID = this.props.ID;
    return (
      <Card
        style={{ width: 320 }}
        cover={<NavImage alt={`Post ${postID}`} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwCMcm3xdAYW2bE70Pyng7GwYlb7zF0-vHQ&usqp=CAU"} to={`/messages/${postID}`} />}
        hoverable={true}>
        
        <Meta title={this.props.title} description={this.props.paragraph} />
      </Card>
    );
  }
}

export default MessageCard; 
