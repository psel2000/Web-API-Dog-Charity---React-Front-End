/**
 * A module to set up the message display page
 * Outputs to user, all messages in the form of cards by calling the messageGrid module
 * @module components/messages
 * @author Preeth Selvamohan
 */
import React from 'react';
import { PageHeader } from 'antd';
import MessageGrid from './messageGrid';

/**
 * Function to get all message posts rendered in messageGrid
 * @returns {object[]} All message posts
 */
function Messages(props) {
  
  return (
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <PageHeader className="site-page-header"
            title="Messages"
            subTitle="View or send messages below"/>
        </div>  
        <MessageGrid />
      </div>
  );
}

export default Messages;
