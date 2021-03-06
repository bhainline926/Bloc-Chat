import React, { Component } from 'react';


 class User extends Component {
    componentDidMount() {
     this.props.firebase.auth().onAuthStateChanged( user => {
       this.props.setUser(user);
     });
   }
 
   signIn() {
     const provider = new this.props.firebase.auth.GoogleAuthProvider();
     this.props.firebase.auth().signInWithPopup( provider );
   }
 
   signOut() {
     this.props.firebase.auth().signOut();
   }
 
  render() {
    return (
      <section className="user-display">
        <div className="user-display-name">{ this.props.user ? this.props.user.displayName : ' ' }</div>
        <button className="sign-in-out" onClick={ this.props.user ? this.signOut.bind(this) : this.signIn.bind(this) }>
          <span>Sign { this.props.user ? 'out' : 'in' } here</span>
        </button>
       </section>
     );
   }
 }
 
 export default User;