/**
 * A module to set up the user navigation bar
 * Outputs to user, all routes accessible to user
 * Re-routes user when a route is chosen on the bar
 * @module components/nav
 * @author Preeth Selvamohan
 */
import React from 'react';
import {useContext} from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import UserContext from '../contexts/user';

/**
 * Function build navigation bar
 * Creates multiple navigation options chnaging whether or not user is logged in
 * Redirects user to relevant page based on navigation option chosen
 * @returns {string} All navigation options
 */
function Nav(props) {
  
  //gets user context
  //checks if user is logged in
  const context = useContext(UserContext);
  const loggedIn = context.user.loggedIn;
  let LoginNav;
  //If user is not logged in, navigation options are limited
  if (!loggedIn) {
    LoginNav = (
      <>
      <Menu.Item key="2">
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/login">Login</Link>
      </Menu.Item>
      </>
    )
  }
   //If user is logged in, navigation options expanded
   else {
    LoginNav = (
      <>
      <Menu.Item key="2"><Link to="/account">Account</Link></Menu.Item>
      <Menu.Item key="3" onClick={context.logout}>
        <Link to="/">Logout</Link>
      </Menu.Item>
      <Menu.Item key="4"><Link to="/upload">Upload</Link></Menu.Item>
      <Menu.Item key="6">
        <Link to={`/favourites/${context.user.ID}`}>Favourites</Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to={"/messages"}>Messages</Link>
      </Menu.Item>
      </>
    )
  }
  //Default navigation options given to all users, logged in or not
  return (
    <>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
      {LoginNav}
      <Menu.Item key="5">
        <Link to="/search">Search</Link>
      </Menu.Item>
    </Menu>
    </>
  );
}

export default Nav;