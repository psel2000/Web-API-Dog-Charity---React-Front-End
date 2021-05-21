/**
 * A module to set up the home route view
 * Outputs to user a grid of dog posts
 * @module components/home
 * @author Preeth Selvamohan
 */
import React from 'react';
import { PageHeader } from 'antd';
import BlogGrid from './bloggrid';

/**
 * Function to get all dog posts rendered in bloggrid
 * @returns {object[]} All dog posts
 */
function Home(props) {
  
  return (
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <PageHeader className="site-page-header"
            title="The Canine Shelter"
            subTitle="Welcome to our Website."/>
        </div>  
        <BlogGrid />
      </div>
  );
}

export default Home;
