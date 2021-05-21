/**
 * A module to host all dog posts as an overview
 * Calls fetch request to get all dogs
 * @module components/bloggrid
 * @author Preeth Selvamohan
 */
import React from 'react';
import { Col, Row } from 'antd';
import PostCard from './postcard';
import { status, json } from '../utilities/requestHandlers';

/**
 * A class to create a grid hosting all dog posts
 * Fetches posts from database, maps them and renders them
 * @class
 */
class BlogGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  
  //Checks if all components have been rendered properly
  componentDidMount() {
    //calls a get request to backend dog uri
    fetch('https://comedy-mobile-3000.codio-box.uk/api/v1/dogs')
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ posts: data })
    })
    .catch(err => console.log("Error fetching articles"));
  }
  
  //renders all posts as cards by passing data to postcard module
  render() {
    if (!this.state.posts.length) {
      return <h3>Loading posts...</h3>
    }
    const cardList = this.state.posts.map(post => {
      return (
        <div style={{padding:"10px"}} key={post.ID}>
          <Col span={6}>
            <PostCard {...post} />
          </Col>
        </div>
      )
    });
    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    );
  }
}

export default BlogGrid;
