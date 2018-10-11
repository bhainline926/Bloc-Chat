import React, { Component } from 'react';

 class MessageList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      message: [],
    }
    this.messagesRef = this.props.firebase.database().ref('messages')
  }
  
  componentDidMount() {
    this.messagesRef.on('child_added', snapshot  => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) }, () => {
        this.showMessages( this.props.activeRoom )
      });
    });
  }
  
  componentWillReceiveProps(nextProps) {
    this.showMessages( nextProps.activeRoom );
  }
  
  showMessages(activeRoom) {
    this.setState({ message: this.state.messages.filter( message => message.roomId === activeRoom.key ) });
  }
  
  render() {
    return (
      <main >
        <h2>{ this.props.activeRoom ? this.props.activeRoom.name : '' }</h2>
        <ul>
          {this.state.message.map( message => 
            <li key={message.key}>
              <div>
                 { message.username }
              </div>
              <div>
                 { message.content }
              </div>
            </li>
          )}
        </ul>
      </main>
    );
  }
}
 export default MessageList;