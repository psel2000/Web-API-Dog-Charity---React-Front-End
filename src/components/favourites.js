/**
 * A module to set up the favourites route view
 * Outputs to user, all dogs favourited
 * @module components/favourites
 * @author Preeth Selvamohan
 */
import React from 'react';
import PostCard from './postcard';
import { status, json } from '../utilities/requestHandlers';
import { withRouter } from 'react-router';
import {Row, Col} from 'antd'

/**
 * A class to create a grid hosting all favourited dog posts
 * Fetches posts from database, maps them and renders them
 * @class
 */
class Favourites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  
  //Checks if all components have been rendered properly
  componentDidMount() {
    //gets id from front end uri to pass same value in backend uri
    const id = this.props.match.params.id;
    //calls a get request to backend favourites uri for all favourites posts by user id
    fetch(`https://comedy-mobile-3000.codio-box.uk/api/v1/favourites/${id}`)
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

export default withRouter(Favourites);