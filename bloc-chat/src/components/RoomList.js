import React, { Component } from 'react';
 
  class RoomList extends Component {
     constructor(props) {
      super(props);
 	     this.state = {
 	     	rooms: [],
 	     	newRoomName: ''
 	     }
 	     this.roomsRef = this.props.firebase.database().ref('rooms');
    }
  
   	componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
        if (this.state.rooms.length === 1) { this.props.setActiveRoom(room) }
      });
     };
 
     createRoom(newRoomName) {
     	this.roomsRef.push ({
     		name: newRoomName
     	});
     	this.setState({ newRoomName: ''});
     }
     handleChange(e) {
    	this.setState({ newRoomName: e.target.value});
    }
     handleSubmit(e) {
    	e.preventDefault();
    	this.createRoom(this.state.newRoomName);
    }
    render() {
    return (
     <section>
            {this.state.rooms.map( room =>
                <li key={room.key} >
                  <button onClick={ () => this.props.setActiveRoom(room) }>{ room.name }</button>
                </li>
            )}
            <form onSubmit={ (e) => { this.handleSubmit(e) } }>
               <input type="text" value={ this.state.newRoomName } onChange={ this.handleChange.bind(this) } name="newRoomName" placeholder="New Room" />
               <input type="submit" value="Create" />
            </form>
      </section>
      );
    }
  }
 
 export default RoomList;
 