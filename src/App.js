import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import Nav from './components/nav';
import Account from './components/account';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Post from './components/post';
import Uploader from './components/uploadDog';
import Updater from './components/updateDog';
import Searcher from "./components/search";
import Favourite from "./components/favourites"
import Messages from './components/messages';
import MessagePosts from './components/messagePost'
import MessageUpdater from './components/updateMessage';
import MessageUploader from './components/uploadMessage';

import UserContext from './contexts/user';

const { Header, Content, Footer } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {loggedIn: false}
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(user) {
    console.log("User is now being set on the context");
    user.loggedIn = true;
    this.setState({user:user});
  }

  logout() {
    console.log("Removing user from the app context");
    this.setState({user: {loggedIn:false}});
  }

  render () {
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout
    };

    return (
      <UserContext.Provider value={context}>
        <Router>
          <Header>
            <Nav />
          </Header>

          <Content>
            <Switch>
              <Route path="/account" children={<Account />} />
              <Route path="/register" children={<Register />} />
              <Route path="/login" children={<Login />} />
              <Route path="/upload" children={<Uploader />} />
              <Route path="/post/update/:id" children={<Updater />} />
              <Route path="/post/:id" children={<Post />} />
              <Route path="/search" children={<Searcher />} />
              <Route path="/messages/upload" children={<MessageUploader />} />
              <Route path="/favourites/:id" children={<Favourite />} />
              <Route path="/messages/update/:id" children={<MessageUpdater />} />
              <Route path="/messages/:id" children={<MessagePosts />} />
              <Route path="/messages" children={<Messages />} />
              <Route path="/" children={<Home />} exact />
            </Switch>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Canine Shelter Web API</Footer>

        </Router>
      </UserContext.Provider>  
    );
  }
}


export default App;