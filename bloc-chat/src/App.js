import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User.js';

var config = {
    apiKey: "AIzaSyBgwvv-leWfdzmoxLDUAnA_nQUJ_8nw3JQ",
    authDomain: "bloc-chat-81305.firebaseapp.com",
    databaseURL: "https://bloc-chat-81305.firebaseio.com",
    projectId: "bloc-chat-81305",
    storageBucket: "bloc-chat-81305.appspot.com",
    messagingSenderId: "992791072338"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        activeRoom: null,
    };
  }
  
  setActiveRoom(room) {
   this.setState({activeRoom: room});
 }

 setUser(user) {
   this.setState({user: user});
   console.log(user);
 }

  render() {
    return (
  <div className="App">
    <nav>
      <div className="sideBar">
          <h1>Bloc Chat</h1>
          <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user}/>
          <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={this.setActiveRoom.bind(this)}/>
      </div>
    </nav>
    <main>
      <div>
      <MessageList firebase={firebase} activeRoom={this.state.activeRoom}/>
      </div>
    </main>
  </div>
    );
  }
}

export default App;
