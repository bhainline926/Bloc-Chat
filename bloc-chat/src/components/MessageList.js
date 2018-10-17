import React, { Component } from 'react';

 class MessageList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      message: [],
      userText: ''
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

  createUserMessage(userText) {
    this.messagesRef.push({
        username: this.props.user ? this.props.user.displayName : 'Guest',
        content: userText,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom.key,
      });
    this.setState({ userText: '' });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({userText: e.target.value });
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
        <form onSubmit={ (e) => { e.preventDefault(); this.createUserMessage(this.state.userText) } }>
          <input type="text" value={ this.state.userText } onChange={ this.handleChange.bind(this) }  name="userText" placeholder="Enter message here" />
          <input type="submit" value="Send"/>
        </form>
      </main>
    );
  }
}
 export default MessageList;