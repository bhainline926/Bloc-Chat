import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
        rooms: [],
        newRoomName: ''
      };
    }

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
