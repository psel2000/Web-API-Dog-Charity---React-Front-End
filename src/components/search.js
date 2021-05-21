/**
 * A module to set up the search page and function
 * Allows users to search and filter by name and breed to find dogs
 * @module components/search
 * @author Preeth Selvamohan
 */
import React, { Component } from 'react';
import { Card } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import Information from '../data/dogsData';
import NavImage from './navimage';

const { Meta } = Card;

/**
 * A class to create a search page and function
 * Displays posts and adds them to array
 * Filters through array and returns all posts associated with filter
 * @class
 */
class Search extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }

    this.state={
      search:null
    };
  }
  
  //Checks if all components have been rendered properly
  componentDidMount() {
    //sends fetch request to backend to get all dog posts
    fetch('https://comedy-mobile-3000.codio-box.uk/api/v1/dogs')
    .then(status)
    .then(json)
    .then(data => {
      this.setState({ posts: data })
    })
    .catch(err => console.log("Error fetching articles"));
  }
  
  //Listens for user input in search bar
  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }
  
  //renders all posts that have been filtered
  render(){
    const styleInfo = {
      paddingRight:'10px'
    }
    const elementStyle ={
      border:'solid',
      borderRadius:'10px',
      position:'relative',
      left:'10vh',
      height:'3vh',
      width:'20vh',
      marginTop:'5vh',
      marginBottom:'10vh'
    }
    //filters through posts
    const items = Information.filter((data)=>{
      if(this.state.search == null)
          return data
      else if(data.name.toLowerCase().includes(this.state.search.toLowerCase()) || data.breed.toLowerCase().includes(this.state.search.toLowerCase())){
          return data
      }
    })
    //maps returned posts
    .map(data=>{
      return(
      <div>
        <Card
        style={{ width: 320 }}
        cover={<NavImage src={data.imageURL} to={`/post/${data.ID}`} />}
        hoverable={true}
        actions={[
        ]}>
        
        <Meta title={data.name} description={data.breed} />
      </Card>
      </div>
      )
    })

    return (
      <div>
      <input type="text" placeholder="Enter item to be searched" style={elementStyle} onChange={(e)=>this.searchSpace(e)} />
      {items}
      </div>
    )
  }
}

export default Search;



